import { useAgoric } from '@agoric/react-components';
import { usePurse } from './hooks';
import { stringifyAmountValue } from '@agoric/web-components';

const Purses = () => {
  const { walletConnection } = useAgoric();
  const istPurse = usePurse('IST');
  const itemsPurse = usePurse('Item');

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
                istPurse.displayInfo.assetKind,
                istPurse.displayInfo.decimalPlaces
              )
            ) : (
              <i>Fetching balance...</i>
            )}
          </div>
          <div>
            <b>Items: </b>
            {itemsPurse ? (
              <ul style={{ marginTop: 0, textAlign: 'left' }}>
                {itemsPurse.currentAmount.value.payload.map(
                  // @ts-expect-error ignore 'any' type
                  ([name, number]) => (
                    <li key={name}>
                      {String(number)} {name}
                    </li>
                  )
                )}
              </ul>
            ) : (
              'None'
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
