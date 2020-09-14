import React from 'react';

const SearchFilter = ({ searchUser, sortUser }) => {
    return (
        <div className="row">
            <div className="input-field col s4 left">
                <label>Sort By</label>
                <select defaultValue="" onChange={sortUser}>
                    <option value="" disabled>
                        Choose your option
                    </option>
                    <option value="asc">Name: A-Z</option>
                    <option value="desc">Name: Z-A</option>
                </select>
            </div>
            <label>
                <span className="bmd-form-group bmd-form-group-sm">
                    <input
                        type="search"
                        className="form-control form-control-sm"
                        placeholder="Search records"
                        aria-controls="datatables"
                        onChange={searchUser}
                    />
                </span>
            </label>
        </div>
    );
};

export default SearchFilter;
