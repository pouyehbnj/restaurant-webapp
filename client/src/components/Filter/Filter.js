import React from 'react';

function Filter({ onFilterChange }) {
    return (
        <div style={{ marginBottom: '20px' }}>
            <div>
                <label>
                    Show Open Only:
                    <input
                        type="checkbox"
                        onChange={e => onFilterChange('isOpen', e.target.checked )}
                    />
                </label>
            </div>
            <div>
                <label>
                    Filter by Cuisine:
                    <select onChange={e => onFilterChange('cuisine', e.target.value )}>
                        <option value="">All Cuisines</option>
                        <option value="Italian">Italian</option>
                        <option value="Pizza">Pizza</option>
                        <option value="Mexican">Mexican</option>
                        <option value="Chinese">Chinese</option>
                        <option value="Fast Food">Fast Food</option>
                        <option value="Halal">Halal</option>
                        <option value="Vegetarian">Vegetarian</option>
                        <option value="Indian">Indian</option>
                        <option value="Middle Eastern">Middle Eastern</option>
                        <option value="Breakfast">Breakfast</option>
                        <option value="Sandwiches">Sandwiches</option>
                        <option value="Kebab">Kebab</option>
                        <option value="Sushi">Sushi</option>
                        
                    </select>
                </label>
            </div>
        </div>
    );
}

export default Filter;
