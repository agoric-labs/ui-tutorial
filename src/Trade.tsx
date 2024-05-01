import { FormEvent, useState } from 'react';
import { usePurse, useContract } from './hooks';
import { AmountInput, useAgoric } from '@agoric/react-components';
import { makeCopyBag } from '@agoric/store';

const allItems = ['scroll', 'map', 'potion'];

const Item = ({
  label,
  value,
  onChange,
  inputStep,
}: {
  label: string;
  value: number | string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  inputStep?: string;
}) => (
  <div className="item-col">
    <h4>{label}</h4>
    <input
      title={label}
      type="number"
      min="0"
      max="3"
      value={value}
      step={inputStep || '1'}
      onChange={onChange}
      className="input"
    />
  </div>
);

const Trade = () => {
  const { brands, instance } = useContract();
  const { makeOffer } = useAgoric();

  const istPurse = usePurse('IST');
  const [giveValue, setGiveValue] = useState(0n);

  const [choices, setChoices] = useState<Record<string, bigint>>({
    map: 1n,
    scroll: 2n,
  });

  const submitOffer = () => {
    assert(brands && instance && makeOffer);
    const value = makeCopyBag(Object.entries(choices));
    const want = { Items: { brand: brands.Item, value } };
    const give = { Price: { brand: brands.IST, value: giveValue } };

    makeOffer(
      {
        source: 'contract',
        instance,
        publicInvitationMaker: 'makeTradeInvitation',
      },
      { give, want },
      undefined,
      (update: { status: string; data?: unknown }) => {
        console.log('UPDATE', update);
        if (update.status === 'error') {
          alert(`Offer error: ${update.data}`);
        }
        if (update.status === 'accepted') {
          alert('Offer accepted');
        }
        if (update.status === 'refunded') {
          alert('Offer rejected');
        }
      }
    );
  };

  const changeChoice = (ev: FormEvent) => {
    if (!ev.target) return;
    const elt = ev.target as HTMLInputElement;
    const title = elt.title;
    if (!title) return;
    const qty = BigInt(elt.value);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [title]: _old, ...rest } = choices;
    const newChoices = qty > 0 ? { ...rest, [title]: qty } : rest;
    setChoices(newChoices);
  };

  return (
    <div className="trade">
      <h3>Want: Choose up to 3 items</h3>
      <div className="row-center">
        {allItems.map(title => (
          <Item
            key={title}
            value={Number(choices[title] || 0n)}
            label={title}
            onChange={changeChoice}
          />
        ))}
      </div>
      {istPurse && (
        <>
          <h3>Give: At least 0.25 IST</h3>
          <div className="row-center">
            <div className="item-col">
              <AmountInput
                className="input"
                value={giveValue}
                onChange={setGiveValue}
                decimalPlaces={istPurse.displayInfo.decimalPlaces as number}
              />
            </div>
          </div>
        </>
      )}
      {!!(brands && instance && makeOffer && istPurse) && (
        <button onClick={submitOffer}>Make Offer</button>
      )}
    </div>
  );
};

export default Trade;
