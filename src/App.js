import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

import './App.css';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState("");
  const [block, setBlock] = useState({
    timestamp: "",
    hash: "",
    parentHash: "",
    difficulty: "",
    transactions: []
  });


  useEffect(() => {
    async function getBlockProperties() {
      let blocknum = await alchemy.core.getBlockNumber();
      setBlockNumber(blocknum);
      setBlock(await alchemy.core.getBlockWithTransactions(blocknum));
    }

    getBlockProperties();

  }, []);

  return (
    <div className="App">
      <h1><b>Welcome to luksgrin's Block explorer!</b></h1>
      <h2>Here you can see the latest block on the Ethereum Mainnet</h2>
      Block Number: {blockNumber}
      <br></br>
      <div className="App-body">
      Block Timestamp: {block.timestamp}<br></br>
      Block Hash: {block.hash}<br></br>
      Block parentHash: {block.parentHash}<br></br>
      Block difficulty: {block.difficulty}<br></br>
      Number of transactions within the block: {block.transactions.length}<br></br>
      </div>
    </div>
  );
}

export default App;
