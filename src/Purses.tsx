import { useAgoric } from '@agoric/react-components';
import { usePurse } from './hooks';
import { stringifyAmountValue } from '@agoric/web-components';

const Purses = () => {
  const { walletConnection } = useAgoric();
  const istPurse = usePurse('IST');

  return (
    <div className="card">
      <h3>Purses</h3>
      {walletConnection ? (
        <div style={{ textAlign: 'left' }}>
          <div>
            <b>IST: </b>
            {istPurse ? (
              stringifyAmountValue(
                istPurse.currentAmount,
                // @ts-expect-error displayInfo missing type
                istPurse.displayInfo.assetKind,
                // @ts-expect-error displayInfo missing type
                istPurse.displayInfo.decimalPlaces
              )
            ) : (
              <i>Fetching balance...</i>
            )}
          </div>
        </div>
      ) : (
        'No wallet connected.'
      )}
    </div>
  );
};

export default Purses;
