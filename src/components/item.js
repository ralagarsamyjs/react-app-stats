function Item() {
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
    </div>
  );
}

export default Item;
