import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchInput from './components/search/SearchInput';
import { useLazyQuery, ApolloProvider, ApolloClient } from '@apollo/client';
import { getFetchUserQuery } from './queries/User';

function App() {

  const [searchInput, setSsearchInput] = useState<string>("");
  
  // useEffect(() => {
  //   console.log(searchInput)
  // }, [searchInput])

  const [getUser, { loading, error, data, refetch }] = useLazyQuery(getFetchUserQuery(searchInput));

  console.log(data);

  const fetchUser = () => {
    console.log("FETCH");
    getUser();
  };
  
  return (
    <ApolloProvider client={new ApolloClient({  })}>
      <div className="App">
        <SearchInput searchInput={searchInput} setSearchInput={setSsearchInput} fetchUser={fetchUser} />

        {loading &&
          <p>Loading...</p>
        }

        {error &&
          <p>An Erro occured</p>
        }
        
      </div>
    </ApolloProvider>
  );
}

export default App;
