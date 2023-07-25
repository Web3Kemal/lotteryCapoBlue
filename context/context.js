import { createContext, useState, useEffect, useContext } from 'react'
import Web3 from 'web3'
import createLotteryContract from '../utils/lottery'
import createTokenContract from '../utils/token'

export const appContext = createContext()

export const AppProvider = ({ children }) => {
  const [web3, setWeb3] = useState(new Web3(Web3.givenProvider || 'https://bsc-dataseed.binance.org/'))
  const [address, setAddress] = useState('')
  const [lotteryContract, setLotteryContract] = useState(createLotteryContract(web3))
  const [lotteryPot, setLotteryPot] = useState()
  const [lotteryPlayers, setPlayers] = useState([])
  const [lastWinner, setLastWinner] = useState([])
  const [lotteryId, setLotteryId] = useState()
  const [etherscanUrl, setEtherscanUrl] = useState()/* 
  const [tokenContract, setTokenContract] = useState(web3.eth.contract([]).at('0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c')) */

  useEffect(() => {
    updateLottery()
  }, [lotteryContract])

  const updateLottery = async () => {
    if (lotteryContract) {
      try {
        const pot = await lotteryContract.methods.getBalance().call()

        setLotteryPot(web3.utils.fromWei(pot, 'ether'))

        setPlayers(await lotteryContract.methods.getPlayers().call())

        setLotteryId(await lotteryContract.methods.lotteryId().call())

        setLastWinner(await lotteryContract.methods.getWinners().call())
        console.log([...lastWinner], 'Last Winners')
      } catch (error) {
        console.log(error, 'updateLottery')
      }
    }
  }

  const enterLottery = async () => {
    if (!address) {
      console.log('Please connect wallet');
      return;
    }
    try {
      console.log('entering lottery');
      const amountToSend = web3.utils.toWei('0.1', 'ether'); // 0.1 BNB
      /* await tokenContract.methods.approve(lotteryContract._address, amountToApprove).send({
        from: address
      }); */
  
      await web3.eth.sendTransaction({
        from: address,
        to: lotteryContract._address,
        value: amountToSend,
        gas: 300000,
        gasPrice: null,
      });
  
      updateLottery();
    } catch (err) {
      console.log(err, 'enter');
    }
  }

  const pickWinner = async () => {
    if (!address) {
      console.log('Please connect wallet');
      return;
    }
    try {
      let tx = await lotteryContract.methods.pickWinner().send({
        from: address,
        gas: 300000,
        gasPrice: null,
      })

      console.log(tx)
      setEtherscanUrl('https://bscscan.com/tx/' + tx.transactionHash)
      updateLottery()
    } catch (err) {
      console.log(err, 'pick Winner')
    }
  }

  const connectWallet = async () => {
    /* check if MetaMask is installed */
    if (
      typeof window !== 'undefined' &&
      typeof window.ethereum !== 'undefined'
    ) {
      try {
        /* request wallet connection */
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        /* get list of accounts */
        const accounts = await web3.eth.getAccounts()
        /* set account 1 to React state */
        setAddress(accounts[0])
        window.ethereum.on('accountsChanged', async () => {
          const accounts = await web3.eth.getAccounts()

          /* set account 1 to React state */
          setAddress(accounts[0])
        })
      } catch (err) {
        console.log(err, 'connect Wallet')
      }
    } else {
      /* MetaMask is not installed */
      console.log('Please install MetaMask')
    }
  }

  return (
    <appContext.Provider
      value={{
        address,
        connectWallet,
        lotteryPot,
        lotteryPlayers,
        enterLottery,
        pickWinner,
        lotteryId,
        lastWinner,
        etherscanUrl,
      }}
    >
      {children}
    </appContext.Provider>
  )
}

export const useAppContext = () => {
  return useContext(appContext)
}
