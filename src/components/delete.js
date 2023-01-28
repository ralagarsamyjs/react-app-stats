import React from 'react';
function Delete(props) {
  return (
    <button
      className="btn btn-danger"
      type="button"
      onClick={() => {
        props.onDelete(props.item);
      }}
    >
      Delete
    </button>
  );
}

export default Delete;
