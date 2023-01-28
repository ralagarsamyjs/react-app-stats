import React from 'react';
import { useNavigate } from 'react-router-dom';
function Item(props) {
  const { data } = props;
  let navigate = useNavigate();

  const dataItemToKeyValues = (item) => {
    const entries = Object.entries(item);
    const listitem = entries.map(([key, value]) => {
      <li>
        {key}:{value}
      </li>;
    });
    return <ul>{listitem}</ul>;
  };
  return (
    <div>
      {!data ? (
        'Loading'
      ) : (
        <ul>
          {data.map((item) => {
            return <li>{dataItemToKeyValues(item)}</li>;
          })}
        </ul>
      )}
      <button
        className="btn btn-primary"
        onClick={() => {
          navigate('/starwars');
        }}
      >
        Back
      </button>
    </div>
  );
}

export default Item;
