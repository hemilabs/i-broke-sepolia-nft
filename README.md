# I Broke Sepolia NFT

The "I Broke Sepolia" NFT will be distributed at mainnet to all the users who maxed out the 25,000 possible points acquired via tunnel during the Hemi Open Season.

This repository groups all files needed to deploy and mint the "I Broke Sepolia" NFT as follows:
- [batchMint.js](./batchMint.js): Node script that reads the CSV files an mints one NFT for each address.
- [ContractABI.js](./ContractABI.js): ABI from the "I Broke Sepolia" NFT smart contract.
- [i-broke-sepolia.json](./i-broke-sepolia.json): JSON file that store metadata information about the NFT.
- [IBrokeSepoliaNFT.sol](./IBrokeSepoliaNFT.sol): "I Broke Sepolia" NFT smart contract code.
- [openseasonpoints.csv](./openseasonpoints.csv): CSV file containing the list of addresses that should receive the "I Broke Sepolia" NFT.

## Getting Started

### Prerequisites

- Node.js

### Installation

Install the dependencies:

```bash
npm install
```

### Environment Variables

The environment variables are defined in the `.env` file. The following variables are used:

- `TESTNET`: Boolean value to set if the script should run on testnet or not.
- `NFT_CONTRACT_ADDRESS`: Address of the "I Broke Sepolia" NFT smart contract deployed.
- `MNEMONIC_ACCOUNT`: Mnemonic phrase of the account responsible for minting all "I Broke Sepolia" NFTs.

Example of the .env file

```env
TESTNET=
NFT_CONTRACT_ADDRESS=
MNEMONIC_ACCOUNT=
```

### Running the Script

On the root folder, run the following command to start the script that mints one NFT for each address on the CSV file:

```bash
npm start
```

## Contribution

If you want to contribute to this project and make it better, your help is very welcome.
You can find more information about how to contribute in the [`CONTRIBUTING.md`](https://github.com/hemilabs/.github/blob/main/CONTRIBUTING.md) file.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
