import React from 'react';
import './SearchInput.css';
import { AppContext } from '../../utils/ContextApi';

function SearchInput() {
    return (
        <AppContext.Consumer>
            {context => context && (
                <div className="search-input">
                    <input type="text" 
                        value={context.searchInput} 
                        placeholder="Enter username to search"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => context.setSearchInput(e.target.value)} />

                    <button onClick={() => context.fetchUser()} className="search-btn">Search</button>
                </div>
            )}
        </AppContext.Consumer>
    );
}

export default SearchInput;