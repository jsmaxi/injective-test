use cosmwasm_std::{Addr, Uint128};
use cw_storage_plus::{Item, Map};
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct Config {
    pub name: String,
    pub symbol: String,
    pub token_count: u64, // Counter for auto-assigning token IDs
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct Nft {
    pub token_id: String,       // NFT ID
    pub owner: Addr,            // Owner of NFT
    pub creator: Addr,          // Original creator of the NFT
    pub token_uri: String,      // IPFS hash for metadata
    pub price: Option<Uint128>, // Price in INJ tokens
    pub is_listed: bool,        // Whether the NFT is listed for sale
}

pub const CONFIG: Item<Config> = Item::new("config");
pub const NFTS: Map<&str, Nft> = Map::new("nfts");
pub const LISTED_NFTS: Map<&str, Nft> = Map::new("listed_nfts");
pub const OWNER_NFTS: Map<&Addr, Vec<String>> = Map::new("owner_nfts");
