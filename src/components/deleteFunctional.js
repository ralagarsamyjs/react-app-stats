function Delete(props){
    return (
        <button type="button" onClick={()=>{props.onDelete(props.item)}}>Delete</button>
    )
}

export default Delete;