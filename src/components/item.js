import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
function Item() {
  let navigate = useNavigate();
  let location = useLocation();

  const data = location.state;

  const dataItemToKeyValues = (item) => {
    const entries = Object.entries(item);
    const listitem = entries.map(([key, value]) => {
      return (
        <li
          className="list-group-item d-flex justify-content-between align-items-start"
          key={key}
        >
          <div className="ms-2 me-auto">
            <div className="fw-bold">{key}</div>
            {value}
          </div>
        </li>
      );
    });
    return <ol className="list-group list-group-numbered">{listitem}</ol>;
  };
  return (
    <div>
      <span className="item-detail">Detail Info</span>
      <button
        className="btn btn-primary back-btn"
        onClick={() => {
          navigate('/starwars');
        }}
      >
        Back
      </button>
      {!data ? 'Loading' : <ul>{dataItemToKeyValues(data)}</ul>}
    </div>
  );
}

export default Item;
