import axios from "axios";
const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWRlNTgyY2U2ZDdkNzdjOGU0ZmEzMWEiLCJfYWN0aXZlT3JnIjoiNjE5Y2U0YThlNTg2ODUxNDYxMGM4ZGE3IiwiaWF0IjoxNjQyMzkyNDQ4LCJleHAiOjE2NDI0MzU2NDh9.K7LdpBUOKDC5tbU-K76LC6yEgoQSuAwWWZ6tNjH61kc";

export default axios.create({
  baseURL: "http://admin.liveexamcenter.in/api/",
  headers: {
    Authorization: `${token}`
  }
});