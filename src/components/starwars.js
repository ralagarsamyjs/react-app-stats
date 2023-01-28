import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import starwars from '../APIs/starwars';
import Catalogue from './catalogue';
import Delete from './delete';
import Pagination from './pagination';
import Search from './search';
import { useNavigate } from 'react-router-dom';

function Starwars(props) {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [pageNo, setPageNo] = useState(1);
  const [catalogItem, setCatalogItem] = useState(0);
  const [sortBy, setSortBy] = useState('asc');
  const pageSize = 5;
  const navigate = useNavigate();

  const catalogueList = [
    { name: 'people' },
    { name: 'planets' },
    { name: 'starships' },
  ];

  useEffect(() => {
    starwars.getPeople().then((response) => {
      // console.log('response', response);
      setData(response);
    });
  }, []);

  const onSearchHandler = (input) => {
    setSearchText(input);
  };

  const onItemDeleteHandler = (item) => {
    const remainingData = data.filter((people) => {
      return people.name !== item.name;
    });
    setData(remainingData);
  };

  const onPaginationHandler = (pno) => {
    setPageNo(pno);
  };

  const onCatelogItemSelectHandler = (index) => {
    setCatalogItem(index);
  };

  const onSortHandler = () => {
    const sorting = sortBy === 'asc' ? 'desc' : 'asc';
    setSortBy(sorting);
  };

  const getSortClasses = () => {
    return sortBy === 'asc' ? 'fa fa-sort-asc' : 'fa fa-sort-desc';
  };
  const getAvailableDataList = () => {
    let displayData = [...data];
    if (searchText)
      displayData = data.filter((people) => {
        return people.name.includes(searchText);
      });
    return displayData;
  };
  const getPageStartIndex = () => {
    const start = (pageNo - 1) * pageSize;
    if (pageNo > 1) {
      return searchText === '' ? start : 0;
    }
    return start;
  };

  const toComponentItem = (data) => {
    navigate('/item', { state: data });
  };

  const availableDataList = getAvailableDataList();
  const numberOfItems = availableDataList.length;
  const pageStart = getPageStartIndex();
  const pageEnd = pageStart + pageSize;

  const sortedlist = _.orderBy(availableDataList, ['name'], [sortBy]);

  const displayData = sortedlist.slice(pageStart, pageEnd);

  return (
    <div className="container">
      <div className="grid">
        <div className="row">
          <div className="col-3">
            <div className="row">
              <Catalogue
                catalogueList={catalogueList}
                onSelect={onCatelogItemSelectHandler}
                selectedIndex={catalogItem}
              />
            </div>
          </div>
          <div className="col">
            <Search onSearch={onSearchHandler} />
            <table className="table">
              <thead>
                <tr>
                  <th className="col-sm" onClick={onSortHandler}>
                    Name
                    <i className={getSortClasses()}></i>
                  </th>
                  <th className="col-sm-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayData.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td scope="row">
                        <a
                          className="item-name"
                          onClick={() => {
                            toComponentItem(item);
                          }}
                        >
                          {item.name}
                        </a>
                        {/* <Link
                          className="item-name"
                          to={{
                            pathname: '/item',
                            state: item,
                          }}
                        >
                          {item.name}
                        </Link> */}
                      </td>
                      <td>
                        <Delete onDelete={onItemDeleteHandler} item={item} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <Pagination
              onPageSelect={onPaginationHandler}
              totalItems={numberOfItems}
              pageSize={pageSize}
              currentPage={pageNo}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Starwars;
