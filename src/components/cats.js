import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import cats from '../APIs/cats';
import Catalog from './catalog';
import Pagination from './pagination';
import Search from './search';
import CatsTable from './catsTable';

function Cats(props) {
  const [seqCats, setSeqCats] = useState([]);
  const [randCats, setRandCats] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [pageNo, setPageNo] = useState(1);
  const [catalogItem, setCatalogItem] = useState(0);
  const [sortBy, setSortBy] = useState('asc');
  const pageSize = 5;

  const catalogList = [{ name: 'seqcats' }, { name: 'randcats' }];

  useEffect(() => {
    cats.get100Cats().then((response) => {
      console.log('cats', response);
      setSeqCats(response);
    });

    cats.getRandomCat().then((response) => {
      console.log('random cats', response);
      setRandCats(response);
    });
  }, []);

  const onSearchHandler = (input) => {
    setSearchText(input);
  };

  const onItemDeleteHandler = (item) => {
    if (catalogItem === 0) {
      const remainingData = seqCats.filter((cat) => {
        return cat.id !== item.id;
      });
      setData(remainingData);
    } else {
      const remainingData = randCats.filter((planet) => {
        return planet.name !== item.id;
      });
      setRandCats(remainingData);
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
      if (seqCats.length) {
        let displayData = [...seqCats];
        if (searchText)
          displayData = seqCats.filter((cat) => {
            return cat.id.includes(searchText);
          });
        return displayData;
      }
      return null;
    } else {
      if (randCats.length) {
        let displayData = [...randCats];
        if (searchText)
          displayData = randCats.filter((randcat) => {
            return randcat.id.includes(searchText);
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
            <CatsTable
              items={displayData}
              onSort={onSortHandler}
              onDelete={onItemDeleteHandler}
              sortBy={sortBy}
            />
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

export default Cats;
