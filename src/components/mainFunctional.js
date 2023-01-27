import React, { useState, useEffect } from 'react';
import starwars from '../APIs/starwars';
import Delete from './deleteFunctional';
import Search from './searchFunctional';

function MainFunctional() {
  const [data, setData] = useState([]);

  useEffect(() => {
    starwars.getPeople().then((response) => {
      console.log('response', response);
      setData(response);
    });
  }, []);

  const onSearchHandler = (input) => {
    const searchedData = data.filter((people) => {
      return people.name.includes(input);
    });
    setData(searchedData);
  };

  const onItemDeleteHandler = (item) => {
    const remainingData = data.filter((people) => {
      return people.name !== item.name;
    });
    setData(remainingData);
  };
  return (
    <div className="App">
      {data.map((item, index) => {
        return (
          <div key={index}>
            <span>name: {item.name}</span>;
            <Delete onDelete={onItemDeleteHandler} item={item} />
          </div>
        );
      })}
      <Search onSearch={onSearchHandler} />
    </div>
  );
}

export default MainFunctional;
