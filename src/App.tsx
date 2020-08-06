import React, { useState, useEffect } from 'react';
import './App.css';
import SearchInput from './components/search/SearchInput';
import { getFetchUserQuery } from './queries/User';
import { TGraphqlUser, TUser } from './types/User';
import UserCard from './components/usercard/UserCard';
import { fetchUsers } from './apollo/Query';
import * as Constants from './utils/Constants';

function App() {

  const [users, setUsers] = useState<TUser[]>([]);
  const [searchInput, setSsearchInput] = useState<string>("");
  const [fetchState, setFetchState] = useState<string>(Constants.FETCH_STATE_STATE_NEUTRAL);

  const fetchUser = () => {
    if(searchInput) {
      setFetchState(Constants.FETCH_STATE_FETCHING);
      // control useQuery fetch
      fetchUsers(getFetchUserQuery(searchInput)).then((data: TGraphqlUser) => {
        setFetchState(Constants.FETCH_STATE_FETCHED);
        let _users = [...users];
        const userExists = _users.find((element: TUser) => {
          return element.name === data.user.name
        });
        if(!userExists) {
          _users.unshift(data.user);
          setUsers(_users);
        }
      }).catch((err) => {
        setFetchState(Constants.FETCH_STATE_FETCH_ERROR);
      });
    }
  };
  
  return (
    <div className="App">
      <SearchInput searchInput={searchInput} setSearchInput={setSsearchInput} fetchUser={fetchUser} />

      {fetchState === Constants.FETCH_STATE_FETCHING && <div className="text-center">Fetching user data...</div> }

      {fetchState !== Constants.FETCH_STATE_FETCHING && users.map((user) => {
        return (
          <UserCard key={user.name} user={user} />
        )
      })}
      
    </div>
  );
}

export default App;
