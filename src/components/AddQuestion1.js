import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import http from "../services/http_common";
import { type } from "@testing-library/user-event/dist/type";

function AddQuetion() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [subjectData, setSubjectData] = useState();
  const [subjectID, setSubjectId] = useState("");
  const [topicData, setTopicData] = useState();
  const typeArray = ["MULTIPLE CHOICE", "MULTIPLE RESPONSE", "FILL IN BLANKS"];
  const difficultyArray = ["Easy", "Medium", "Hard"];
  let optionArray = [];

  const [optionObject, setOptionObject] = useState({
    _id: "",
    option: "",
    isCorrect: false,
  });

  const array = [1, 2, 3, 4];

  /* ----------------------------- Question Object------------------------------------ */

  const [question, setQuestion] = useState({
    diffLevel: "Hard",
    options: [],
    questionText: "",
    rightMarks: 1,
    subject: "",
    topic: "",
    type: "MULTIPLE RESPONSE",
    wrongMarks: 0,
  });

  /* ----------------------------- To fetch Subject API ------------------------------------ */

  useEffect(() => {
    async function fetchdata() {
      setLoading(true);
      const request1 = await http.get(`subjects?term=`);
      setSubjectData(request1.data);
      setLoading(false);
    }
    fetchdata();
  }, [subjectID]);
  console.log(subjectData);

  /* ----------------------------- To fetch Topic API------------------------------------ */

  useEffect(() => {
    async function fetchdata() {
      setLoading(true);
      const request1 = await http.get(`topics/subject/${subjectID}`);
      setTopicData(request1.data);
      setLoading(false);
    }
    fetchdata();
  }, [subjectID]);

  /* ----------------------------- Subject DataList------------------------------------ */

  function subjectDynamic() {
    if (subjectData) {
      const array = subjectData.result.map((prev) => {
        return <option id={prev._id} value={prev.name} />;
      });
      return array;
    }
    return (
      <div>
        <option value="Web Designing" />
        <option value="Web Development" />
        <option value="IOS App Development" />
        <option value="Wordpress Site" />
        <option value="" />
      </div>
    );
  }
  /* ----------------------------- Topic DataList------------------------------------ */

  function topicDynamic() {
    if (topicData) {
      const array = topicData.map((prev) => {
        return <option id={prev._id} value={prev.name} />;
      });
      return array;
    }
    return (
      <div>
        <option value="" />
      </div>
    );
  }
  /* ----------------------------- To Change subject------------------------------------ */

  const handleSubjectClick = (event) => {
    if (!event.nativeEvent.inputType) {
      event.target.blur();
    }
    setQuestion({ ...question, subject:event.target.name });

    for (let i = 0; i < subjectData.result.length; i++) {
      console.log("hello");

      if (event.target.value == subjectData.result[i].name) {
        console.log("hello");
        setQuestion({ ...question, subject: subjectData.result[i].name });

        setSubjectId(subjectData.result[i]._id);
        // console.log("topic id  " + topic.result[i]._id);
      }
    }
  };

  /* ----------------------------- To Change Topic------------------------------------ */

  const handleTopicClick = (event) => {
    if (!event.nativeEvent.inputType) {
      event.target.blur();
    }
    console.log("hello");
    for (let i = 0; i < topicData.length; i++) {
      if (event.target.value == topicData[i].name) {
        console.log("hello1");

        setQuestion({ ...question, topic: topicData[i].name });
        // console.log("topic id  " + topic.result[i]._id);
      }
    }
  };

  /* ----------------------------- To Change Type------------------------------------ */

  const handleTypeClick = (event) => {
    console.log(event.target.value);
    for (let i = 0; i < typeArray.length; i++) {
      if (event.target.value == typeArray[i]) {
        console.log("hello1");

        setQuestion({ ...question, type: typeArray[i] });
        // console.log("topic id  " + topic.result[i]._id);
      }
    }
  };

  /* ----------------------------- To Change Difficulty------------------------------------ */

  const handleDiffClick = (event) => {
    console.log(event.target.value);
    for (let i = 0; i < difficultyArray.length; i++) {
      if (event.target.value == difficultyArray[i]) {
        console.log("hello1");

        setQuestion({ ...question, diffLevel: difficultyArray[i] });
        // console.log("topic id  " + topic.result[i]._id);
      }
    }
  };

  /* ----------------------------- To Render Options ------------------------------------ */
  function optionRender() {
    let count = 0;
    let optionId = { _id: "", option: "", isCorrect: false };
    let final=[]

    const renderOptionArray = array.map((prev) => {
      // setOptionObject({...optionObject,_id:count})
      optionId._id = count;
      optionArray.push(optionId)

      return (
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">
            <input
              name="option"
              id={count}
              key={count}
              type={
                question.type === "MULTIPLE RESPONSE" ? "checkbox" : "radio"
              }
            />
            &nbsp;
            <label for="optionRender"> option {count}</label>
          </span>
          <textarea
            required="required"
            data-error="Please, leave us a message."
            type="text"
            id=""
            value={prev.option}
            onChange={() => {}}
            class="form-control"
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>
      );
    })
    return(renderOptionArray);
  }
//   setQuestion({...question,options:optionArray})

  /* ----------------------------- Html ------------------------------------ */
  console.log(optionArray);
  return (
    <div class="container text-left">
      {" "}
      <div class=" text-left mt-5 ">
        <h1>Edit Question</h1>
      </div>
      <div class="row  " style={{ textAlign: "left" }}>
        <div class="col-lg-10 mx-auto">
          <div class="card mt-2 mx-auto p-4 bg-light">
            <div class="card-body bg-light">
              <div class="container">
                <div id="contact-form" role="form">
                  <div class="controls">
                    <div className="row">
                      <div class="col-md-6">
                        <div class="form-group ">
                          {" "}
                          <form className="form2">
                            <label for="form_name">Select Subject</label>{" "}
                            <input
                              type="text"
                              list="select_question1"
                              id="form_name"
                              value={question.subject}
                              onChange={handleSubjectClick}
                              class="form-control"
                              placeholder="Type to search Subject"
                              required="required"
                              data-error="Firstname is required."
                              placeholder="Search topic here "
                            />
                            <button
                              onClick={() => {
                                setQuestion({
                                  ...question,
                                  subject: "",
                                  topic: "",
                                });
                                setSubjectId("");
                              }}
                              type="reset"
                            >
                              &times;
                            </button>
                          </form>
                          <datalist id="select_question1">
                            {subjectDynamic()}
                          </datalist>{" "}
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group ">
                          {" "}
                          <form className="form2">
                            <label for="form_name">Select Topic</label>{" "}
                            <input
                              value={data && data.topic.name}
                              type="text"
                              list="select_topic"
                              id="form_name"
                              onChange={handleTopicClick}
                              value={question.topic}
                              // onFocus={clear}
                              class="form-control"
                              placeholder="Type to search Subject"
                              required="required"
                              data-error="Firstname is required."
                              placeholder="Search topic here "
                            />
                            <button
                              onClick={() => {
                                setQuestion({ ...question, topic: "" });
                              }}
                              type="reset"
                            >
                              &times;
                            </button>
                          </form>
                          <datalist id="select_topic">
                            {topicDynamic()}
                          </datalist>{" "}
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          {" "}
                          <form className="form2">
                            <label for="form_name">Select Question type</label>{" "}
                            <input
                              type="text"
                              list="question_type"
                              id="form_name"
                              onChange={handleTypeClick}
                              value={question.type}
                              // onFocus={clear}
                              class="form-control"
                              placeholder="Type to search Subject"
                              required="required"
                              data-error="Firstname is required."
                              placeholder="Search topic here "
                            />
                            <button
                              onClick={() => {
                                setQuestion({ ...question, type: "" });
                              }}
                              type="reset"
                            >
                              &times;
                            </button>
                          </form>
                          <datalist id="question_type">
                            <option value="MULTIPLE CHOICE" />
                            <option value="MULTIPLE RESPONSE" />
                            <option value="FILL IN BLANKS" />
                          </datalist>{" "}
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          {" "}
                          <form className="form2">
                            <label for="form_name">
                              Select Difficulty Level
                            </label>{" "}
                            <input
                              type="text"
                              list="diff_type"
                              id="form_name"
                              onChange={handleDiffClick}
                              value={question.diffLevel}
                              // onFocus={clear}
                              class="form-control"
                              placeholder="Type to search Subject"
                              required="required"
                              data-error="Firstname is required."
                              placeholder="Search topic here "
                            />
                            <button
                              onClick={() => {
                                setQuestion({ ...question, diffLevel: "" });
                              }}
                              type="reset"
                            >
                              &times;
                            </button>
                          </form>
                          <datalist id="diff_type">
                            <option value="Easy" />
                            <option value="Medium" />
                            <option value="Hard" />
                          </datalist>{" "}
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group">
                            {" "}
                            <label for="form_name">Right Marks</label>{" "}
                            <input
                              id="form_name"
                              type="number"
                              value={question.rightMarks}
                              onChange={(event) => {
                                setQuestion({
                                  ...question,
                                  rightMarks: event.target.value,
                                });
                              }}
                              class="form-control"
                              placeholder="Please enter Wrong Marks"
                              required="required"
                              data-error="Firstname is required."
                            />{" "}
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            {" "}
                            <label for="form_lastname">Wrong Marks</label>{" "}
                            <input
                              id="form_lastname"
                              value={question.wrongMarks}
                              type="number"
                              onChange={(event) => {
                                setQuestion({
                                  ...question,
                                  wrongMarks: event.target.value,
                                });
                              }}
                              // name="surname"
                              class="form-control"
                              placeholder="Please enter Right Marks "
                              required="required"
                              data-error="Lastname is required."
                            />{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row " style={{ textAlign: "left" }}>
                      <div class="col-md-12">
                        <div class="form-group">
                          {" "}
                          <label for="form_message ">Question</label>{" "}
                          <textarea
                            id="form_message"
                            name="message"
                            onChange={(event) => {
                              setQuestion({
                                ...question,
                                questionText: event.target.value,
                              });
                            }}
                            class="form-control"
                            placeholder="Write your Question here."
                            rows="2"
                            required="required"
                            data-error="Please, leave us a message."
                          ></textarea>{" "}
                          <label for="basic-addon1 ">Options</label>{" "}
                          {optionRender()}
                        </div>
                      </div>
                      <div class="row " style={{ textAlign: "left" }}>
                        <div class="col-md-10">
                          {" "}
                          <button
                            class="btn btn-outline-success btn-lg "
                            type="submit"
                          >
                            Submit
                          </button>
                          <button
                            class="btn btn-outline-secondary btn-lg "
                            style={{ marginLeft: "20px" }}
                            type="cancel"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <button class="btn btn-outline-white  btn-lg ">
                  + Add Option
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddQuetion;
