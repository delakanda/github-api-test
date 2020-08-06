import { gql } from '@apollo/client';

export const getFetchUserQuery = (username: string) => {
    return gql`
        query { 
            user(login:"${username}") {
                name,
                avatarUrl,
                bio,
                email
            }
        }
    `;
}