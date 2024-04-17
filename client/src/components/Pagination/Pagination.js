import React, { useState } from 'react';

function Pagination({ total, currentPage, onPageChange }) {
    const [startPageIndex, setStartPageIndex] = useState(0);
    const pageCount = Math.ceil(total / 10); // Assuming each page shows 10 restaurants
    const visiblePages = 10; // Number of visible pages at a time

    const nextPageSet = () => {
        // Move to the next set of pages
        const newStart = startPageIndex + visiblePages;
        if (newStart < pageCount) {
            setStartPageIndex(newStart);
        }
    };

    const previousPageSet = () => {
        // Move to the previous set of pages
        const newStart = startPageIndex - visiblePages;
        if (newStart >= 0) {
            setStartPageIndex(newStart);
        }
    };

    let pages = [];
    for (let i = startPageIndex; i < Math.min(startPageIndex + visiblePages, pageCount); i++) {
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

    return (
        <div>
            {startPageIndex > 0 && (
                <button onClick={previousPageSet} style={{ marginRight: '5px' }}>
                    {'<'}
                </button>
            )}
            {pages}
            {startPageIndex + visiblePages < pageCount && (
                <button onClick={nextPageSet}>
                    {'>'}
                </button>
            )}
        </div>
    );
}

export default Pagination;
