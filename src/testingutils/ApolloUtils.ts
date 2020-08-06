import { getFetchUserQuery } from "../queries/User";

export const APOLLO_MOCKS = [
    {
        request: {
            query: getFetchUserQuery(),
            variables: { username: 'delakanda' },
        },
        result: {
            data: {
                user: {
                    avatarUrl: 'https://avatars2.githubusercontent.com/u/4548951?u=3b0e1bfc6a02cb1ad997f88ad0b5f363ca05b577&v=4',
                    bio: "I am Self driven programmer with an obsession for beautiful UI/UX and beautifully organized code.",
                    email: "delakanda@gmail.com",
                    name: "DevKanda"
                }
            }
        }
    }
];