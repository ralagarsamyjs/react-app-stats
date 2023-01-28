function Catalogue(props) {
  const { catalogueList, onSelect, selectedIndex } = props;

  const getClasses = (index) => {
    return index === selectedIndex
      ? 'list-group-item list-group-item-action active'
      : 'list-group-item list-group-item-action';
  };
  return (
    <div className="list-group">
      <button
        type="button"
        className="list-group-item list-group-item-action disabled"
      >
        CATALOGUE
      </button>
      {catalogueList.map((catalogue, index) => {
        return (
          <button
            type="button"
            key={catalogue.name}
            className={getClasses(index)}
            onClick={() => {
              onSelect(index);
            }}
          >
            {catalogue.name}
          </button>
        );
      })}
    </div>
  );
}

export default Catalogue;
