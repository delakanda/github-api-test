import React from 'react';
import { AppContext } from '../../utils/ContextApi';
import UserCard from '../usercard/UserCard';
import SearchInput from '../search/SearchInput';
import * as Constants from './../../utils/Constants';

function UserList() {
    return (
        <AppContext.Consumer>
            {context => context && (
                <>
                    <SearchInput />

                    {context.fetchState === Constants.FETCH_STATE_FETCHING && <div className="text-center">Fetching user data...</div> }

                    {context.fetchState !== Constants.FETCH_STATE_FETCHING && context.users.map((user) => {
                    return (
                        <UserCard key={user.name} user={user} showFullDetails={false} />
                    )
                    })}
                </>
            )}
        </AppContext.Consumer>
    )
}

export default UserList;