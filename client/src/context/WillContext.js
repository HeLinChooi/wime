import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../util/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  return transactionsContract;
};

export const WillProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const checkIfWalletIsConnect = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {

        console.log(accounts[0]);

      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
    }
  };


  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts[0])
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const transferAssets = async () =>{
    try {
      if (ethereum) {
        const willContract = createEthereumContract();

        await willContract.distributeAssets();
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    checkIfWalletIsConnect();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        isLoading,
        transferAssets,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
