import React, {useState}from "react"

function OptionRender(props){
    // const [options,setOptions]=useState(Array(props.array.length).fill({ _id: "", option: "", isCorrect: false }))

    function optionRender() {
        let count = 0;
        
       
        
    console.log(props.index)
        return(
            <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">
            
           { props.question.type === "MULTIPLE RESPONSE"? ( 
                <input
                name="option"
                id={count}
                key={`${props.index}`}
                nam={
                  props.question.type === "MULTIPLE RESPONSE" ? "checkbox" : "radio"
                }
                type= "checkbox" 
                checked={props.options[props.index].isCorrect}

                onChange={(event)=>{props.handleCheckboxClick(event)}}

              />) :(  <input
                name="option"
                id={count}
                key={`${props.index}`}
                value={props.options[props.index].isCorrect}
                type= "radio"
                
                onClick={(event)=>{props.handleRadioClick(event)}}

              />)}
              &nbsp;
              <label for="optionRender"> option {++count}</label>
            </span>
            <textarea
              required="required"
              data-error="Please, leave us a message."
              type="text"
              id={props.index}
              value={props.options[props.index].option}
              onChange={(event)=>{props.handleChange(event)}}
              className="form-control"
              
            />
          </div>
        );
      }
    
    return(
        <div>
    {optionRender()}
        </div>
    )
}

export default OptionRender