import React from 'react';
import './UserCard.css';
import { TUser } from '../../types/User';
import { Link } from 'react-router-dom';
import { AppContext } from '../../utils/ContextApi';

type TProps = {
    user: TUser;
    showFullDetails: boolean;
};

function UserCard(props: TProps) {
    return (
        <AppContext.Consumer>
            {context => context && (
                <div className="card" data-testid="user-card">
                    {!props.showFullDetails &&
                        <span className="close-btn" title="delete" onClick={() => context.deleteUser(props.user.name)}>x</span>
                    }
                    <Link to={"/details"} onClick={() => context.setUserDetails(props.user)}>
                        <div className="image">
                            {props.user.avatarUrl ?
                                <img src={props.user.avatarUrl} />
                                :
                                <img src="" />
                            }
                        </div>
                        <div className="user-name text-center">
                            {props.user.name}
                            <br/>
                            <i>{props.user.email || <span>&nbsp;</span>}</i>
                        </div>

                        {props.showFullDetails &&
                            <p>
                                {props.user.bio || "No bio"}
                            </p>
                        }
                    </Link>
                </div>
            )}
        </AppContext.Consumer>
    );
}

export default UserCard;