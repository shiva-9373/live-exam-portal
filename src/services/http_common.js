import axios from "axios";
const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWRlNTgyY2U2ZDdkNzdjOGU0ZmEzMWEiLCJfYWN0aXZlT3JnIjoiNjE5Y2U0YThlNTg2ODUxNDYxMGM4ZGE3IiwiaWF0IjoxNjQzNjAyMzUzLCJleHAiOjE2NDM2NDU1NTN9.M4OOBAktKJetUCop1quTNQ9v8JYSlJ9yIo5kXQeRovU";

export default axios.create({
  baseURL: "http://admin.liveexamcenter.in/api/",
  headers: {
    Authorization: `${token}`
  }
});