import React, { useState, useEffect } from 'react';
import './App.css';
import { getFetchUserQuery } from './queries/User';
import { TGraphqlUser, TUser } from './types/User';
import { fetchUsers } from './apollo/Query';
import * as Constants from './utils/Constants';
import { AppContext } from './utils/ContextApi';
import { BrowserRouter, Route } from 'react-router-dom';
import UserList from './components/userlist/UserList';
import UserDetails from './components/userdetails/UserDetails';

function App() {

  const [users, setUsers] = useState<TUser[]>([]);
  const [userDetails, setUserDetails] = useState<TUser | null>(null);
  const [searchInput, setSearchInput] = useState<string>("");
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
          setSearchInput("");
        }
      }).catch((err) => {
        console.log(err);
        setFetchState(Constants.FETCH_STATE_FETCH_ERROR);
      });
    }
  };
  
  return (
    <AppContext.Provider value={{
      users,
      userDetails,
      searchInput,
      fetchState,
      setSearchInput,
      fetchUser,
      setUserDetails
    }}>
      <div className="App">
        <BrowserRouter>
          <Route exact path='/' component={UserList} />
          <Route path='/details' component={UserDetails} />
        </BrowserRouter>
        
      </div>
    </AppContext.Provider>
  );
}

export default App;
