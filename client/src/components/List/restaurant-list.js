import React from 'react';
import Star from './rating';

// The RestaurantList component displays a list of restaurants or appropriate messages

function RestaurantList({ restaurants }) {
    if (restaurants === null) {
        return <p>Search for restaurants by entering a postcode above.</p>;
    } else if (restaurants.length === 0) {
        return <ul style={{ listStyleType: 'none', padding: 0 }}>
        <p>No restaurants found for this postcode!</p>
         <img
         src={"https://media0.giphy.com/media/3ohzdFCn9mYfmuAmEU/200w_s.gif?cid=8d8c03589fnhmi01ajythtj6lluw6ng0v60wrm4oz4hzjpio&ep=v1_gifs_search&rid=200w_s.gif&ct=g"}/>
         </ul>   
    }

    // Render a list of restaurants if data is available.
    return (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
        {restaurants.map((restaurant, index) => (
            <li key={index} style={{
                marginBottom: '20px',
                border: '1px solid #ddd', // Light grey border
                borderRadius: '8px', // Rounded corners
                padding: '10px', // Inner spacing
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)', // Subtle shadow
                background: '#fff' // White background
            }}>
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <h3 style={{
                        display: 'flex',
                        alignItems: 'center',
                        margin: '0 10px', // Adjust as necessary for spacing
                        whiteSpace: 'nowrap' // Keeps the name and logo on the same line
                    }}>
                        {restaurant.name}
                        <img
                            src={restaurant.logoUrl}
                            alt={`${restaurant.name} Logo`}
                            style={{ width: '50px', height: '50px', marginLeft: '10px' }}
                        />
                    </h3>
                </div>
                <p><b>Cuisines:</b> {restaurant.cuisines}</p>
                <p><b>Rating:</b>  {restaurant.rating} {Array.from({ length: 5 }, (_, i) => (
                        <Star key={i} filled={i <= restaurant.rating-1} />
                    ))}
                </p>
                <p>
                
                        <a href={`https://www.google.com/maps/?q=${restaurant.coordinates[1]},${restaurant.coordinates[0]}`} target="_blank" rel="noopener noreferrer" style={{ color: 'blue' }}>
                        <b>Address</b></a>: {restaurant.address}
                        
                    </p>
                <p><b>Distance:</b>  {restaurant.distance / 1000} Km</p>
            </li>
        ))}
    </ul>
);
    
}

export default RestaurantList;
