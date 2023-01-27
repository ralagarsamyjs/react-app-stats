import React, { useState, useEffect } from 'react';
import starwars from '../APIs/starwars';
import Delete from './deleteFunctional';
import Search from './searchFunctional';

function MainFunctional() {
  const [data, setData] = useState([]);
  let dataClone = [];

  const categories = [{ name: 'people' }, { name: 'cats' }, { name: 'covid' }];

  useEffect(() => {
    starwars.getPeople().then((response) => {
      console.log('response', response);
      dataClone = [...response];
      setData(response);
    });
  }, []);

  const onSearchHandler = (input) => {
    if (!input) {
      setData(dataClone);
      return;
    }
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
    <div>
      <div>
        <Search onSearch={onSearchHandler} />
      </div>
      <div className="grid">
        <div className="row">
          <div className="col-3">
            <div className="row">
              <ul className="list-group">
                <li className="list-group-item disabled" aria-disabled="true">
                  <h1>categories</h1>
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
          <div className="col">
            <table className="table-primary">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => {
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainFunctional;
