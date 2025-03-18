use cosmwasm_schema::QueryResponses;
use cosmwasm_std::{Addr, Uint128};
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct InstantiateMsg {
    pub name: String,
    pub symbol: String,
    pub mint_fee: Uint128, // Default mint fee in INJ tokens (50000000000000000 = 0.05 INJ)
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum ExecuteMsg {
    Mint { token_uri: String, price: Uint128 },
    List { token_id: String },
    Unlist { token_id: String },
    Buy { token_id: String },
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema, QueryResponses)]
#[serde(rename_all = "snake_case")]
pub enum QueryMsg {
    #[returns(NftInfoResponse)]
    GetNft { token_id: String },
    #[returns(ListedNftsResponse)]
    GetListedNfts {},
    #[returns(OwnerNftsResponse)]
    GetOwnerNfts { owner: Addr },
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct NftInfoResponse {
    pub token_id: String,
    pub owner: Addr,
    pub creator: Addr,
    pub token_uri: String,
    pub price: Option<Uint128>,
    pub is_listed: bool,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct ListedNftsResponse {
    pub nfts: Vec<NftInfoResponse>,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct OwnerNftsResponse {
    pub nfts: Vec<NftInfoResponse>,
}
