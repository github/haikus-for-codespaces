import React from 'react';
import {
  useNetwork,
  useAccount,
  useBalance,
} from '../hooks/MetaMaskWagmiHooks';
import { getBalance } from './utils';

const Balance = ({ theme }: { theme: string }) => {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const { data, isError, isLoading } = useBalance({
    address: address,
    chainId: chain?.id,
    enabled: isConnected,
  });

  const balance = getBalance({ data, isError, isLoading });

  if (!balance || isLoading || isError) return null;

  return (
    <div
      className="tw-pl-4 tw-grid tw-content-center tw-justify-center tw-text-center"
      style={{ fontSize: 13 }}
    >
      <span
        className={`${
          theme === 'light' ? 'tw-bg-neutral-200' : 'tw-bg-neutral-400'
        } tw-p-1.5 tw-rounded`}
      >
        {balance}
      </span>
    </div>
  );
};

export default Balance;