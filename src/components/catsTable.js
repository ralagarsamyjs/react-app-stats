import React from 'react';
import Delete from './delete';
import { useNavigate } from 'react-router-dom';

function CatsTable(props) {
  const { items, onSort, onDelete, sortBy } = props;
  const navigate = useNavigate();

  const toComponentItem = (data) => {
    console.log('toComponentItem()-> data', data);
    navigate('/item', { state: data });
  };

  const getSortClasses = () => {
    return sortBy === 'asc' ? 'fa fa-sort-asc' : 'fa fa-sort-desc';
  };

  return (
    <React.Fragment>
      {items !== null ? (
        <table className="table">
          <thead>
            <tr>
              <th className="col-sm" onClick={onSort}>
                Id
                <i className={getSortClasses()}></i>
              </th>
              <th className="col-sm-2">url</th>
              <th className="col-sm-2">width</th>
              <th className="col-sm-2">height</th>
              <th className="col-sm-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => {
              return (
                <tr key={index}>
                  <td scope="row">
                    <a
                      className="item-name"
                      onClick={() => {
                        toComponentItem(item);
                      }}
                    >
                      {item.id}
                    </a>
                  </td>
                  <td scope="row">
                    <a className="item-name" href={item.url} target="_blank">
                      {item.url}
                    </a>
                  </td>
                  <td scope="row">{item.width}</td>
                  <td scope="row">{item.height}</td>
                  <td>
                    <Delete onDelete={onDelete} item={item} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <h1>Loading...</h1>
      )}
    </React.Fragment>
  );
}

export default CatsTable;
