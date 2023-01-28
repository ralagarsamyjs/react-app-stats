import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import starwars from '../APIs/starwars';
import Catalog from './catalog';
import Pagination from './pagination';
import Search from './search';
// import People from './people';
// import Planets from './planets';
// import Starships from './starships';
import StarwarsTable from './starwarsTable';

function Starwars(props) {
  const [data, setData] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [starships, setStarships] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [pageNo, setPageNo] = useState(1);
  const [catalogItem, setCatalogItem] = useState(0);
  const [sortBy, setSortBy] = useState('asc');
  const pageSize = 5;

  const catalogList = [
    { name: 'people' },
    { name: 'planets' },
    { name: 'starships' },
  ];

  useEffect(() => {
    starwars.getPeople().then((response) => {
      console.log('people', response);
      setData(response);
    });
    starwars.getPlanets().then((response) => {
      console.log('planets', response);
      setPlanets(response);
    });
    starwars.getStarships().then((response) => {
      console.log('startships', response);
      setStarships(response);
    });
  }, []);

  const onSearchHandler = (input) => {
    setSearchText(input);
  };

  const onItemDeleteHandler = (item) => {
    if (catalogItem === 0) {
      const remainingData = data.filter((people) => {
        return people.name !== item.name;
      });
      setData(remainingData);
    } else if (catalogItem === 1) {
      const remainingData = planets.filter((planet) => {
        return planet.name !== item.name;
      });
      setPlanets(remainingData);
    } else {
      const remainingData = starships.filter((starship) => {
        return starship.name !== item.name;
      });
      setStarships(remainingData);
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
      let displayData = [...data];
      if (searchText)
        displayData = data.filter((people) => {
          return people.name.includes(searchText);
        });
      return displayData;
    } else if (catalogItem === 1) {
      let displayData = [...planets];
      if (searchText)
        displayData = planets.filter((planet) => {
          return planet.name.includes(searchText);
        });
      return displayData;
    } else {
      let displayData = [...starships];
      if (searchText)
        displayData = starships.filter((starship) => {
          return starship.name.includes(searchText);
        });
      return displayData;
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
              <Catalog
                catalogList={catalogList}
                onSelect={onCatelogItemSelectHandler}
                selectedIndex={catalogItem}
              />
            </div>
          </div>
          <div className="col">
            <Search onSearch={onSearchHandler} />
            <StarwarsTable
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

export default Starwars;
