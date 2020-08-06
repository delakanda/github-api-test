import React from 'react';
import './UserCard.css';
import { TUser } from '../../types/User';

type TProps = {
    user: TUser;
};

function UserCard(props: TProps) {
    return (
        <div className="card">
            <div className="image">
                {props.user.avatarUrl ?
                    <img src={props.user.avatarUrl} />
                    :
                    <img src="" />
                }
            </div>
            <div className="user-name text-center">
                {props.user.name}
            </div>
            <hr />
            <p className="user-bio">
                {props.user.bio || "No Bio"}
            </p>
        </div>
    );
}

export default UserCard;