import React from 'react';

function Pagination({ total, currentPage, onPageChange }) {
    const pageCount = Math.ceil(total / 10);
    let pages = [];
    for (let i = 0; i < pageCount; i++) {
        pages.push(
            <button
                key={i}
                style={{ margin: '0 5px', fontWeight: currentPage === i ? 'bold' : 'normal' }}
                onClick={() => onPageChange(i)}
            >
                {i + 1}
            </button>
        );
    }
    return <div>{pages}</div>;
}

export default Pagination;
