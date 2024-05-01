import { useAgoric } from '@agoric/react-components';
import { AgoricChainStoragePathKind as Kind } from '@agoric/rpc';
import { useEffect, useState } from 'react';

export const usePurse = (brandPetname: string) => {
  const { purses } = useAgoric();

  return purses?.find(p => p.brandPetname === brandPetname);
};

export const useContract = () => {
  const [brands, setBrands] = useState<{ [k: string]: unknown } | null>(null);
  const [instance, setInstance] = useState<unknown | null>(null);
  const { chainStorageWatcher } = useAgoric();

  useEffect(() => {
    const stopWatchingInstance = chainStorageWatcher?.watchLatest<
      Array<[string, unknown]>
    >([Kind.Data, 'published.agoricNames.instance'], instances => {
      console.log('Got instances', instances);
      setInstance(instances.find(([name]) => name === 'offerUp')!.at(1));
    });

    const stopWatchingBrands = chainStorageWatcher?.watchLatest<
      Array<[string, unknown]>
    >([Kind.Data, 'published.agoricNames.brand'], brands => {
      console.log('Got brands', brands);
      setBrands(Object.fromEntries(brands));
    });

    return () => {
      stopWatchingInstance?.();
      stopWatchingBrands?.();
    };
  }, [chainStorageWatcher]);

  return { instance, brands };
};
