import React, { useContext } from 'react';
import { AppContext } from '../../utils/ContextApi';
import UserCard from '../usercard/UserCard';
import { Link, useHistory } from 'react-router-dom';

function UserDetails() {
    const context = useContext(AppContext);
    const history = useHistory();

    if(context && !context.userDetails) {
        history.push("/");
    }

    return (
        <div className="container">
            <div>
                <Link to="/"> Go Back</Link>
            </div>
            
            {context && context.userDetails &&
                <UserCard user={context.userDetails} showFullDetails={true} />
            }

        </div>
    );
}

export default UserDetails;