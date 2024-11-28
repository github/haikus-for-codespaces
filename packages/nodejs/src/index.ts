// import { MetaMaskSDK } from '@metamask/sdk';

// const MMSDK = new MetaMaskSDK(options);

// const ethereum = MMSDK.getProvider(); // You can also access via window.ethereum

import { MetaMaskSDK, MetaMaskSDKOptions, SDKProvider } from '@metamask/sdk';
import * as fs from 'fs';

const qrcode = require('qrcode-terminal');

const options: MetaMaskSDKOptions = {
  shouldShimWeb3: false,
  dappMetadata: {
    name: 'NodeJS example',
    url: 'NodeJS example',
  },
  logging: {
    sdk: false,
  },
  checkInstallationImmediately: false,
  // Optional: customize modal text
  modals: {
    install: ({ link }) => {
      qrcode.generate(link, { small: true }, (qr) => console.log(qr));
      return {};
    },
    otp: () => {
      return {
        mount() {},
        updateOTPValue: (otpValue) => {
          if (otpValue !== '') {
            console.debug(
              `[CUSTOMIZE TEXT] Choose the following value on your metamask mobile wallet: ${otpValue}`,
            );
          }
        },
      };
    },
  },
};

const sdk = new MetaMaskSDK(options);

const msgParams = {
  types: {
    EIP712Domain: [
      { name: 'name', type: 'string' },
      { name: 'version', type: 'string' },
      { name: 'chainId', type: 'uint256' },
      { name: 'verifyingContract', type: 'address' },
    ],
    Person: [
      { name: 'name', type: 'string' },
      { name: 'wallet', type: 'address' },
    ],
    Mail: [
      { name: 'from', type: 'Person' },
      { name: 'to', type: 'Person' },
      { name: 'contents', type: 'string' },
    ],
  },
  primaryType: 'Mail',
  domain: {
    name: 'Ether Mail',
    version: '1',
    chainId: '0x1',
    verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
  },
  message: {
    from: {
      name: 'Cow',
      wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
    },
    to: {
      name: 'Bob',
      wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
    },
    contents: 'Hello, Bob!',
  },
};

const start = async (startType) => {
  console.debug(`start NodeJS example`);

  if (startType === 'connect') {
    const accounts = await sdk.connect();
    console.log('connect request accounts', accounts);
  } else {
    const hexSign = await sdk.connectAndSign({msg: "Hello from the NodeJS Example!"})
    console.log('connect and sign', hexSign);
  }

  const ethereum = sdk.getProvider();

  const signResponse = await ethereum.request({
    method: 'eth_signTypedData_v3',
    params: [ethereum.selectedAddress, JSON.stringify(msgParams)],
  });

  console.log('eth_signTypedData_v3 response', signResponse);
};

const startType = process.argv[2];

start(startType).catch((err) => {
  console.error(err);
});