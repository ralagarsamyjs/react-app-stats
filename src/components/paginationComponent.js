import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

const PaginationComponent = ({
  total = 0,
  itemsPerPage = 10,
  currentPage = 1,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / itemsPerPage);
  const paginationItems = [];

  if (totalPages === 0) return null;

  const createPaginationItem = (i) => {
    return (
      <Pagination.Item
        key={i}
        active={i === currentPage}
        onClick={() => onPageChange(i)}
      >
        {i}
      </Pagination.Item>
    );
  };

  // Add the first item (page 1)
  paginationItems.push(createPaginationItem(1));
  // Add an ellipsis
  paginationItems.push(<Pagination.Ellipsis />);
  const midpoint = totalPages / 2;
  console.log('midpoint: ', midpoint);
  // Create page numbers in the middle
  for (let i = midpoint; i <= midpoint + 4; i++) {
    console.log('index : ', i);
    paginationItems.push(createPaginationItem(i));
  }
  // Add an ellipsis
  paginationItems.push(<Pagination.Ellipsis />);
  // Add the last item (page N)
  paginationItems.push(createPaginationItem(totalPages));

  console.log('paginationItems: ', paginationItems);

  return (
    <Pagination className="paginationInfo">
      <Pagination.Prev
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />
      {paginationItems}
      <Pagination.Next
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    </Pagination>
  );
};

export default PaginationComponent;
