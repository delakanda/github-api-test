import React from 'react';
import './SearchInput.css';
import { AppContext } from '../../utils/ContextApi';

function SearchInput() {
    return (
        <AppContext.Consumer>
            {context => context && (
                <div className="search-input">
                    <input type="text" 
                        data-testid="search-input"
                        value={context.searchInput} 
                        placeholder="Enter username to search"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => context.setSearchInput(e.target.value)} />

                    <span data-testid="error-msg" className="error">{context.error}</span>

                    <br/>

                    <button disabled={context.searchInput ? false : true}
                        data-testid="search-btn" 
                        onClick={() => context.fetchUser()} 
                        className="search-btn">Search</button>
                </div>
            )}
        </AppContext.Consumer>
    );
}

export default SearchInput;