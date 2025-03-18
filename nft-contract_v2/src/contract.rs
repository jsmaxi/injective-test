use crate::msg::{
    ExecuteMsg, InstantiateMsg, ListedNftsResponse, NftInfoResponse, OwnerNftsResponse, QueryMsg,
};
use crate::state::BOUGHT_NFTS;
use crate::state::{Config, Nft, CONFIG, LISTED_NFTS, NFTS, OWNER_NFTS};
#[cfg(not(feature = "library"))]
use cosmwasm_std::entry_point;
use cosmwasm_std::Coin;
use cosmwasm_std::{
    to_json_binary, Addr, BankMsg, Binary, CosmosMsg, Deps, DepsMut, Env, MessageInfo, Response,
    StdError, StdResult, Uint128,
};

// Instantiate entry point
#[cfg_attr(not(feature = "library"), entry_point)]
pub fn instantiate(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    msg: InstantiateMsg,
) -> StdResult<Response> {
    let config = Config {
        name: msg.name,
        symbol: msg.symbol,
        token_count: 0,
        mint_fee: msg.mint_fee,
        creator: info.sender.clone(), // Set the contract creator
    };
    CONFIG.save(deps.storage, &config)?;
    Ok(Response::default())
}

// Execute entry point
#[cfg_attr(not(feature = "library"), entry_point)]
pub fn execute(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    msg: ExecuteMsg,
) -> StdResult<Response> {
    match msg {
        ExecuteMsg::Mint { token_uri, price } => mint_nft(deps, info, token_uri, price),
        ExecuteMsg::List { token_id } => list_nft(deps, info, token_id),
        ExecuteMsg::Unlist { token_id } => unlist_nft(deps, info, token_id),
        ExecuteMsg::Buy { token_id } => buy_nft(deps, info, token_id),
    }
}

// Query entry point
#[cfg_attr(not(feature = "library"), entry_point)]
pub fn query(deps: Deps, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        QueryMsg::GetNft { token_id } => to_json_binary(&query_nft(deps, token_id)?),
        QueryMsg::GetListedNfts {} => to_json_binary(&query_listed_nfts(deps)?),
        QueryMsg::GetOwnerNfts { owner } => to_json_binary(&query_owner_nfts(deps, owner)?), // New query handler
    }
}

// Mint NFT
fn mint_nft(
    deps: DepsMut,
    info: MessageInfo,
    token_uri: String,
    price: Uint128,
) -> StdResult<Response> {
    let mut config = CONFIG.load(deps.storage)?;

    // Check if the mint fee is paid
    if info
        .funds
        .iter()
        .find(|coin| coin.denom == "inj" && coin.amount >= config.mint_fee)
        .is_none()
    {
        return Err(StdError::generic_err("Insufficient mint fee"));
    }

    // Transfer the mint fee to the contract creator
    let mint_fee_msg = BankMsg::Send {
        to_address: config.creator.to_string(),
        amount: vec![Coin {
            denom: "inj".to_string(),
            amount: config.mint_fee,
        }],
    };

    let token_id = config.token_count.to_string();
    config.token_count += 1;
    CONFIG.save(deps.storage, &config)?;

    let nft = Nft {
        token_id: token_id.clone(),
        owner: info.sender.clone(),
        creator: info.sender.clone(),
        token_uri: token_uri.clone(),
        price: Some(price),
        is_listed: false, // Not listed by default
    };

    NFTS.save(deps.storage, &token_id, &nft)?;

    // Update owner's NFTs
    OWNER_NFTS.update(deps.storage, &info.sender, |nfts| -> StdResult<_> {
        let mut nfts = nfts.unwrap_or_default();
        nfts.push(token_id.clone());
        Ok(nfts)
    })?;

    Ok(Response::new()
        .add_message(CosmosMsg::Bank(mint_fee_msg))
        .add_attribute("action", "mint")
        .add_attribute("token_id", token_id)
        .add_attribute("owner", info.sender)
        .add_attribute("token_uri", token_uri)
        .add_attribute("price", price))
}

// List NFT
fn list_nft(deps: DepsMut, info: MessageInfo, token_id: String) -> StdResult<Response> {
    let mut nft = NFTS.load(deps.storage, &token_id)?;

    if nft.owner != info.sender {
        return Err(StdError::generic_err("Unauthorized"));
    }

    // Only the original creator can list the NFT for now
    if nft.creator != info.sender {
        return Err(StdError::generic_err(
            "Only the original creator can list this NFT",
        ));
    }

    nft.is_listed = true;
    NFTS.save(deps.storage, &token_id, &nft)?;
    LISTED_NFTS.save(deps.storage, &token_id, &nft)?;

    Ok(Response::new()
        .add_attribute("action", "list")
        .add_attribute("token_id", token_id))
}

// Unlist NFT
fn unlist_nft(deps: DepsMut, info: MessageInfo, token_id: String) -> StdResult<Response> {
    let mut nft = NFTS.load(deps.storage, &token_id)?;

    if nft.owner != info.sender {
        return Err(StdError::generic_err("Unauthorized"));
    }

    // Only the original creator can unlist the NFT for now
    if nft.creator != info.sender {
        return Err(StdError::generic_err(
            "Only the original creator can unlist this NFT",
        ));
    }

    nft.is_listed = false;
    NFTS.save(deps.storage, &token_id, &nft)?;
    LISTED_NFTS.remove(deps.storage, &token_id);

    Ok(Response::new()
        .add_attribute("action", "unlist")
        .add_attribute("token_id", token_id))
}

// Buy NFT
fn buy_nft(deps: DepsMut, info: MessageInfo, token_id: String) -> StdResult<Response> {
    let nft = NFTS.load(deps.storage, &token_id)?;

    if !nft.is_listed {
        return Err(StdError::generic_err("NFT is not listed for sale"));
    }

    let price = nft
        .price
        .ok_or_else(|| StdError::generic_err("NFT has no price"))?;
    if info
        .funds
        .iter()
        .find(|coin| coin.denom == "inj" && coin.amount >= price)
        .is_none()
    {
        return Err(StdError::generic_err("Insufficient funds"));
    }

    // Check if the user has already bought this NFT
    let has_bought = BOUGHT_NFTS
        .may_load(deps.storage, (&info.sender, &token_id))?
        .unwrap_or(false);
    if has_bought {
        return Err(StdError::generic_err("You have already bought this NFT"));
    }

    // Mark the NFT as bought by this user
    BOUGHT_NFTS.save(deps.storage, (&info.sender, &token_id), &true)?;

    // Transfer funds to the owner
    let funds = info.funds.clone();
    let owner = nft.owner.clone();
    let bank_msg = BankMsg::Send {
        to_address: owner.to_string(),
        amount: funds,
    };

    // Clone the NFT for the buyer
    let new_token_id = format!("{}-clone", token_id);
    let cloned_nft = Nft {
        token_id: new_token_id.clone(),
        owner: info.sender.clone(),
        creator: nft.creator.clone(),
        token_uri: nft.token_uri.clone(),
        price: None, // Cloned NFT is not listed by default
        is_listed: false,
    };

    NFTS.save(deps.storage, &new_token_id, &cloned_nft)?;

    // Update buyer's NFTs
    OWNER_NFTS.update(deps.storage, &info.sender, |nfts| -> StdResult<_> {
        let mut nfts = nfts.unwrap_or_default();
        nfts.push(new_token_id.clone());
        Ok(nfts)
    })?;

    Ok(Response::new()
        .add_message(CosmosMsg::Bank(bank_msg)) // Add the bank transfer message
        .add_attribute("action", "buy")
        .add_attribute("token_id", token_id)
        .add_attribute("buyer", info.sender))
}

// Query NFT
fn query_nft(deps: Deps, token_id: String) -> StdResult<NftInfoResponse> {
    let nft = NFTS.load(deps.storage, &token_id)?;
    Ok(NftInfoResponse {
        token_id: nft.token_id,
        owner: nft.owner,
        creator: nft.creator,
        token_uri: nft.token_uri,
        price: nft.price,
        is_listed: nft.is_listed,
    })
}

// Query Listed NFTs
fn query_listed_nfts(deps: Deps) -> StdResult<ListedNftsResponse> {
    let nfts: StdResult<Vec<_>> = LISTED_NFTS
        .range(deps.storage, None, None, cosmwasm_std::Order::Ascending)
        .map(|item| {
            let (_, nft) = item?;
            Ok(NftInfoResponse {
                token_id: nft.token_id,
                owner: nft.owner,
                creator: nft.creator,
                token_uri: nft.token_uri,
                price: nft.price,
                is_listed: nft.is_listed,
            })
        })
        .collect();

    Ok(ListedNftsResponse { nfts: nfts? })
}

// Query NFTs by Owner
fn query_owner_nfts(deps: Deps, owner: Addr) -> StdResult<OwnerNftsResponse> {
    let nft_ids = OWNER_NFTS.load(deps.storage, &owner).unwrap_or_default();
    let nfts: StdResult<Vec<_>> = nft_ids
        .into_iter()
        .map(|token_id| {
            let nft = NFTS.load(deps.storage, &token_id)?;
            Ok(NftInfoResponse {
                token_id: nft.token_id,
                owner: nft.owner,
                creator: nft.creator,
                token_uri: nft.token_uri,
                price: nft.price,
                is_listed: nft.is_listed,
            })
        })
        .collect();

    Ok(OwnerNftsResponse { nfts: nfts? })
}
