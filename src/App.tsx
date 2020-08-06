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
  const [error, setError] = useState<string | null>(null);
  const [userDetails, setUserDetails] = useState<TUser | null>(null);
  const [searchInput, setSearchInput] = useState<string>("");
  const [fetchState, setFetchState] = useState<string>(Constants.FETCH_STATE_STATE_NEUTRAL);

  const fetchUser = () => {
    if(searchInput) {
      setFetchState(Constants.FETCH_STATE_FETCHING);
      setError(null);

      fetchUsers(getFetchUserQuery(searchInput)).then((data: TGraphqlUser) => {
        setFetchState(Constants.FETCH_STATE_FETCHED);

        if(data.user) {
          let _users = [...users];
          const userExists = _users.find((element: TUser) => {
            return element.name === data.user.name
          });
          if(!userExists) {
            _users.unshift(data.user);
            setUsers(_users);
            
          }
        } else {
          setError(`User could not be found with login name: ${searchInput}`);
        }

        setSearchInput("");
      }).catch((err) => {
        setError("An error occurred, please try again");
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
      error,
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
