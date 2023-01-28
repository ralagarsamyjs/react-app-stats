import React, { useState, useEffect } from 'react';
import starwars from '../APIs/starwars';
import Delete from './deleteFunctional';
import Pagination from './paginationFunctional';
import Search from './searchFunctional';

function MainFunctional() {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [pageNo, setPageNo] = useState(1);
  const pageSize = 5;

  const categories = [{ name: 'people' }, { name: 'cats' }, { name: 'covid' }];

  useEffect(() => {
    starwars.getPeople().then((response) => {
      console.log('response', response);
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

  const availableDataList = getAvailableDataList();
  const numberOfItems = availableDataList.length;
  const pageStart = getPageStartIndex();
  const pageEnd = pageStart + pageSize;

  const displayData = availableDataList.slice(pageStart, pageEnd);

  return (
    <div>
      <div className="grid">
        <div className="row">
          <div className="col-3">
            <div className="row">
              <ul className="list-group">
                <li className="list-group-item disabled" aria-disabled="true">
                  <h1>Categories</h1>
                </li>
                {categories.map((category) => {
                  return (
                    <li key={category.name} className="list-group-item">
                      {category.name}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="col-6">
            <Search onSearch={onSearchHandler} />
            <table className="table">
              <thead>
                <tr>
                  <th className="col-sm">Name</th>
                  <th className="col-sm-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayData.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td scope="row">{item.name}</td>
                      <td scope="row">
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

export default MainFunctional;
