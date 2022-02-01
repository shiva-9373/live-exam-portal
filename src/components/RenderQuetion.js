import React from "react";
import { Link } from "react-router-dom";


function RenderQuetion(props) {
  let EditQueID


  const handleEditClick=(event)=>{
    EditQueID=event.target.id
    console.log(EditQueID)
  }
  function display() {
    const array = props.data.map((prev1) => {
      return (
        <div className="singleQuestion">
          <div>
            <input id="hello" type="checkbox" />&nbsp;
            <label for="hello"  dangerouslySetInnerHTML={{__html:prev1.questionText}} ></label>
            {prev1.options.map((prev) => {
              const optionIndex = prev1.options.indexOf(prev);
              return (
                <div className="optionGroup">
                  <input
                    id={prev.option}
                    type={
                      prev1.type === "MULTIPLE CHOICE" ? "radio" : "checkbox"
                    }
                    checked={prev.isCorrect === true ? true : false}
                    readOnly
                  />&nbsp;
                  <label for={prev.option}  dangerouslySetInnerHTML={{__html:prev.option}} ></label>
                </div>
              );
            })}
            <button
              class="btn btn-white btn-sm rounded-1"
              type="button"
              data-toggle="tooltip"
              id={prev1._id}
              onClick={handleEditClick}

              data-placement="top"
              title="Edit"
            >{<img src="https://img.icons8.com/material-rounded/14/000000/edit--v1.png"/>  }
            <Link to={{pathname:`/editquestion/${prev1._id}`, state:"hello" }}   >edit</Link>  
            </button>
            <button
              class="btn btn-white btn-sm rounded-1 ml-1"
              type="button"
              data-toggle="tooltip"
              data-placement="top"
              title="Delete"
              onClick={(event)=>props.handleDeleteClick(event)}
              id={prev1._id}
            >{<img src="https://img.icons8.com/carbon-copy/16/000000/filled-trash.png"/>  }
              delete
            </button>
          </div>
          <hr />
        </div>
      );
    });

    return array;
  }

  return <div>{display()}</div>;
}

export default RenderQuetion;
