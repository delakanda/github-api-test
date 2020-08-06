import { TUser } from "./User";


export type TAppContext = {
    users: TUser[];
    userDetails: TUser | null;
    searchInput: string;
    fetchState: string;
    error: string | null;
    setSearchInput: Function;
    fetchUser: Function;
    setUserDetails: Function;
};