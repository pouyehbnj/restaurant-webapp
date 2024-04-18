// Star.js
import React from 'react';

const Star = ({ filled }) => {
    const starStyle = filled ? { color: 'orange' } : { color: 'gray' };
    return <span style={starStyle}>★</span>;
};

export default Star;
