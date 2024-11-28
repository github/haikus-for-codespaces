import { useSDK } from '@metamask/sdk-react';
import React, { useEffect, useState } from 'react';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import {
  useAccount,
  useConnect,
  useNetwork,
} from '../hooks/MetaMaskWagmiHooks';
import '../style.css';
import Balance from './Balance';
import IconNetwork from './IconNetwork';
import IconOriginal from './IconOriginal';
import IconSimplified from './IconSimplified';
import IconWrongNetwork from './IconWrongNetwork';
import MetaMaskModal from './MetaMaskModal';
import { truncatedAddress } from './utils';

export interface Account {
  address: string;
  balance?: string;
}

interface Props {
  color?: 'blue' | 'white' | 'orange';
  theme?: 'dark' | 'light';
  shape?: 'rectangle' | 'rounded' | 'rounded-full';
  icon?: 'original' | 'simplified' | 'no-icon';
  iconPosition?: 'left' | 'right';
  text?: 'Connect wallet' | 'MetaMask' | 'Connect with MetaMask' | string;
  textAlign?: 'middle' | 'left';
  buttonStyle?: any;
  textStyle?: any;
  iconStyle?: any;
  removeDefaultStyles?: boolean;
  connectComponent?: React.ReactNode;
  wrongNetworkComponent?: React.ReactNode;
  wrongNetworkText?: 'Wrong network' | 'Switch network' | string;
  connectedComponent?: React.ReactNode;
  connectedType?:
    | 'custom-text'
    | 'network-account-balance'
    | 'network-account'
    | 'account-balance'
    | 'separate-network-account';
  connectedText?: 'Connected';
}

const MetaMaskButton = ({
  color,
  theme = 'dark',
  shape,
  icon,
  iconPosition,
  text = 'Connect wallet',
  textAlign,
  buttonStyle,
  textStyle,
  iconStyle,
  removeDefaultStyles,
  connectComponent,
  wrongNetworkComponent,
  wrongNetworkText = 'Switch network',
  connectedComponent,
}: // connectedType = 'network-account-balance', // keep for reference and future implementation
Props) => {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const { sdk, connected } = useSDK();
  const { connect } = useConnect();

  const [modalOpen, setModalOpen] = useState(false);
  const wrongNetwork = isConnected && (!chain || chain.unsupported);

  useEffect(() => {
    const synConnected = () => {
      if (!isConnected) {
        connect();
      }
    };

    if (connected && !isConnected) {
      // force synchronize state between sdk and wagmi
      synConnected();
    } else if (!connected) {
      sdk?.getProvider()?.once('_initialized', synConnected);
    }

    return () => {
      sdk?.getProvider()?.removeListener('_initialized', synConnected);
    };
  }, [sdk, connected, isConnected, connect]);

  const getColors = () => {
    if (wrongNetwork) return 'tw-from-red-500 tw-to-red-500';

    if (isConnected && theme === 'light') {
      return 'tw-from-white tw-to-white';
    } else if (isConnected) {
      return 'tw-from-neutral-500 tw-to-neutral-500';
    }

    if (color === 'blue') return 'tw-from-blue-500 tw-to-blue-500';
    else if (color === 'white') return 'tw-from-white tw-to-white';

    return 'tw-from-orange-500 tw-to-orange-500';
  };

  const getTextColor = () => {
    if (color === 'white') return 'tw-text-black';

    return 'tw-text-white';
  };

  const getShape = () => {
    if (shape === 'rectangle') {
      return '';
    } else if (shape === 'rounded-full') {
      return 'tw-rounded-full';
    }

    return 'tw-rounded-lg';
  };

  const getIcon = () => {
    if (icon === 'no-icon') {
      return null;
    } else if (icon === 'original') {
      return <IconOriginal style={iconStyle} />;
    }

    return (
      <IconSimplified
        style={iconStyle}
        color={color === 'white' ? 'orange' : 'white'}
      />
    );
  };

  const getIconMargin = () => {
    if (icon === 'no-icon') return '';
    else if (iconPosition === 'right') return 'tw-pr-3';

    return 'tw-pl-3';
  };

  const getText = () => {
    if (wrongNetwork) {
      if (wrongNetworkComponent) return wrongNetworkComponent;
      return (
        <div
          className={`tw-relative tw-flex tw-content-center ${
            textAlign !== 'left' ? 'tw-justify-center' : ''
          } ${getTextColor()}`}
        >
          <IconWrongNetwork style={iconStyle} />{' '}
          <span style={textStyle} className={'tw-pl-2'}>
            {wrongNetworkText}
          </span>
        </div>
      );
    }

    if (isConnected) {
      if (connectedComponent) return connectedComponent;
      return (
        <div
          className={`tw-flex tw-relative tw-content-center ${
            textAlign !== 'left' ? 'tw-justify-center' : ''
          } ${getTextColor()}`}
        >
          <div
            style={{ width: 30, height: 30 }}
            className="tw-mt-1 tw-relative"
          >
            <div
              style={{
                fontSize: 8,
                marginTop: -3,
                marginRight: -3,
              }}
              className="tw-flex tw-content-center tw-justify-center tw-absolute tw-right-0"
            >
              <IconNetwork network={chain} />
            </div>
            <Jazzicon
              diameter={30}
              seed={jsNumberForAddress(address || '0x0')}
            />
          </div>
          <div
            style={{ fontSize: 13, lineHeight: '18px' }}
            className="tw-pl-4 tw-text-left tw-flex tw-flex-col"
          >
            {chain && (
              <span
                style={{ ...textStyle, height: 19.5 }}
                className={'tw-text-left'}
              >
                <b>{chain?.name || chain?.network}</b>
              </span>
            )}
            <span
              style={{ ...textStyle, fontSize: 11, height: 16.5 }}
              className={'tw-text-left'}
            >
              {truncatedAddress(address)}
            </span>
          </div>
          {isConnected && <Balance theme={theme} />}
          <div className="tw-pl-2 tw-grid tw-content-center tw-justify-center tw-text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </div>
        </div>
      );
    }

    if (connectComponent) return connectedComponent;
    return (
      <div
        className={`tw-relative tw-flex ${
          textAlign !== 'left' ? 'tw-justify-center' : ''
        } ${getTextColor()}`}
      >
        {iconPosition !== 'right' && getIcon()}{' '}
        {text && (
          <span style={textStyle} className={getIconMargin()}>
            {text}
          </span>
        )}
        {iconPosition === 'right' && getIcon()}
      </div>
    );
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const connectedAndRightNetwork = isConnected && !wrongNetwork;

  if (!sdk?.i18nInstance) return null;

  const t = sdk.i18nInstance.t;

  return (
    <>
      <button
        style={buttonStyle}
        className={`${connectedAndRightNetwork ? 'tw-px-3' : 'tw-px-6'} ${
          connectedAndRightNetwork ? 'tw-py-1' : 'tw-py-2.5'
        } tw-relative ${getShape()} tw-group tw-font-medium tw-text-white tw-font-medium tw-inline-block tw-text-base`}
        onClick={
          isConnected
            ? openModal
            : () => {
                connect(); // TODO manage multichain.
              }
        }
      >
        {!removeDefaultStyles && (
          <>
            <span
              className={`tw-absolute tw-top-0 tw-left-0 tw-w-full tw-h-full ${getShape()} tw-opacity-50 tw-filter tw-blur-sm tw-bg-gradient-to-br ${getColors()}`}
            ></span>
            <span
              className={`tw-absolute tw-inset-0 tw-w-full tw-h-full tw-transition-all tw-duration-200 tw-ease-out ${getShape()} tw-shadow-xl tw-bg-gradient-to-br tw-filter group-active:tw-opacity-0 group-hover:tw-blur-sm ${getColors()}`}
            ></span>
            <span
              className={`tw-absolute tw-inset-0 tw-w-full tw-h-full tw-transition tw-duration-200 tw-ease-out ${getShape()} tw-bg-gradient-to-br ${getColors()}`}
            ></span>
          </>
        )}
        {getText()}
      </button>
      {<MetaMaskModal t={t} isOpen={modalOpen} setIsOpen={setModalOpen} />}
    </>
  );
};

export default MetaMaskButton;