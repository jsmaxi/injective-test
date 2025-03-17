import React from "react";
import ConnectWallet from "./ConnectWallet";

type Props = {};

const NavbarExample = (_props: Props) => {
  return (
    <div className="bg-gray-100">
      <div className="container mx-auto flex justify-between items-center p-2">
        <h1>Example</h1>
        <ConnectWallet />
      </div>
    </div>
  );
};

export default NavbarExample;
