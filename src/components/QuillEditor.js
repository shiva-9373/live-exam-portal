import React ,{useState,useEffect} from "react"
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';


function QuillEditor(){
  const [text,setText]=useState("")
  const [richTextEnable,setRichTextEnable]=useState(false)
  

  function handleChange(e){
    console.log(e)
    setText(e)

  }
  function text1(){
      
    const array=  (<div  dangerouslySetInnerHTML={{__html:text}}  >
      </div>
    )
    return array
  }
  function handleClick(){
    setRichTextEnable(!richTextEnable)  }

  function textFunction(){
    return(
      <div>
<ReactQuill 
            placeholder="insert text here"
            theme="snow"
            modules={QuillEditor.modules}
            formats={QuillEditor.formats}
            value={text}
            onChange={handleChange}
             />
      </div>
    )
  }

    return(
        <div>
          <button onClick={handleClick}>enable rich text</button>
          <div>
            {richTextEnable ? textFunction():<textarea value={text} onChange={(event)=>{
              setText(event.target.value)
            }} placeholder="write here" />}
          </div>
          { richTextEnable ? text1():text}
        </div>
    )
}

QuillEditor.modules = {
    toolbar: [
      [{ 'font': [] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      [{ 'align': [] }],
      [{ 'color': [] }, { 'background': [] }],
      ['clean']
    ]
};
QuillEditor.formats = [
    'font',
    'size',
    'bold', 'italic', 'underline',
    'list', 'bullet',
    'align',
    'color', 'background'
  ];

export default QuillEditor