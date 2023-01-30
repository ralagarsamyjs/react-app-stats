import React from 'react';
import Delete from './delete';
import { useNavigate } from 'react-router-dom';

function CovidTable(props) {
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
                state
                <i className={getSortClasses()}></i>
              </th>
              <th className="col-sm-2">date</th>
              <th className="col-sm-2">positive</th>
              <th className="col-sm-2">positiveIncrease</th>
              <th className="col-sm-2">total</th>
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
                      {item.state}
                    </a>
                  </td>
                  <td scope="row">{item.date}</td>
                  <td scope="row">{item.positive}</td>
                  <td scope="row">{item.positiveIncrease}</td>
                  <td scope="row">{item.total}</td>
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

export default CovidTable;
