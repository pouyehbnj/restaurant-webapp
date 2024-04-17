import React from 'react';

function Pagination({ total, currentPage, onPageChange, startPageIndex, setStartPageIndex }) {
    const visiblePages = 10;
    const pageCount = Math.ceil(total / 10);

    const nextPageSet = () => {
        if (startPageIndex + visiblePages < pageCount) {
            setStartPageIndex(startPageIndex + visiblePages);
        }
    };

    const previousPageSet = () => {
        if (startPageIndex > 0) {
            setStartPageIndex(startPageIndex - visiblePages);
        }
    };

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
