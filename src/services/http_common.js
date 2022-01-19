import axios from "axios";
const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWRlNTgyY2U2ZDdkNzdjOGU0ZmEzMWEiLCJfYWN0aXZlT3JnIjoiNjE5Y2U0YThlNTg2ODUxNDYxMGM4ZGE3IiwiaWF0IjoxNjQyNTY2NTQ1LCJleHAiOjE2NDI2MDk3NDV9.Jm3GcDjAQpaLS4TkGRiovjC2005HgNhX6716cTOa_RI";

export default axios.create({
  baseURL: "http://admin.liveexamcenter.in/api/",
  headers: {
    Authorization: `${token}`
  }
});