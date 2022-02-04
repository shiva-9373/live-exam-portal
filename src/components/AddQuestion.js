import React, { useState, useEffect } from "react";
import http from "../services/http_common";
import { v4 as uuid } from "uuid";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./Navbar";




import { Link } from "react-router-dom";

function AddQuestion() {
  const [loading, setLoading] = useState(true);
  const [subjectData, setSubjectData] = useState();
  const [subjectID, setSubjectId] = useState("");
  const [topicData, setTopicData] = useState();
  const typeArray = ["MULTIPLE CHOICE", "MULTIPLE RESPONSE", "FILL IN BLANKS"];
  const difficultyArray = ["Easy", "Medium", "Hard"];
  const [isSubmit, setIsSubmit] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const [formErrors, setFormErrors] = useState({});
  /* ----------------------------- Question Object------------------------------------ */
  const [question, setQuestion] = useState({
    diffLevel: "Hard",
    options: [
      {
        option: "",
        isCorrect: false,
        richTextEditor: false,
      },
      {
        option: "",
        isCorrect: false,
        richTextEditor: false,
      },
      {
        option: "",
        isCorrect: false,
        richTextEditor: false,
      },
      {
        option: "",
        isCorrect: false,
        richTextEditor: false,
      },
    ],

    questionText: "",
    rightMarks: 1,
    subject: "",
    topic: "",
    type: "MULTIPLE RESPONSE",
    wrongMarks: 0,
  });
  const [subjectDisplay, setSubjectDisplay] = useState({
    subject: "",
    topic: "",
    richTextEnable: false,
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
  /* ----------------------------- post request------------------------------------ */
  async function sendData() {
    setLoading(true);
    const request1 = await http.post(`questions`, { ...question });
  }
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
  /* ----------------------------- Handle Sub,it button Click ------------------------------------ */

  const handleSubmit = (e) => {
    setFormErrors(validate(question));
    setIsSubmit(true);
    if (formErrors.decision && !formErrors.flag && !formErrors.flag1) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
    if (isValid) {
      sendData();
      setIsSubmit(false);
      toast.success("Question Added SuccessFully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    }); 
    
    
      setQuestion({
        diffLevel: "Hard",
        options: [
          {
            option: "",
            isCorrect: false,
            richTextEditor: false,
          },
          {
            option: "",
            isCorrect: false,
            richTextEditor: false,
          },
          {
            option: "",
            isCorrect: false,
            richTextEditor: false,
          },
          {
            option: "",
            isCorrect: false,
            richTextEditor: false,
          },
        ],

        questionText: "",
        rightMarks: 1,
        subject: "",
        topic: "",
        type: "MULTIPLE RESPONSE",
        wrongMarks: 0,
      });
      setSubjectDisplay({
        subject: "",
        topic: "",
      });
    }
  };

  console.log(formErrors)

  /* ----------------------------- Form validation ------------------------------------ */
  const validate = (values) => {
    const errors = {};
    errors.decision = true;
    errors.flag = false;
    errors.flag1 = false;

    let array = [];

    if (!values.subject) {
      errors.subject = "subject is required!";
      errors.decision = false;
    } else {
      errors.subject = "";
    }
    if (!question.topic) {
      errors.topic = "topic is required!";
      errors.decision = false;
    } else {
      errors.topic = "";
    }
    if (!question.questionText) {
      errors.questionText = "question is required";
      errors.decision = false;
    } else {
      errors.questionText = "";
    }
    if (!question.diffLevel) {
      errors.diffLevel = "Difficulty level is required";
      errors.decision = false;
    } else {
      errors.diffLevel = "";
    }
    // if (!question.type) {
    //   errors.type = "Type level is required";
    //   errors.decision=false

    // } else {
    //   errors.type = "";
    // }
    if (!question.rightMarks) {
      errors.rightMarks = "Right Marks level is required";
      errors.decision = false;
    } else {
      errors.rightMarks = "";
    }

    if (question.wrongMarks !== 0 && !question.wrongMarks) {
      errors.wrongMarks = "Wrong marks  is required";
      errors.decision = false;
    } else {
      errors.wrongMarks = "";
    }
    question.options.map((prev, index) => {
      if (!prev.option) {
        array.push("option required");
        errors.decision = false;
      } else {
        array.push("");
      }
      if (prev.isCorrect) {
        errors.correct = true;
        // formErrors.decision=false
      }

      if(prev.isCorrect){
        errors.flag=true
      }else{
        errors.flag=false

      }

      for (let a = index + 1; a < question.options.length; a++) {
        if (prev.option === question.options[a].option) {
          errors.flag1 = true;
        }
      }
    });

    errors.option = array;
    if (errors.decision && !errors.flag) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
    return errors;
  };
  console.log(formErrors)

  useEffect(() => {
    setFormErrors(validate(question));
  }, [question, isSubmit]);

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
    setQuestion({ ...question, subject: event.target.value });
    setSubjectDisplay({
      ...subjectDisplay,
      subject: event.target.value,
    });

    for (let i = 0; i < subjectData.result.length; i++) {
      if (event.target.value == subjectData.result[i].name) {
        setQuestion({ ...question, subject: subjectData.result[i]._id });
        setSubjectDisplay({
          ...subjectDisplay,
          subject: subjectData.result[i].name,
        });

        setSubjectId(subjectData.result[i]._id);
      }
    }
  };

  /* ----------------------------- To Change Topic------------------------------------ */

  const handleTopicClick = (event) => {
    setQuestion({ ...question, topic: event.target.value });

    setSubjectDisplay({
      ...subjectDisplay,
      topic: event.target.value,
    });

    for (let i = 0; i < topicData.length; i++) {
      if (event.target.value == topicData[i].name) {
        setQuestion({ ...question, topic: topicData[i]._id });
        setSubjectDisplay({ ...subjectDisplay, topic: topicData[i].name });
      }
    }
  };

  /* ----------------------------- To Change Type------------------------------------ */

  const handleTypeClick = (event) => {
    setQuestion({ ...question, type: event.target.value });

    for (let i = 0; i < typeArray.length; i++) {
      if (event.target.value == typeArray[i]) {
        setQuestion({ ...question, type: typeArray[i] });
      }
    }
  };

  /* ----------------------------- To Change Difficulty------------------------------------ */

  const handleDiffClick = (event) => {
    setQuestion({ ...question, diffLevel: event.target.value });

    for (let i = 0; i < difficultyArray.length; i++) {
      if (event.target.value == difficultyArray[i]) {
        setQuestion({ ...question, diffLevel: difficultyArray[i] });
      }
    }
  };

  function handleChange(event) {
    let array = { ...question.options[event.target.name] };
    array.option = event.target.value;
    let array1 = [...question.options];
    array1[event.target.name] = array;
    setQuestion({ ...question, options: array1 });
  }

  function handleQuillChange(event, index1) {
    let array = { ...question.options[index1] };
    array.option = event;
    array.richTextEditor = true;
    let array1 = [...question.options];
    array1[index1] = array;
    setQuestion({ ...question, options: array1 });
  }
  console.log(question);
  function handleRadioClick(event) {
    let array1 = [...question.options];

    for (let a = 0; a < question.options.length; a++) {
      if (a == event.target.id) {
        let array = array1[a];
        array.isCorrect = true;
        array1[a] = array;
        // setQuestion({ ...question, options: array1 });

        console.log("true case");
        console.log(array1);
      } else {
        let array = array1[a];
        array.isCorrect = false;
        array1[a] = array;
        console.log("false case");
        console.log(array1);
      }
    }
    console.log(array1);
    setQuestion({ ...question, options: array1 });

    // let array = { ...question.options[event.target.id] };
    // array.isCorrect = event.target.checked;
    // let array1 = [...question.options];
    // array1[event.target.id] = array;
    // setQuestion({ ...question, options: array1 });
  }
  function handleCheckboxClick(event) {
    let array = { ...question.options[event.target.name] };
    array.isCorrect = event.target.checked;
    let array1 = [...question.options];
    array1[event.target.name] = array;
    setQuestion({ ...question, options: array1 });
  }

  /* ----------------------------- deleteOption ------------------------------------ */

  function deleteOption(index) {
    let array1 = [...question.options];
    array1.splice(index, 1);
    setQuestion({ ...question, options: array1 });
  }

  /* ----------------------------- question rich text editor ------------------------------------ */
  function handleRichText() {
    setSubjectDisplay({
      ...subjectDisplay,
      richTextEnable: !subjectDisplay.richTextEnable,
    });
    console.log(subjectDisplay);
  }
  /* ----------------------------- options rich text editor ------------------------------------ */

  function handleOptionRichText(event) {
    console.log("hello");
    console.log(event.target.id);
    let array = { ...question.options[event.target.id] };
    console.log(array.richTextEditor);
    array.richTextEditor = !array.richTextEditor;
    let array1 = [...question.options];
    array1[event.target.id] = array;
    setQuestion({ ...question, options: array1 });
  }
  /* ----------------------------- render option ------------------------------------ */
  console.log(question.options);
  function optionDisplay(index1) {
    const unique_id = uuid();
    const small_id = unique_id.slice(0, 8);

    return (
      <div>
        <div class="input-group option  mt-2">
          <span class="input-group-text" id="basic-addon1">
            {question.type === "MULTIPLE RESPONSE" ? (
              <input
                type="checkbox"
                id={`${small_id}`}
                name={index1}
                checked={question.options[index1].isCorrect}
                onChange={(event) => {
                  handleCheckboxClick(event);
                }}
              />
            ) : (
              <input
                id={index1}
                name={`option`}
                defaultChecked={question.options[index1].isCorrect}
                type="radio"
                onClick={(event) => {
                  handleRadioClick(event);
                }}
              />
            )}
            &nbsp;
            <label for="optionRender"> option{index1 + 1} </label>
          </span>
          <div>
            {question.options[index1].richTextEditor ? (
              <ReactQuill
                id={index1}
                placeholder="insert text here"
                theme="snow"
                modules={AddQuestion.modules}
                formats={AddQuestion.formats}
                value={question.options[index1].option}
                onChange={(event) => {
                  handleQuillChange(event, index1);
                }}
              />
            ) : (
              <textarea
                name={index1}
                id={`${small_id}`}
                className=" form-control optionTextArea"
                type="text"
                value={question.options[index1].option}
                onChange={(event) => {
                  handleChange(event);
                }}
                // className="form-control"
              />
            )}
          </div>
        </div>
        &nbsp;
        <span id={index1} onClick={handleOptionRichText}>
          {question.options[index1].richTextEditor ? "disable" : "enable"} rich
          text editor |
        </span>{" "}
        &nbsp;
        <span style={{ color: "red" }}>
          {isSubmit ? formErrors.option[index1] : ""}{" "}
        </span>
        <span
          id={index1}
          onClick={() => {
            deleteOption(index1);
          }}
        >
          delete Option
        </span>
        &nbsp;
      </div>
    );
  }

  /* ----------------------------- Html ------------------------------------ */

  return (
    <div>
              <Navbar/>
    <div className="container text-left">

      {" "}
      <div className=" text-left mt-5 ">
        <h1>Add Question</h1>
      </div>
      <div className="row  " style={{ textAlign: "left" }}>
        <div className="col-lg-10 mx-auto">
          <div className="card mt-2 mx-auto  bg-light">
            <div className="card-body bg-light">
              <div className="container">
                <div id="contact-form" role="form">
                  <div className="controls">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group  ">
                          <form className="form2">
                            <label for="form_name">Select Subject</label>{" "}
                            <input
                              type="text"
                              list="select_question1"
                              id="form_name"
                              value={subjectDisplay.subject}
                              onChange={handleSubjectClick}
                              class="form-control"
                              placeholder="Type to search Subject"
                              required="required"
                            />
                            <span style={{ color: "red" }}>
                              {isSubmit ? formErrors.subject : ""}{" "}
                            </span>
                            <button
                              type="reset"
                              onClick={() => {
                                setQuestion({
                                  ...question,
                                  subject: "",
                                  topic: "",
                                });
                                setSubjectDisplay({ subject: "", topic: "" });
                                setSubjectId("");
                              }}
                            >
                              &times;
                            </button>
                          </form>
                          <datalist id="select_question1">
                            {subjectDynamic()}
                          </datalist>{" "}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          {" "}
                          <form className="form2">
                            <label for="form_name">Select Topic</label>{" "}
                            <input
                              type="text"
                              list="select_topic"
                              id="form_name"
                              onChange={handleTopicClick}
                              value={subjectDisplay.topic}
                              // onFocus={clear}
                              className="form-control"
                              placeholder="Type to search Subject"
                            />
                            {/* <span style={{ color: "red" }}>
                              {isSubmit ? formErrors.subject : ""}{" "}
                            </span>{" "} */}
                            <button
                              onClick={() => {
                                setQuestion({ ...question, topic: "" });
                                setSubjectDisplay({
                                  ...subjectDisplay,
                                  topic: "",
                                });
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
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
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
                              className="form-control"
                              placeholder="Type to search Subject"
                              required="required"
                              data-error="Firstname is required."
                              placeholder="Search topic here "
                            />
                            <span style={{ color: "red" }}>
                              {isSubmit ? formErrors.type : ""}{" "}
                            </span>{" "}
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
                      <div className="col-md-6">
                        <div className="form-group">
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
                              className="form-control"
                              placeholder="Type to search Subject"
                              required="required"
                              data-error="Firstname is required."
                              placeholder="Search topic here "
                            />
                            <span style={{ color: "red" }}>
                              {isSubmit ? formErrors.type : ""}{" "}
                            </span>{" "}
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
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
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
                              className="form-control"
                              placeholder="Please enter Wrong Marks"
                              required="required"
                              data-error="Firstname is required."
                            />{" "}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            {" "}
                            <label for="wrongMarks">Wrong Marks</label>{" "}
                            <input
                              id="wrongMarks"
                              value={question.wrongMarks}
                              type="number"
                              onChange={(event) => {
                                setQuestion({
                                  ...question,
                                  wrongMarks: event.target.value,
                                });
                              }}
                              // name="surname"
                              className="form-control"
                              placeholder="Please enter Right Marks "
                              required="required"
                              data-error="Lastname is required."
                            />
                            <span style={{ color: "red" }}>
                              {isSubmit ? formErrors.wrongMarks : ""}{" "}
                            </span>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row " style={{ textAlign: "left" }}>
                      <div className="col-md-12">
                        <div className="form-group">
                          {" "}
                          <label for="form_message ">Question</label>{" "}
                          {subjectDisplay.richTextEnable ? (
                            <ReactQuill
                              placeholder="insert text here"
                              theme="snow"
                              modules={AddQuestion.modules}
                              formats={AddQuestion.formats}
                              value={question.questionText}
                              onChange={(event) => {
                                setQuestion({
                                  ...question,
                                  questionText: event,
                                });
                              }}
                            />
                          ) : (
                            <textarea
                              id="form_message"
                              value={question.questionText}
                              name="message"
                              onChange={(event) => {
                                setQuestion({
                                  ...question,
                                  questionText: event.target.value,
                                });
                              }}
                              className="form-control"
                              placeholder="Write your Question here."
                              rows="2"
                              required="required"
                              data-error="Please, leave us a message."
                            ></textarea>
                          )}{" "}
                          <span style={{ color: "red" }}>
                            {isSubmit ? formErrors.questionText : ""}{" "}
                          </span>
                          <span onClick={handleRichText}>
                            {" "}
                            {subjectDisplay.richTextEnable
                              ? "disable"
                              : "enable"}{" "}
                            rich text editor
                          </span>
                          <br />
                          <label for="basic-addon1 ">Options</label>{" "}
                          <div>
                            {question.options.map((prev) => {
                              const index = question.options.indexOf(prev);
                              return optionDisplay(index);
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="row " style={{ textAlign: "left" }}>
                        <button
                          style={{ textAlign: "left" }}
                          onClick={() => {
                            let array = {
                              option: "",
                              isCorrect: false,
                              richTextEditor: false,
                            };
                            let array1 = [...question.options];
                            array1.push(array);
                            setQuestion({ ...question, options: array1 });
                          }}
                          className="btn text-primary  btn-lg  tb-3"
                        >
                          + Add Option
                        </button>
                        <div className="col-md-10">
                          {" "}
                          <button
                            className="btn btn-outline-success btn-lg "
                            type="submit"
                            onClick={handleSubmit}
                          >
                            Submit
                          </button>
                          <Link
                            to={{ pathname: `/` }}
                            className="btn addButton btn-primary"
                          >
                            Cancel
                          </Link>
                          <span style={{ color: "red" }}>
                            {isSubmit && formErrors.decision
                              ? !formErrors.flag &&
                                "Please provide correct option"
                              : ""}
                            {isSubmit
                              ? formErrors.flag1 &&
                                "Duplicate options are not allowed.Please select correct answer from options"
                              : ""}{" "}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    <ToastContainer/>
    </div>
  );
}

AddQuestion.modules = {
  toolbar: [
    [{ font: [] }],
    [{ size: ["small", false, "large", "huge"] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    ["clean"],
  ],
};
AddQuestion.formats = [
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "list",
  "bullet",
  "align",
  "color",
  "background",
];

export default AddQuestion;
