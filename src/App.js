import React, { useState, useEffect } from 'react';
import './App.css';
import fetch from './dataservice';
import 'react-flexbox-grid/dist/react-flexbox-grid.css';
import { calculateResults, searchByOptions } from './helper';
import SearchBar from './searchBar';
import Grid from './gridView';

function App() {
  const [transactionData, setTransactionData] = useState({ filters: null });
  const [searchData, setSearchData] = useState(null);
  let transationData = {
    transactions: []
  };
  useEffect(() => {
    fetch().then((data) => {
      const results = calculateResults(data);
      setTransactionData(results);
    });
  }, []);
  if (searchData) {
    transationData = searchByOptions(transactionData.rewardsPerTrans, searchData);
    //debugger;
  }
  return (
    <div className="App">
      <SearchBar
        filters={transactionData.filters}
        handleApplyFilters={(filterData) => {
          setSearchData(filterData);
        }}
      />
      {searchData ? (
        <Grid
          data={transationData.transactions}
          totalRewards={transationData.totalRewards}
        />) : (<div>
          Nothing to Display
        </div>)}

    </div>
  );
}

export default App;
