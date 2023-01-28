import _ from 'lodash';

function Pagination(props) {
  const { pageSize, totalItems, onPageSelect, currentPage } = props;
  const totalPages = Math.ceil(totalItems / pageSize);

  const pages = _.range(1, totalPages + 1);

  const getClasses = (page) => {
    return page === currentPage ? 'page-item active' : 'page-item';
  };
  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => {
          return (
            <li
              className={getClasses(page)}
              key={page}
              onClick={() => {
                onPageSelect(page);
              }}
            >
              <a className="page-link" href="#">
                {page}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Pagination;
