import { Dialog, Transition } from '@headlessui/react';
import MetaMaskSDK from '@metamask/sdk';
import React, { Fragment, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { Chain } from 'wagmi';
import {
  useAccount,
  useBalance,
  useDisconnect,
  useNetwork,
  useSwitchOrAddNetwork,
} from '../hooks/MetaMaskWagmiHooks';
import IconNetwork from './IconNetwork';
import { getBalance, truncatedAddress } from './utils';

export default function Modal({
  isOpen,
  setIsOpen,
  t,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  t: typeof MetaMaskSDK.prototype.i18nInstance.t;
}) {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { switchOrAddNetwork } = useSwitchOrAddNetwork();
  const { chain, chains } = useNetwork();

  const { data, isError, isLoading } = useBalance({
    address: address,
    chainId: chain?.id,
    enabled: isConnected,
  });

  const balance = getBalance({ data, isError, isLoading });

  const [copied, setCopied] = useState(false);

  if (!isConnected) return null;

  function closeModal() {
    setIsOpen(false);
  }

  const changeNetwork = async (newChain: Chain) => {
    await switchOrAddNetwork(newChain);
    closeModal();
  };

  const renderNetwork = (chainToRender: Chain) => {
    return (
      <button
        className="tw-grid tw-w-full"
        key={chainToRender.id}
        onClick={() => changeNetwork(chainToRender)}
      >
        <div
          className={`tw-text-sm tw-p-2 ${
            chainToRender.id === chain?.id && 'tw-bg-blue-50'
          } tw-flex tw-rounded`}
        >
          <div
            style={{ width: 4, height: 48 }}
            className={`${
              chainToRender.id === chain?.id && 'tw-bg-blue-500'
            } tw-rounded tw-mr-2`}
          ></div>
          <div className="tw-grid tw-content-center tw-justify-center tw-text-lg tw-font-semibold">
            <div className="tw-flex">
              <IconNetwork network={chainToRender} size="big"></IconNetwork>
              <span className="tw-pl-4">{chainToRender?.name}</span>
            </div>
          </div>
        </div>
      </button>
    );
  };

  const getNetworks = () => {
    return (
      <div style={{ maxHeight: 285, overflow: 'auto' }}>
        {chain && !chain.unsupported && renderNetwork(chain)}

        {chains.map((chainToRender) => {
          if (chainToRender.id === chain?.id) return null;
          return renderNetwork(chainToRender);
        })}
      </div>
    );
  };

  const disconnectAndClose = () => {
    closeModal();
    disconnect();
  };

  const copyAddressToClipboard = async () => {
    if (!address) return;

    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="tw-relative tw-z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="tw-ease-out tw-duration-300"
            enterFrom="tw-opacity-0"
            enterTo="tw-opacity-100"
            leave="tw-ease-in tw-duration-200"
            leaveFrom="tw-opacity-100"
            leaveTo="tw-opacity-0"
          >
            <div className="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-40" />
          </Transition.Child>

          <div className="tw-fixed tw-inset-0 tw-overflow-y-auto">
            <div className="tw-flex tw-min-h-full tw-items-center tw-justify-center tw-p-4 tw-text-center">
              <Transition.Child
                as={Fragment}
                enter="tw-ease-out tw-duration-300"
                enterFrom="tw-opacity-0 tw-scale-95"
                enterTo="tw-opacity-100 tw-scale-100"
                leave="tw-ease-in tw-duration-200"
                leaveFrom="tw-opacity-100 tw-scale-100"
                leaveTo="tw-opacity-0 tw-scale-95"
              >
                <Dialog.Panel className="tw-bg-white tw-border tw-w-full tw-max-w-md tw-transform tw-overflow-hidden tw-rounded-2xl tw-bg-white tw-p-6 tw-text-left tw-align-middle tw-shadow-xl tw-transition-all">
                  <div>
                    <div className="tw-flex tw-justify-end">
                      <button onClick={closeModal}>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect width="16" height="16" fill="white" />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M2.40554 2.40554C2.94627 1.86482 3.82296 1.86482 4.36369 2.40554L8 6.04186L11.6363 2.40554C12.177 1.86482 13.0537 1.86482 13.5945 2.40554C14.1352 2.94627 14.1352 3.82296 13.5945 4.36369L9.95814 8L13.5945 11.6363C14.1352 12.177 14.1352 13.0537 13.5945 13.5945C13.0537 14.1352 12.177 14.1352 11.6363 13.5945L8 9.95814L4.36369 13.5945C3.82296 14.1352 2.94627 14.1352 2.40554 13.5945C1.86482 13.0537 1.86482 12.177 2.40554 11.6363L6.04186 8L2.40554 4.36369C1.86482 3.82296 1.86482 2.94627 2.40554 2.40554Z"
                            fill="#BBC0C5"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="tw-flex tw-justify-center tw-content-center tw-flex-col tw-text-center tw-mt-2">
                      <div className="tw-flex tw-justify-center">
                        <div style={{ width: 48, height: 48 }}>
                          <Jazzicon
                            diameter={48}
                            seed={jsNumberForAddress(address || '0x0')}
                          />
                        </div>
                      </div>

                      <div className="tw-text-2xl tw-font-bold tw-mt-2 tw-flex tw-text-center tw-content-center tw-justify-center">
                        {copied ? (
                          <div className="tw-text-lg tw-text-blue-500 tw-grid tw-content-center tw-justify-center">
                            {t('META_MASK_MODAL.ADDRESS_COPIED')}
                          </div>
                        ) : (
                          address && (
                            <div className="tw-flex tw-text-center tw-content-center tw-justify-center">
                              <span className="tw-mr-2">
                                {truncatedAddress(address)}
                              </span>
                              <CopyToClipboard
                                text={address}
                                onCopy={copyAddressToClipboard}
                              >
                                <button className="tw-grid tw-content-center tw-justify-center">
                                  <svg
                                    width="10"
                                    height="11"
                                    viewBox="0 0 10 11"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M6.875 9H3.59375C2.98828 9 2.5 8.51172 2.5 7.90625V2.125H1.09375C0.820312 2.125 0.625 2.33984 0.625 2.59375V9.78125C0.625 10.0547 0.820312 10.25 1.09375 10.25H6.40625C6.66016 10.25 6.875 10.0547 6.875 9.78125V9ZM6.875 2.28125V0.25H3.59375C3.32031 0.25 3.125 0.464844 3.125 0.71875V7.90625C3.125 8.17969 3.32031 8.375 3.59375 8.375H8.90625C9.16016 8.375 9.375 8.17969 9.375 7.90625V2.75H7.34375C7.07031 2.75 6.875 2.55469 6.875 2.28125ZM9.21875 1.67578L7.94922 0.40625C7.85156 0.308594 7.73438 0.25 7.61719 0.25H7.5V2.125H9.375V2.00781C9.375 1.89062 9.31641 1.77344 9.21875 1.67578Z"
                                      fill="#037DD6"
                                    />
                                  </svg>
                                </button>
                              </CopyToClipboard>
                            </div>
                          )
                        )}
                      </div>
                      <div className="tw-text-base tw-mt-2">{balance}</div>
                      <button
                        className="tw-text-blue-500 tw-mt-2 tw-text-xs tw-flex tw-content-center tw-justify-center tw-items-center"
                        onClick={disconnectAndClose}
                      >
                        <svg
                          width="9"
                          height="10"
                          viewBox="0 0 9 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.25 7.34375L4.625 6.73438C4.54688 6.65625 4.4375 6.65625 4.35938 6.73438L3.65625 7.42188C3.21875 7.875 2.51562 7.875 2.07812 7.42188C1.625 6.98438 1.625 6.28125 2.07812 5.84375L2.76562 5.14062C2.84375 5.0625 2.84375 4.95312 2.76562 4.875L2.15625 4.25C2.07812 4.1875 1.95312 4.1875 1.89062 4.25L1.1875 4.95312C0.265625 5.875 0.265625 7.39062 1.1875 8.3125C2.10938 9.23438 3.625 9.23438 4.54688 8.3125L5.25 7.60938C5.3125 7.54688 5.3125 7.42188 5.25 7.34375ZM4.35938 3.28125C4.4375 3.35938 4.54688 3.35938 4.625 3.28125L5.32812 2.59375C5.76562 2.14062 6.46875 2.14062 6.90625 2.59375C7.35938 3.03125 7.35938 3.73438 6.90625 4.17188L6.21875 4.875C6.14062 4.95312 6.14062 5.0625 6.21875 5.14062L6.82812 5.76562C6.90625 5.82812 7.03125 5.82812 7.09375 5.76562L7.79688 5.0625C8.71875 4.14062 8.71875 2.625 7.79688 1.70312C6.875 0.78125 5.35938 0.78125 4.4375 1.70312L3.73438 2.40625C3.67188 2.46875 3.67188 2.59375 3.73438 2.67188L4.35938 3.28125ZM8.03125 8.89062L8.375 8.54688C8.53125 8.39062 8.53125 8.15625 8.375 8.01562L1.48438 1.125C1.34375 0.96875 1.10938 0.96875 0.953125 1.125L0.609375 1.46875C0.453125 1.625 0.453125 1.85938 0.609375 2L7.5 8.89062C7.64062 9.04688 7.875 9.04688 8.03125 8.89062Z"
                            fill="#037DD6"
                          />
                        </svg>
                        <span className="tw-ml-1">
                          {t('META_MASK_MODAL.DISCONNECT')}
                        </span>
                      </button>
                    </div>
                  </div>
                  <div className="tw-text-sm tw-font-bold	tw-mt-6">
                    {t('META_MASK_MODAL.ACTIVE_NETWORK')}
                  </div>
                  <div className="tw-mt-4">{getNetworks()}</div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}