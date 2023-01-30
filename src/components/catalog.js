import React from 'react';

function Catalog(props) {
  const { catalogList, onSelect, selectedIndex } = props;

  const getClasses = (index) => {
    return index === selectedIndex
      ? 'list-group-item list-group-item-action active'
      : 'list-group-item list-group-item-action';
  };
  return (
    <div className="list-group">
      {catalogList.map((catalog, index) => {
        return (
          <button
            type="button"
            key={catalog.name}
            className={getClasses(index)}
            onClick={() => {
              onSelect(index);
            }}
          >
            {catalog.name}
          </button>
        );
      })}
    </div>
  );
}

export default Catalog;
