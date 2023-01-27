import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { willContractABI } from '../util/constants';

const WillContext = React.createContext();

const { ethereum } = window;

const createEthereumContract = (contractAddress) => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const willContract = new ethers.Contract(contractAddress, willContractABI, signer);

  return willContract;
};

const WillProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");
  const [currentBalance, setCurrentBalance] = useState("");
  const [willDetails, setWillDetails] = useState({ ownerIcNumber: "12345678" });
  const [validators, setValidators] = useState([]);
  const [willCreated, setWillCreated] = useState(false);
  const [willActivated, setWillActivated] = useState(false);

  const checkIfWalletIsConnect = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        checkBalance();
        console.log(accounts[0]);
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkBalance = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      signer
        .getAddress()
        .then((address) => {
          return provider.getBalance(address);
        })
        .then((rawBalance) => {
          const value = parseFloat(ethers.utils.formatEther(rawBalance));
          console.log("balance: " + value);
          setCurrentBalance(value);
        });
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
      setCurrentAccount(accounts[0]);
      checkBalance();
      console.log(accounts[0])
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const signTransactionToValidate = async () => {
    try {
      if (ethereum) {
        console.log('willDetails.contractAddress', willDetails.contractAddress);
        const willContract = createEthereumContract(willDetails.contractAddress);

        // const validateTx = await willContract.validate({ gasLimit: 100000 });
        // console.log('willContract.interface.functions["validate()"]', willContract.interface.functions["validate()"].format())
        // const validateTx = await ethereum.request({
        //   method: "eth_sendTransaction",
        //   params: [{
        //     from: currentAccount,
        //     to: willDetails.contractAddress,
        //     gas: "0x9999",
        //     data: willContract.interface.functions["validate()"].name,
        //   }],
        // });
        // Wait for the transaction to be mined

        // setIsLoading(true);
        // console.log(`Loading - ${validateTx}`);
        // await validateTx.wait();
        // console.log(`Success - ${validateTx}`);
        // setIsLoading(false);

        // window.location.reload();
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);

      // throw new Error("No ethereum object");
    }
  }

  useEffect(() => {
    checkIfWalletIsConnect();
  }, []);

  return (
    <WillContext.Provider
      value={{
        connectWallet,
        isLoading,
        currentAccount,
        willDetails,
        setWillDetails,
        validators,
        setValidators,
        willCreated,
        setWillCreated,
        willActivated,
        setWillActivated,
        signTransactionToValidate
      }}
    >
      {children}
    </WillContext.Provider>
  );
};
const useWillContext = () => {
  return React.useContext(WillContext);
};

export { WillProvider, useWillContext, WillContext };