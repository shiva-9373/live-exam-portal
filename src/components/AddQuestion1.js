import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import http from "../services/http_common";
import OptionRender from "./OptionRender";
import { v4 as uuid } from "uuid";

function AddQuetion() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [subjectData, setSubjectData] = useState();
  const [subjectID, setSubjectId] = useState("");
  const [topicData, setTopicData] = useState();
  const typeArray = ["MULTIPLE CHOICE", "MULTIPLE RESPONSE", "FILL IN BLANKS"];
  const difficultyArray = ["Easy", "Medium", "Hard"];
  const [postConfirm, setPostConfirm] = useState();
  const[errors,setErrors]=useState({subject:""})

  // const [options, setOptions] = useState(
  //   Array(array.length).fill({ _id: "", option: "", isCorrect: false })
  // );
  // let demo = Array(array.length).fill({
  //   _id: "",
  //   option: "",
  //   isCorrect: false,
  // });

  /* ----------------------------- Question Object------------------------------------ */
  const [arrayOption, setArrayoptions] = useState([1, 2]);

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
        option: "",
        isCorrect: false,
        richTextEditor: false,
      },
      {
        option: "",
        isCorrect: false,
        option: "",
        isCorrect: false,
        richTextEditor: false,
      },
      {
        option: "",
        isCorrect: false,
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
  console.log({ ...question });
  /* ----------------------------- post request------------------------------------ */
  async function sendData() {
    setLoading(true);
    const request1 = await http.post(`questions`, { ...question });
    setPostConfirm(request1.data_id);
  }
  console.log(postConfirm);
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
  
  // useEffect(()=>{
  //   handleValidation()
  // },[question])
    /* ----------------------------- Form validation ------------------------------------ */
   function handleValidation() {
      let fields = question;
      let formIsValid = true;
  
      //Name
      if (!question.subject) {
        formIsValid = false;
         setErrors({...errors,subject:"Cannot be empty"})
      }
     
      if (!fields.topic) {
        formIsValid = false;
        errors.subject = "Cannot be empty";
      }

      if (!fields.questionText) {
        formIsValid = false;
        errors.subject = "Cannot be empty";
      }

      setErrors(errors)
      
    return formIsValid
  
      // if (typeof fields["name"] !== "undefined") {
      //   if (!fields["name"].match(/^[a-zA-Z]+$/)) {
      //     formIsValid = false;
      //     errors["name"] = "Only letters";
      //   }
      // }
  
      //Email
      // if (!fields["email"]) {
      //   formIsValid = false;
      //   errors["email"] = "Cannot be empty";
      // }
  
      // if (typeof fields["email"] !== "undefined") {
      //   let lastAtPos = fields["email"].lastIndexOf("@");
      //   let lastDotPos = fields["email"].lastIndexOf(".");
  
      //   if (
      //     !(
      //       lastAtPos < lastDotPos &&
      //       lastAtPos > 0 &&
      //       fields["email"].indexOf("@@") == -1 &&
      //       lastDotPos > 2 &&
      //       fields["email"].length - lastDotPos > 2
      //     )
      //   ) {
      //     formIsValid = false;
      //     errors["email"] = "Email is not valid";
      //   }
      }

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
    setQuestion({ ...question, subject: event.target.value });

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
    console.log(subjectData);
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

  /* ----------------------------- To Render Options ------------------------------------ */
  // function optionRender() {
  //   let count = 0;
  //   let optionId = { _id: "", option: "", isCorrect: false };
  //   let final=[]

  //   const renderOptionArray = array.map((prev) => {
  //     // setOptionObject({...optionObject,_id:count})
  //     optionId._id = count;
  //     final.push(optionId)
  //     return (
  //       <div class="input-group mb-3">
  //         <span class="input-group-text" id="basic-addon1">
  //           <input
  //             name="option"
  //             id={count}
  //             key={count}
  //             type={
  //               question.type === "MULTIPLE RESPONSE" ? "checkbox" : "radio"
  //             }
  //           />
  //           &nbsp;
  //           <label for="optionRender"> option {count}</label>
  //         </span>
  //         <textarea
  //           required="required"
  //           data-error="Please, leave us a message."
  //           type="text"
  //           id=""
  //           value={prev.option}
  //           onChange={() => {}}
  //           className="form-control"
  //           placeholder="Username"
  //           aria-label="Username"
  //           aria-describedby="basic-addon1"
  //         />
  //       </div>
  //     );
  //   })

  //   return(renderOptionArray);
  // }
  //   setQuestion({...question,options:optionArray})
  /* ----------------------------- render option ------------------------------------ */

  function handleChange(event) {
    console.log(event.target.name);
    console.log(event.target.value);

    let array = { ...question.options[event.target.name] };
    console.log(array);
    array.option = event.target.value;
    console.log(array);
    let array1 = [...question.options];
    array1[event.target.name] = array;
    setQuestion({ ...question, options: array1 });
    console.log(question);
    // setOptions((prev) =>
    //   [...prev
    //   (prev[event.target.name] = {
    //     _id: event.target.id,
    //     option: event.target.value,
    //     isCorrect: false,
    //   })],
    // );
  }

  console.log(question);

  function handleRadioClick(event) {
  
    console.log(event.target.checked);
    let array = { ...question.options[event.target.id] };
    console.log("HELLO by");
    array.isCorrect = event.target.checked;
    console.log(array);
    let array1 = [...question.options];
    array1[event.target.id] = array;
    console.log(array1[event.target.id]);
    setQuestion({ ...question, options: array1 });
    console.log(question.options);

    // let array = {...question.options[event.target.id]}
    // console.log(array)
    // array.isCorrect = Boolean(event.target.value);
    // console.log(array);
    // let array1=[...question.options]
    // array1[event.target.id]=array
    // setQuestion({...question,options:array1})
    console.log(question);
  }
  console.log(question.options);

  function handleCheckboxClick(event) {
    let array = { ...question.options[event.target.name] };
    console.log(array);
    array.isCorrect = event.target.checked;
    console.log(array);
    let array1 = [...question.options];
    array1[event.target.name] = array;
    setQuestion({ ...question, options: array1 });
    console.log(question);
  }

  /* ----------------------------- Try ------------------------------------ */

  // function optionDisplay() {
  //   let count = 0;
  //   return array.map((prev) => {
  //     const index = array.indexOf(prev);
  //     console.log(index);
  //     const unique_id = uuid();
  //     const small_id = unique_id.slice(0, 8);

  //     return (
  //       <div class="input-group mb-3">
  //         <span class="input-group-text" id="basic-addon1">
  //           {question.type === "MULTIPLE RESPONSE" ? (
  //             <input
  //               type="checkbox"
  //               id={`${small_id}${index}`}
  //               name={index}
  //               checked={options[index].isCorrect}
  //               onChange={(event) => {
  //                 handleCheckboxClick(event);
  //               }}
  //             />
  //           ) : (
  //             <input
  //               name={index}
  //               id={`${small_id}${index}`}
  //               // name="option"
  //               key={`${index}`}
  //               value={options[index].isCorrect}
  //               type="radio"
  //               onClick={(event) => {
  //                 handleRadioClick(event);
  //               }}
  //             />
  //           )}
  //           &nbsp;
  //           <label for="optionRender"> option {++count}</label>
  //         </span>
  //         <textarea
  //           name={index}
  //           id={`${small_id}${index + 1}`}
  //           required="required"
  //           data-error="Please, leave us a message."
  //           type="text"
  //           value={options[index].option}
  //           onChange={(event) => {
  //             handleChange(event);
  //           }}
  //           className="form-control"
  //         />
  //       </div>
  //     );
  //   });
  // }

  /* ----------------------------- Try2 ------------------------------------ */

  function deleteOption(index) {
    console.log(index);

    let array1 = [...question.options];
    array1.splice(index, 1);
    setQuestion({ ...question, options: array1 });
  }

  function optionDisplay(index1) {
    const unique_id = uuid();
    const small_id = unique_id.slice(0, 8);

    return (
      <div class="input-group mb-3">
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
              // id={`${small_id}`}
              name={`option`}
              // key={`${index}`}
              // checked={question.options[index1].isCorrect}

              defaultChecked={question.options[index1].isCorrect}
              type="radio"
              onClick={(event) => {
                handleRadioClick(event);
              }}
            />
          )}
          &nbsp;
          <label for="optionRender"> option{index1+1} </label>
        </span>
        <textarea
          name={index1}
          id={`${small_id}`}
          required="required"
          data-error="Please, leave us a message."
          type="text"
          value={question.options[index1].option}
          onChange={(event) => {
            handleChange(event);
          }}
          className="form-control"
        />
        <button
          id={index1}
          onClick={() => {
            deleteOption(index1);
          }}
        >
          delete Option
        </button>
      </div>
    );
  }
  console.log(arrayOption);

  /* ----------------------------- Html ------------------------------------ */

  return (
    <div className="container text-left">
      {" "}
      <div className=" text-left mt-5 ">
        <h1>Edit Question</h1>
      </div>
      <div className="row  " style={{ textAlign: "left" }}>
        <div className="col-lg-10 mx-auto">
          <div className="card mt-2 mx-auto p-4 bg-light">
            <div className="card-body bg-light">
              <div className="container">
                <div id="contact-form" role="form">
                  <div className="controls">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group ">
                          {" "}
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
                              data-error="Firstname is required."
                              placeholder="Search topic here "
                            />
                         <span style={{ color: "red" }}>{errors.subject} </span>

                            <button
                              onClick={() => {
                                setQuestion({
                                  ...question,
                                  subject: "",
                                  topic: "",
                                });
                                setSubjectDisplay({ subject: "", topic: "" });
                                setSubjectDisplay({
                                  ...subjectDisplay,
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
                      <div className="col-md-6">
                        <div className="form-group ">
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
                              required="required"
                              data-error="Firstname is required."
                              placeholder="Search topic here "
                            />
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
                            />{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row " style={{ textAlign: "left" }}>
                      <div className="col-md-12">
                        <div className="form-group">
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
                            className="form-control"
                            placeholder="Write your Question here."
                            rows="2"
                            required="required"
                            data-error="Please, leave us a message."
                          ></textarea>{" "}
                          <label for="basic-addon1 ">Options</label>{" "}
                          {/* /* {array.map((prev) => {
                               const index=array.indexOf(prev)

                            return(
                            <OptionRender
                              question={question}
                              options={options}
                              index={index}
                              handleChange={(event) => {
                                handleChange(event);
                              }}
                              handleRadioClick={(event) => {
                                handleRadioClick(event);
                              }}
                              handleCheckboxClick={(event) => {
                                handleCheckboxClick(event);
                              }}
                            />);
                          })} */}
                          <div>
                            {question.options.map((prev) => {
                              const index = question.options.indexOf(prev);
                              return optionDisplay(index);
                            })}
                          </div>
                        </div>
                      </div>
                      <div className="row " style={{ textAlign: "left" }}>
                        <div className="col-md-10">
                          {" "}
                          <button
                            className="btn btn-outline-success btn-lg "
                            type="submit"
                            onClick={() => {
                              // sendData();  
                              if(handleValidation()) {
                                console.log(errors);
                              } else {
                                console.log(errors);
                              }
                            }}
                          >
                            Submit
                          </button>
                          <button
                            className="btn btn-outline-secondary btn-lg "
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
                <button
                  onClick={() => {
                    let count = question.options.length;

                    let array = {
                      option: "",
                      isCorrect: false,
                      richTextEditor: false,
                    };

                    let array1 = [...question.options];
                    array1.push(array);
                    setQuestion({ ...question, options: array1 });
                  }}
                  className="btn btn-outline-white  btn-lg "
                >
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
