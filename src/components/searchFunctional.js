import { Fragment } from 'react/cjs/react.production.min';

function Search(props) {
  return (
    <Fragment>
      <label htmlFor="search-text">Search Text: </label>
      <input
        type="text"
        id="search-text"
        onChange={(e) => {
          props.onSearch(e.target.value);
        }}
      ></input>
    </Fragment>
  );
}

export default Search;
