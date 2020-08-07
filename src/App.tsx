import React, { useState, useEffect } from 'react';
import './App.css';
import { getFetchUserQuery } from './queries/User';
import { TUser } from './types/User';
import * as Constants from './utils/Constants';
import { AppContext } from './utils/ContextApi';
import { BrowserRouter, Route } from 'react-router-dom';
import UserList from './components/userlist/UserList';
import UserDetails from './components/userdetails/UserDetails';
import { useLazyQuery } from '@apollo/client';

function App() {

  const [users, setUsers] = useState<TUser[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [userDetails, setUserDetails] = useState<TUser | null>(null);
  const [searchInput, setSearchInput] = useState<string>("");
  const [fetchState, setFetchState] = useState<string>(Constants.FETCH_STATE_STATE_NEUTRAL);

  const [getUser, { loading }] = useLazyQuery(getFetchUserQuery(), {
    onCompleted: data => {
      if(data.user) {
        let _users = [...users];
        const userExists = _users.find((element: TUser) => element.name === data.user.name );
        if(!userExists) {
          _users.unshift(data.user);
          console.log(_users);
          setUsers(_users);
          setSearchInput('');
          setFetchState(Constants.FETCH_STATE_FETCHED);
        }
      }
    },
    onError: err => {
      console.log(err)
      setError(`User could not be found with login name: ${searchInput}`);
      setFetchState(Constants.FETCH_STATE_FETCH_ERROR);
      setSearchInput('');
    }
  });

  useEffect(() => {
    if(loading) {
      setFetchState(Constants.FETCH_STATE_FETCHING);
    } else {
      setFetchState(Constants.FETCH_STATE_FETCHED);
    }
  }, [loading])

  const fetchUser = () => {
    setFetchState(Constants.FETCH_STATE_FETCHING);
    setError(null);
    getUser({ variables: { username: searchInput } });
  };

  const deleteUser = (username: string) => {
    let _users = [...users];
    const userIdx = _users.findIndex((element: TUser) => element.name === username );
    if(userIdx != -1) {
      _users.splice(userIdx, 1);
      setUsers(_users);
    }
  };
  
  return (
    <AppContext.Provider value={{
      users,
      userDetails,
      searchInput,
      fetchState,
      error,
      setSearchInput,
      fetchUser,
      setUserDetails,
      deleteUser
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
