import { AgoricProvider, ConnectWalletButton } from '@agoric/react-components';
import { wallets } from 'cosmos-kit';
import { ThemeProvider, useTheme } from '@interchain-ui/react';
import './App.css';
import '@agoric/react-components/dist/style.css';

function App() {
  const { themeClass } = useTheme();
  return (
    <ThemeProvider>
      <div className={themeClass}>
        <AgoricProvider
          wallets={wallets.extension}
          defaultNetworkConfig={{
            testChain: {
              chainId: 'agoriclocal',
              chainName: 'agoric-local',
            },
            apis: {
              rest: ['http://localhost:1317'],
              rpc: ['http://localhost:26657'],
            },
          }}
        >
          <h1>Agoric UI Tutorial</h1>
          <ConnectWalletButton />
        </AgoricProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;
