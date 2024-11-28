import React from 'react';
import { Chain } from 'wagmi';

import { Icons } from './constants';

const styles = {
  small: {
    width: 16,
    height: 16,
  },
  big: {
    width: 32,
    height: 32,
  },
};

const IconNetwork = ({
  network,
  size = 'small',
}: {
  network?: Chain;
  size?: 'small' | 'big';
}) => {
  const Icon = network && Icons[network.id.toString()];
  if (Icon) {
    return <div style={styles[size]}>{Icon}</div>;
  }

  return (
    <div
      className="rounded-[100%] bg-gray-300 grid content-center justify-center"
      style={styles[size]}
    >
      <span>{network?.name?.[0]}</span>
    </div>
  );
};

export default IconNetwork;