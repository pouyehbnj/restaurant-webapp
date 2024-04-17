import React from 'react';

function RestaurantList({ restaurants }) {
    if (restaurants === null) {
        return <p>Search for restaurants by entering a postcode above.</p>;
    } else if (restaurants.length === 0) {
        return <p>No restaurants found for this postcode.</p>;
    }
    return (
        <ul>
            {restaurants.map((restaurant, index) => (
                <li key={index}>
                    <h3>{restaurant.name}</h3>
                    <p>Cuisines: {restaurant.cuisines}</p>
                    <p>Rating: {restaurant.rating}</p>
                    <p>Address: {restaurant.address}</p>
                    <p>Distance:{restaurant.distance}</p>
                </li>
            ))}
        </ul>
    );
}

export default RestaurantList;
