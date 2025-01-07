import { parse } from "csv-parse"
import fs from "fs"
import { hemiSepolia, hemi } from 'hemi-viem'
import {
  createPublicClient,
  createWalletClient,
  getContract,
  getContractError,
  http
} from 'viem'
import { mnemonicToAccount } from 'viem/accounts'
import abi from './ContractABI.js'

const chain = process.env['TESTNET'] ? hemiSepolia : hemi
const contractAddress = process.env['NFT_CONTRACT_ADDRESS']
const accountMnemonic = process.env['MNEMONIC_ACCOUNT']

const account = mnemonicToAccount(accountMnemonic) 

const publicClient = createPublicClient({
  chain,
  transport: http()
})
const walletClient = createWalletClient({
  account,
  chain,
  transport: http()
})

const [accountAddress] = await walletClient.getAddresses()

const contract = getContract({
  address: contractAddress,
  abi,
  client: { public: publicClient, wallet: walletClient }
})
 
const mintNFT = async (address) => {
  try {
    console.info(`I Broke Sepolia NFT | Minting NFT for address: ${address}`)
    await contract.write.mintNFT([address])
  } catch (error) {
    throw getContractError(error, { 
      abi, 
      address, 
      args: [address], 
      docsPath: '/docs/contract/simulateContract', 
      functionName: 'mintNFT', 
      sender:accountAddress, 
    }) 
  }
}

const batchMintNFT = (records) => {
  const mintNftPromises = records.map(x => mintNFT(x[0]))

  Promise.all(mintNftPromises)
}

const parseCsvFile = (data) => {
  parse(data, (error, records) => {
    if (error) {
      console.error('I Broke Sepolia NFT | Error parsing the CSV file: ', error)
    } else {
      batchMintNFT(records)
    }
  })
}

const readCsvFile = () => {
  fs.readFile('openseasonpoints.csv', (errorReadFile, data) => {
    if (errorReadFile) {
      console.error('I Broke Sepolia NFT | Error reading the CSV file: ', errorReadFile)
    } else {
      parseCsvFile(data)
    }
  })
}


const start = () => {
  console.info('I Broke Sepolia NFT | Starting batch mint...')

  readCsvFile()
}


start()

