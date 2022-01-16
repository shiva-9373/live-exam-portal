import React, { useState,useEffect } from "react";
import RenderQuetion from "./RenderQuetion";
import Pagination from "./Pagination";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import service from "../services/service"


function DisplayQuetions(props) {
  const [data,setData]=useState()
  const [topic,setTopic]=useState()
  const [loading, setLoading] = useState(true);
console.log(data)
  useEffect(()=>{
    async function fetchdata(){
   const request1=await service.getQue()
   const request2=await service.getTopic()
   setData(request1.data)
   setTopic(request2.data)
   setLoading(false);

   } 
   fetchdata()

  },[])

  // useEffect(()=>{
  //   async function fetchdata(){
  //  const request2=await service.getTopic()
  //  setTopic(request2.data)
  // console.log(request2)
  //  } 
  //  fetchdata()
  // },[])
  
  console.log(topic)
  const [countPerPage, setCountPerPage] = useState(5);
  const length =  props.data.result.length// need  to fix
  console.log(length)
  const [offset, setOffset] = useState(0);
  const lengthQuetion = length

  const [pageCount, setPageCount] = useState(Math.ceil(lengthQuetion / countPerPage));

  const sliceData =   props.data.result.slice(offset, offset + countPerPage);
  console.log(offset)
  console.log(countPerPage)
console.log(sliceData)
  useEffect(()=>{
setPageCount(Math.ceil(lengthQuetion / countPerPage))

  },[countPerPage])

  

  function dropDownDynamic(){
   return topic ? (topic.result.map(prev=>{
      return(<option value={prev.name} />
      )
    })):""
  }
let selectedPage
  const handlePageClick = (e) => {
     selectedPage = e.selected;
     console.log(typeof selectedPage)
    setOffset(selectedPage*countPerPage );
  };
  const handleDropDownClick =(event)=>{
setCountPerPage(parseInt(event.target.id))
 selectedPage &&
setOffset(selectedPage*countPerPage)
  
  }




  return( 
    loading ? (<h1>Loading</h1>):

   (
    <> 
  <div>
      <div className=" firstContainer d-flex">
        <h2 className="que">Quetions</h2>
        <Link to="/addquestion"  className="btn addButton btn-primary" >
      + Add Quetion</Link>
      </div>

      <div className="container border    ">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container-fluid">
            <div className="d-flex">
              <p>Show</p>

              <div class="dropdown">
                <button
                  class="btn btn-outline-success dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {countPerPage}
                </button>
                <div class="dropdown-menu border-success" aria-labelledby="dropdownMenuButton">
                <button
                    class="dropdown-item "
                    id={5}
                    onClick={handleDropDownClick}
                  >
                    5
                  </button>
                  <button
                    class="dropdown-item "
                    id={10}
                    onClick={handleDropDownClick}
                  >
                    10
                  </button>
                  <button
                    class="dropdown-item"
                    id={20}
                    onClick={handleDropDownClick}
                  >
                    {" "}
                    20
                  </button>
                  <button
                    class="dropdown-item"
                    id={30}
                    onClick={handleDropDownClick}
                  >
                    30
                  </button>
                  <button
                    class="dropdown-item"
                    id={50}
                    onClick={handleDropDownClick}
                  >
                    50
                  </button>
                </div>
              </div>
              <p>record per page</p>
            </div>
            <div className="d-flex">
              <form class="d-flex">
                <input
                  class="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
               
              </form>
              <div className="ml-5">
                <div className="ml-5   ">
                <div  className="ml-5">
                        <div class="form-group ">
                          {" "}
                          <input
                            id="form_name"
                            type="text"
                            list="select_quetion"
                            class="form-control"
                            placeholder="Type to search Subject"
                            required="required"
                            data-error="Firstname is required."
                          />
                          <datalist id="select_quetion">
                            {dropDownDynamic()}
                          </datalist>{" "}
                        </div>
                      </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div>
          <RenderQuetion data={sliceData} />
          
            <ReactPaginate
              previousLabel={"prev"}
              nextLabel={"next"}
              onPageChange={handlePageClick}
              pageCount={pageCount}
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
      </div>
    </div>
    </>
  ));
}

export default DisplayQuetions;
