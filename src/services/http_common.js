import axios from "axios";
let token
if(sessionStorage.getItem("key")){
   token = JSON.parse(sessionStorage.getItem("key"));
}

export default axios.create({
  baseURL: "http://admin.liveexamcenter.in/api/",
  headers: {
    Authorization: `${token}`
  }
});