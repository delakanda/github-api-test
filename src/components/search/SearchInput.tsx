import React from 'react';
import './SearchInput.css';

type TProps = {
    searchInput: string;
    setSearchInput: Function;
    fetchUser: Function;
};

function SearchInput(props: TProps) {
    return (
        <div className="search-input">
            <input type="text" 
                value={props.searchInput} 
                placeholder="Enter username to search"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.setSearchInput(e.target.value)} />

            <button onClick={() => props.fetchUser()} className="search-btn">Search</button>
        </div>
    );
}

export default SearchInput;