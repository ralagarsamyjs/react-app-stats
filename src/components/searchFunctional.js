function Search(props) {
  return (
    <div className="input-group">
      <div className="form-outline">
        <input
          type="text"
          id="search-text"
          className="form-control"
          placeholder="Type to search..."
          onChange={(e) => {
            props.onSearch(e.target.value);
          }}
        />
      </div>
    </div>
  );
}

export default Search;
