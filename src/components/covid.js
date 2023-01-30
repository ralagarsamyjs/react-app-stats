import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import covid from '../APIs/covid';
import Catalog from './catalog';
import PaginationComponent from './paginationComponent';
import Search from './search';
import CovidTable from './covidTable';

function Covid(props) {
  const [covidLive, setCovidLive] = useState([]);
  const [covidHistory, setCovidHistory] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [pageNo, setPageNo] = useState(1);
  const [catalogItem, setCatalogItem] = useState(0);
  const [sortBy, setSortBy] = useState('asc');
  const pageSize = 5;

  const catalogList = [{ name: 'live' }, { name: 'history' }];

  useEffect(() => {
    covid.getCurrentCovidStats().then((response) => {
      console.log('covid live', response);
      setCovidLive(response);
    });

    covid.getHistoricDailyCovidStats().then((response) => {
      console.log('covid history', response);
      // if (response.length > 120) setCovidHistory(response.slice(0, 120));
      // else setCovidHistory(response);
      setCovidHistory(response);
    });
  }, []);

  const onSearchHandler = (input) => {
    setSearchText(input);
  };

  const onItemDeleteHandler = (item) => {
    if (catalogItem === 0) {
      const remainingData = covidLive.filter((live) => {
        return live.state !== item.state;
      });
      setCovidLive(remainingData);
    } else {
      const remainingData = covidHistory.filter((history) => {
        return history.state !== item.state;
      });
      setCovidHistory(remainingData);
    }
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

  const getAvailableDataList = () => {
    if (catalogItem === 0) {
      if (covidLive.length) {
        let displayData = [...covidLive];
        if (searchText)
          displayData = covidLive.filter((live) => {
            return live.state.includes(searchText);
          });
        return displayData;
      }
      return null;
    } else {
      if (covidHistory.length) {
        let displayData = [...covidHistory];
        if (searchText)
          displayData = covidHistory.filter((history) => {
            return history.state.includes(searchText);
          });
        return displayData;
      }
      return null;
    }
  };

  const getPageStartIndex = () => {
    const start = (pageNo - 1) * pageSize;
    if (pageNo > 1) {
      return searchText === '' ? start : 0;
    }
    return start;
  };

  const availableDataList = getAvailableDataList();
  let numberOfItems = 0;
  let sortedlist = null;
  let displayData = null;
  const pageStart = getPageStartIndex();
  const pageEnd = pageStart + pageSize;
  if (availableDataList) {
    console.log('availabledataList: ', availableDataList);
    numberOfItems = availableDataList.length;
    sortedlist = _.orderBy(availableDataList, ['id'], [sortBy]);
    displayData = sortedlist.slice(pageStart, pageEnd);
  }

  return (
    <div className="container">
      <div className="grid">
        <div className="row">
          <div className="col-3">
            <div className="row">
              <Catalog
                catalogList={catalogList}
                onSelect={onCatelogItemSelectHandler}
                selectedIndex={catalogItem}
              />
            </div>
          </div>
          <div className="col">
            <Search onSearch={onSearchHandler} />
            <CovidTable
              items={displayData}
              onSort={onSortHandler}
              onDelete={onItemDeleteHandler}
              sortBy={sortBy}
            />
            <PaginationComponent
              onPageChange={onPaginationHandler}
              total={numberOfItems}
              itemsPerPage={pageSize}
              currentPage={pageNo}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Covid;
