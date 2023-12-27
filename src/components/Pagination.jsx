import ReactPaginate from "react-paginate";
import React, {
    useEffect,
    useState
} from "react";

const items = [...Array(33).keys()];

function Items({ currentItems }) {
    return (
        <div className="items">
            {currentItems && currentItems.map((item) => (
                <div>
                    <h3>Item #{item}</h3>
                </div>
            ))}
        </div>
    );
}

export default function PaginatedItems({ itemsPerPage }) {
    // We start with an empty list of items.
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        // Fetch items from another resources.
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setCurrentItems(items.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(items.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = event.selected * itemsPerPage % items.length;
        console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
        setItemOffset(newOffset);
    };

    return (
        <>
            <Items currentItems={currentItems} />
            <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                previousLabel="< previous"
                pageClassName="page-item border bg-orange-60 flex "
                pageLinkClassName="page-link bg-blue-500 w-[1rem] flex-none  h-[1rem] grid place-items-center rounded-sm"
                previousClassName="page-item"
                previousLinkClassName="page-link bg-red-600"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination flex gap-x-4"
                activeClassName="active bg-green-500"
                renderOnZeroPageCount={null}
            />
        </>
    );
}

// Add a <div id="container"> to your HTML to see the componend rendered.
