"use server";

import { pinata } from "./config";

export async function pinToIpfs(f: File) {
  try {
    const upload = await pinata.upload.file(f);
    console.log(upload);
    return upload;
  } catch (error) {
    console.error("Error uploading file to IPFS:", error);
    throw error;
  }
}
