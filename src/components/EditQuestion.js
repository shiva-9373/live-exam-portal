import React, { useState, useEffect } from "react";
import http from "../services/http_common";
import { v4 as uuid } from "uuid";
import { useParams, useLocation,Link } from "react-router-dom";



function EditQuestion() {
    let { id } = useParams();
    const [rawQuestion,setrawQuestion]=useState()
    const [question, setQuestion] = useState()
    const [loading, setLoading] = useState(true);
    const [isValid,setIsValid]=useState(false)
console.log(id)
    useEffect(() => {
        async function fetchdata() {
          setLoading(true);
          const request1 = await http.get(`questions/${id}`);
          setrawQuestion(request1.data);
          console.log("hello")
          setLoading(false);
        }
        fetchdata();
      }, []);

    useEffect(()=>{
      const dummy= rawQuestion ? { 
        diffLevel: rawQuestion.diffLevel,
options: rawQuestion.options,
questionText: rawQuestion.questionText,
rightMarks:rawQuestion.rightMarks ,
subject: rawQuestion.subject._id,
topic: rawQuestion.topic._id,
type: rawQuestion.type,
wrongMarks: rawQuestion.wrongMarks}:""
setQuestion(dummy)
},[rawQuestion])
  const [subjectData, setSubjectData] = useState();
  const [subjectID, setSubjectId] = useState("");
  const [topicData, setTopicData] = useState();
  const typeArray = ["MULTIPLE CHOICE", "MULTIPLE RESPONSE", "FILL IN BLANKS"];
  const difficultyArray = ["Easy", "Medium", "Hard"];
  const [isSubmit, setIsSubmit] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  /* ----------------------------- Question Object------------------------------------ */
  const [subjectDisplay, setSubjectDisplay] = useState({
    subject: rawQuestion ? rawQuestion.subject.name:"",
    topic: question ? rawQuestion.topic.name:"",
  });
console.log(rawQuestion)
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
  async function putData() {
    setLoading(true);
    const request1 = await http.put(`questions/${id}`, { ...question });
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
  console.log(formErrors)

  const handleSubmit = (e) => {
    setFormErrors(validate(question));
    setIsSubmit(true);
    if(formErrors.decision &&   !formErrors.flag ){
     
    setIsValid(true)
    }else{
      setIsValid(false)

    }
    console.log(isValid)

    if(isValid){
      putData()
    }else{
      console.log("filllllll")
    }

  };

  /* ----------------------------- Form validation ------------------------------------ */
  const validate = (values) => {
    console.log("hello from validation  ")
    const errors = {};
    errors.decision=true
    const count=0
    let array=[]
    errors.flag=false
   
    if (!question.subject) {
      errors.subject = "subject is required!";
      errors.decision=false

    } else {
      errors.subject = "";
    }
    if (!question.topic) {
      errors.topic = "topic is required!";
      errors.decision=false

    } else {
      errors.topic = "";
    }
    if (!question.questionText) {
      errors.questionText = "question is required";
      errors.decision=false

    } else {
      errors.questionText = "";
    }
    if (!question.diffLevel) {
      errors.diffLevel = "Difficulty level is required";
      errors.decision=false

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
      errors.decision=false

    } else {
      errors.rightMarks = "";
    }

    if ( question.wrongMarks!==0 && !question.wrongMarks ) {
      errors.wrongMarks = "Wrong marks  is required";
      errors.decision=false

    } else {
      errors.wrongMarks = "";
    }
    question.options.map((prev, index) => {
      if (!prev.option) {
        array.push( "option required");
        errors.decision=false

      } else {
        array.push( "");
      }
      if(prev.isCorrect){
          errors.correct=true

      }
      console.log(prev.option)
      for(let a=index+1;a<question.options.length;a++){
      if( prev.option===question.options[a].option){
        errors.flag=true
      }}
    });

errors.option=array
if(errors.decision &&   !errors.flag ){
     
  setIsValid(true)
  }else{
    setIsValid(false)

  }
console.log(isValid)
    return errors;
  };
console.log(isValid)
  useEffect(() => {
     question && setFormErrors(validate(question));
  }, [question, isSubmit]);

  /* ----------------------------- Subject DataList------------------------------------ */

  function subjectDynamic() {
    if (subjectData) {
      const array = subjectData.result.map((prev) => {
        return <option id={prev._id} value={prev.name} />;
      });
      return array;
    }
    return <div></div>;
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

  function handleRadioClick(event) {
    let array = { ...question.options[event.target.id] };
    array.isCorrect = event.target.checked;
    let array1 = [...question.options];
    array1[event.target.id] = array;
    setQuestion({ ...question, options: array1 });
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

  /* ----------------------------- render option ------------------------------------ */

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
        <span style={{ color: "red" }}>
                              {isSubmit ? formErrors.option[index1] : ""}{" "}
                            </span>

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
                              value={ rawQuestion   && rawQuestion.subject.name}
                              onChange={handleSubjectClick}
                              class="form-control"
                              placeholder="Type to search Subject"
                              required="required"
                              data-error="Firstname is required."
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
                        <div className="form-group ">
                          {" "}
                          <form className="form2">
                            <label for="form_name">Select Topic</label>{" "}
                            <input
                              type="text"
                              list="select_topic"
                              id="form_name"
                              onChange={handleTopicClick}
                              value={rawQuestion? rawQuestion.topic ? rawQuestion.topic.name:"":""}
                              // onFocus={clear}
                              className="form-control"
                              placeholder="Type to search Subject"
                              required="required"
                              data-error="Firstname is required."
                              placeholder="Search topic here "
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
                              value=  {question && question.type}
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
                              value= { question && question.diffLevel}
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
                              value={ question &&  question.rightMarks}
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
                              value={ question && question.wrongMarks}
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
                            /><span style={{ color: "red" }}>
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
                          <textarea
                            id="form_message"
                            name="message"
                            value={ question && question.questionText
                            }
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
                          <span style={{ color: "red" }}>
                            {isSubmit ? formErrors.questionText : ""}{" "}
                          </span>
                          <br/>
                          <label for="basic-addon1 ">Options</label>{" "}
                          <div>
                            { question? question.options.map((prev) => {
                              const index = question.options.indexOf(prev);
                              return optionDisplay(index);
                            }):""}
                          </div>
                        </div>
                      </div>
                      <div className="row " style={{ textAlign: "left" }}>
                        <div className="col-md-10">
                          {" "}
                          <button
                            className="btn btn-outline-success btn-lg "
                            type="submit"
                            onClick={handleSubmit}
                          >
                           <Link  to={{pathname:`/`, state:"hello" }}  > Submit</Link>
                          </button>
                          <button
                            className="btn btn-outline-secondary btn-lg "
                            style={{ marginLeft: "20px" }}
                            type="cancel"
                          >
                            Cancel
                          </button>
                          <span style={{ color: "red" }}>
                            {(isSubmit &&  formErrors.decision )   ?    !formErrors.correct && "Please provide correct option":""}
                            {(isSubmit  )   ?    formErrors.flag && "Duplicate options are not allowed.Please select correct answer from options":""}{" "}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <button
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

export default EditQuestion;
