// Star.js
import React from 'react';
// Star component is used to display a filled or empty star based on the rating.
const Star = ({ filled }) => {
    const starStyle = filled ? { color: 'orange' } : { color: 'gray' };
    return <span style={starStyle}>★</span>;
};

export default Star;
