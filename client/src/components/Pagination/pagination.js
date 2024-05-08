import React from 'react';

// Pagination component for navigating pages of restaurants.
function Pagination({ total, currentPage, onPageChange, startPageIndex, setStartPageIndex }) {
    const visiblePages = 10;  // Maximum number of page buttons to display at once.
    const pageCount = Math.ceil(total / 10); // Calculate total number of pages.

    // Function to jump to the next set of pages.
    const nextPageSet = () => {
        if (startPageIndex + visiblePages < pageCount) {
            setStartPageIndex(startPageIndex + visiblePages);
        }
    };

    // Function to jump to the previous set of pages.
    const previousPageSet = () => {
        if (startPageIndex > 0) {
            setStartPageIndex(startPageIndex - visiblePages);
        }
    };

    // Generate page number buttons based on the current set of visible pages.
    let pages = [];
    for (let i = startPageIndex; i < Math.min(startPageIndex + visiblePages, pageCount); i++) {
        pages.push(
            <button
                key={i}
                style={{ margin: '0 5px', color:'orange', fontWeight: currentPage === i ? 'bold' : 'normal' }}
                onClick={() => onPageChange(i)}
            >
                {i + 1}
            </button>
        );
    }
     // Render the pagination component with next and previous buttons conditionally displayed.
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
