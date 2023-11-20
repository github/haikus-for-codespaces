'use client';
import {
  MetaMaskSDK,
  MetaMaskSDKOptions, SDKProvider,
  ServiceStatus
} from '@metamask/sdk';
import { MetaMaskProvider, useSDK } from '@metamask/sdk-react';
import { publicProvider } from '@wagmi/core/providers/public';
import { EthereumRpcError } from 'eth-rpc-errors';
import React, {
  createContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import {
  Chain,
  configureChains,
  Connector,
  createConfig,
  mainnet,
  WagmiConfig
} from 'wagmi';
import MetaMaskConnector from './MetaMaskWagmiConnector';

const initProps: {
  sdk?: MetaMaskSDK;
  ready: boolean;
  connected: boolean;
  connecting: boolean;
  provider?: SDKProvider;
  error?: EthereumRpcError<unknown>;
  chainId?: string;
  account?: string;
  status?: ServiceStatus;
} = {
  ready: false,
  connected: false,
  connecting: false,
};
export const SDKContext = createContext(initProps);

const { publicClient } = configureChains([mainnet], [publicProvider()]);

const serverConfig = createConfig({
  autoConnect: true,
  publicClient,
});

const WagmiWrapper = ({
  children,
  networks,
  debug,
  connectors = [],
}: {
  children: React.ReactNode;
  networks?: Chain[];
  debug?: boolean;
  connectors?: Connector[];
}) => {
  const { sdk, ready } = useSDK();
  // If no sdk is provided, we will use the public client
  const validConnectors: Connector[] = useMemo(() => {
    if (debug) {
      console.debug(`[MetamaskProvider] validConnectors`, { ready, sdk });
    }
    if (ready && sdk) {
      return [
        new MetaMaskConnector({
          chains: networks,
          options: { sdk, debug },
        }),
        ...connectors,
      ];
    }

    return connectors;
  }, [ready, sdk, networks, debug, connectors]);

  const config = createConfig({ publicClient, connectors: validConnectors })

  return <WagmiConfig config={config}>{children}</WagmiConfig>;
};

// Wrap around to make sure the actual provider is only called on client to prevent nextjs issues.
export const MetaMaskUIProvider = ({
  children,
  connectors,
  networks,
  sdkOptions,
  debug,
}: {
  children: React.ReactNode;
  sdkOptions: MetaMaskSDKOptions;
  connectors?: Connector[];
  networks?: Chain[];
  debug?: boolean;
}) => {
  const [clientSide, setClientSide] = useState(false);

  useEffect(() => {
    setClientSide(true);
  }, []);

  return (
    <>
      {clientSide ? (
        <MetaMaskProvider debug={debug} sdkOptions={sdkOptions}>
          <WagmiWrapper debug={debug} connectors={connectors} networks={networks}>
            {children}
          </WagmiWrapper>
        </MetaMaskProvider>
      ) : (
        <WagmiConfig config={serverConfig}>{children}</WagmiConfig>
      )}
    </>
  );
};

export default MetaMaskProvider;