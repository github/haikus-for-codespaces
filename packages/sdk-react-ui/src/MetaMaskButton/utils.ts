export const truncatedAddress = (address: string | undefined) => {
    if (!address) {
      return '';
    }
    return `${address.slice(0, 5)}...${address.slice(
      address.length - 4,
      address.length,
    )}`;
  };
  
  export const getBalance = ({
    data,
    isError,
    isLoading,
  }: {
    data: any;
    isError: boolean;
    isLoading: boolean;
  }) => {
    const balance =
      isError || isLoading
        ? ''
        : `${data?.formatted && Number(data?.formatted).toFixed(2)} ${
            data?.symbol
          }`;
  
    return balance;
  };