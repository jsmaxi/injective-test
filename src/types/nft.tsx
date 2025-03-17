export type nft = {
  token_id: string;
  owner: string;
  creator: string;
  token_uri: string;
  price: string | null;
  is_listed: boolean;
};

export type nftDisplay = {
  token_id: string;
  name: string;
  personality: string;
  owner: string;
  creator: string;
  gender: string;
  language: string;
  tags: string[];
  imageHash: string;
  price: string | null;
  is_listed: boolean;
};
