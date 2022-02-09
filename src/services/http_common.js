import axios from "axios";
import Cookies from 'js-cookie'

let token = Cookies.get('_token');


export default axios.create({
  baseURL: "http://admin.liveexamcenter.in/api/",
  headers: {
    Authorization: `${token}`
  }
});