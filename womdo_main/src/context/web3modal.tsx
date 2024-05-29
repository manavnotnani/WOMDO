'use client'

import { createWeb3Modal, defaultConfig } from '@web3modal/ethers5/react'

// 1. Get projectId at https://cloud.walletconnect.com
const projectId: any = process.env.NEXT_PUBLIC_PROJECT_ID;

// 2. Set chains
const AMOY = {
  chainId: 80002,
  name: 'Polygon Amoy',
  currency: 'MATIC',
  explorerUrl: 'https://amoy.polygonscan.com/',
  rpcUrl: 'https://api.tatum.io/v3/blockchain/node/polygon-amoy'
}

// 3. Create a metadata object
const metadata = {
  name: 'WOMDO',
  description: '',
  url: '', // origin must match your domain & subdomain
  icons: ['']
}

// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,

  /*Optional*/
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: true, // true by default
  rpcUrl: '...', // used for the Coinbase SDK
  defaultChainId: 1 // used for the Coinbase SDK
})

// 5. Create a Web3Modal instance
createWeb3Modal({
  ethersConfig,
  chains: [AMOY],
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
  themeMode: 'light'
})

export function Web3Modal({ children }: any) {
  return children
}