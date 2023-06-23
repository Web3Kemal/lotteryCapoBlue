import { tokenAddress, tokenAbi } from './constants'
const tokenContract = web3 => {
  return new web3.eth.Contract(tokenAbi, tokenAddress)
}

export default tokenContract
