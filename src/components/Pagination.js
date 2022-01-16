import React,{useState} from "react";
import ReactPaginate from 'react-paginate';


function Pagination (props){
    const [offset, setOffset] = useState(5);
    const [data, setData] = useState([]);
    const [perPage] = useState(10);
    const [pageCount, setPageCount] = useState(0)


  const slice = props.data.result.slice(offset, offset + perPage)

  const lengthQuetion=props.data.result.length
  console.log(lengthQuetion)



  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage + 1)
};
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
    
      <ReactPaginate
        
        previousLabel={"prev"}
        nextLabel={"next"}
        onPageChange={handlePageClick}

        pageCount={Math.ceil(lengthQuetion / 5)}
        pageRangeDisplayed={4}
        marginPagesDisplayed={1}
        // onPageChange={setPage}
        containerClassName="pagination"
        activeClassName="active"
        pageLinkClassName="page-link"
        breakLinkClassName="page-link"
        nextLinkClassName="page-link"
        previousLinkClassName="page-link"
        pageClassName="page-item"
        breakClassName="page-item"
        nextClassName="page-item"
        previousClassName="page-item"
      
      />
    </div>
  );
}

export default Pagination