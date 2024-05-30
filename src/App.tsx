import { AgoricProvider, ConnectWalletButton } from '@agoric/react-components';
import { wallets } from 'cosmos-kit';
import { ThemeProvider, useTheme } from '@interchain-ui/react';
import Purses from './Purses';
import './App.css';
import '@agoric/react-components/dist/style.css';
import Trade from './Trade';

function App() {
  const { themeClass } = useTheme();
  return (
    <ThemeProvider>
      <div className={themeClass}>
        <AgoricProvider
          wallets={wallets.extension}
          agoricNetworkConfigs={[
            {
              testChain: {
                chainId: 'agoriclocal',
                chainName: 'agoric-local',
              },
              apis: {
                rest: ['http://localhost:1317'],
                rpc: ['http://localhost:26657'],
              },
            },
          ]}
          defaultChainName="agoric-local"
        >
          <h1>Agoric UI Tutorial</h1>
          <Trade />
          <ConnectWalletButton />
          <Purses />
        </AgoricProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;
