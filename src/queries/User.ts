import { gql } from '@apollo/client';

export const getFetchUserQuery = () => {
    return gql`
        query 
            user($username: String!) {
                user(login: $username) {
                    name,
                    avatarUrl,
                    bio,
                    email
                }
            }
    `;
}