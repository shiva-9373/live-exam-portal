import React, { useState, useEffect } from "react";
import RenderQuetion from "./RenderQuetion";
import Pagination from "./Pagination";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import service from "../services/service";
import http from "../services/http_common";

function DisplayQuetions2(props) {
  const [data, setData] = useState();
  const [topic, setTopic] = useState();
  const [loading, setLoading] = useState(true);
  const [countPerPage, setCountPerPage] = useState(5);
  const [offset, setOffset] = useState(1);
  const [lengthQuetion, setLengthQuestion] = useState(0);
  const [topicId, setTopicId] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [term, setTerm] = useState("");
  const [deleteQueId, setDeleteQueId] = useState("");

  //   useEffect(() => {
  //     setLoading(true);
  //     fetch('/api/data')
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setData(data);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       })
  //       .finally(() => {
  //         setLoading(false);
  //       });
  //   }, []);

  useEffect(() => {
    async function fetchdata() {
      setLoading(true);

      const request2 = await http.get(
        `http://admin.liveexamcenter.in/api/topics?page=1&limit=9007199254740991&term=`
      );

      setTopic(request2.data);
      setLoading(false);
    }
    fetchdata();
  }, [countPerPage, topicId]);

  async function deleteQue(id) {
    setLoading(true);

    const request2 = await http.delete(`questions/${id}`);

    setTopic(request2.data);
    setLoading(false);
  }

  useEffect(() => {
    async function fetchdata() {
      setLoading(true);
      const request1 = await http.get(
        `questions?page=${offset}&limit=${countPerPage}&term=${term}&topic=${topicId}`
      );
      setData(request1.data);
      setLengthQuestion(request1.data.totalCount);
      setLoading(false);
    }
    fetchdata();
  }, [countPerPage, topicId, term, deleteQueId]);

  console.log(data);
  // useEffect(()=>{
  //   async function fetchdata(){
  //  const request2=await service.getTopic()
  //  setTopic(request2.data)
  // console.log(request2)
  //  }
  //  fetchdata()
  // },[])

  const [pageCount, setPageCount] = useState(
    Math.ceil(lengthQuetion / countPerPage)
  );

  const sliceData = data ? data : [];
  useEffect(() => {
    setPageCount(Math.ceil(lengthQuetion / countPerPage));
  }, [lengthQuetion]);

  function dropDownDynamic() {
    return topic
      ? topic.result.map((prev) => {
          return <option id={prev.topic} value={prev.name} />;
        })
      : "";
  }

  const handleDeleteClick = (event) => {
    
       if( window.confirm("Are you sure you want to delete the question, this can not be rolled back?")){
        deleteQue(event.target.id);
        setDeleteQueId(event.target.id)
       }
       
     
   
  };

  let selectedPage;
  const handlePageClick = (e) => {
    selectedPage = e.selected;
    console.log(typeof selectedPage);
    setOffset(selectedPage * countPerPage);
  };

  const handleTopicClick = (event) => {
    if (!event.nativeEvent.inputType) {
      event.target.blur();
    }
    setInputValue(event.target.value)
    console.log("hii");
    console.log(event.target.value);
    for (let i = 0; i < topic.result.length; i++) {
      console.log("hello");
      if (event.target.value == topic.result[i].name) {
        setTopicId(topic.result[i]._id);
        setInputValue(topic.result[i].name);
        console.log("topic id  " + topic.result[i]._id);
      }
    }

    console.log(topicId);
  };

  const clear = (event) => {
    event.target.value = "";
    setTopicId("");
    inputValue("");
  };

  const handleDropDownClick = (event) => {
    setCountPerPage(parseInt(event.target.id));
    selectedPage && setOffset(selectedPage * countPerPage);
  };

  const handleSearchChange = (event) => {
    setTerm(event.target.value);
  };

  if (loading) {
    return <h1>Data is loading...</h1>;
  }
  const crossButton = () => <span>x</span>;
  return (
    <>
      <div>
        <div className=" firstContainer d-flex">
          <h2 className="que">Quetions</h2>
          <Link to="/addquestion" className="btn addButton btn-primary">
            + Add Quetion
          </Link>
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
                  <div
                    class="dropdown-menu border-success"
                    aria-labelledby="dropdownMenuButton"
                  >
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
                    value={term}
                    placeholder="Search"
                    aria-label="Search"
                    onChange={handleSearchChange}
                  />
                  <button type="reset">&times;</button>
                </form>
                <div class="col-md-6">
                  <div class="form-group ">
                    {" "}
                    <form>
                      <input
                        type="text"
                        list="select_quetion"
                        id="form_name"
                        onChange={handleTopicClick}
                        value={inputValue}
                        // onFocus={clear}
                        class="form-control"
                        placeholder="Type to search Subject"
                        required="required"
                        data-error="Firstname is required."
                        placeholder="Search topic here "
                      />
                      <button
                        onClick={() => {
                          setInputValue("");
                          setTopicId("")
                        }}
                        type="reset"
                      >
                        &times;
                      </button>
                    </form>
                    <datalist id="select_quetion">{dropDownDynamic()}</datalist>{" "}
                  </div>
                </div>
              </div>
            </div>
          </nav>
          <div>
            <RenderQuetion
              data={sliceData ? sliceData.result : []}
              handleDeleteClick={(event) => handleDeleteClick(event)}
            />

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
  );
}

export default DisplayQuetions2;
