import React from 'react';

function RestaurantList({ restaurants }) {
    return (
        <ul>
            {restaurants.map((restaurant, index) => (
                <li key={index}>
                    <h3>{restaurant.name}</h3>
                    <p>Cuisines: {restaurant.cuisines}</p>
                    <p>Rating: {restaurant.rating}</p>
                    <p>Address: {restaurant.address}</p>
                </li>
            ))}
        </ul>
    );
}

export default RestaurantList;
