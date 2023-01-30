import React from 'react';
import Delete from './delete';
import { useNavigate } from 'react-router-dom';

function Planets(props) {
  const { people, onSort, onDelete, sortBy } = props;
  const navigate = useNavigate();

  const toComponentItem = (data) => {
    console.log('toComponentItem()-> data', data);
    navigate('/item', { state: data });
  };

  const getSortClasses = () => {
    return sortBy === 'asc' ? 'fa fa-sort-asc' : 'fa fa-sort-desc';
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th className="col-sm" onClick={onSort}>
            Name
            <i className={getSortClasses()}></i>
          </th>
          <th className="col-sm-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {people.map((item, index) => {
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
              </td>
              <td>
                <Delete onDelete={onDelete} item={item} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Planets;
