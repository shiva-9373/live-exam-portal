import axios from "axios";
const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWRlNTgyY2U2ZDdkNzdjOGU0ZmEzMWEiLCJfYWN0aXZlT3JnIjoiNjE5Y2U0YThlNTg2ODUxNDYxMGM4ZGE3IiwiaWF0IjoxNjQyMzEzOTA2LCJleHAiOjE2NDIzNTcxMDZ9.LeSUkdTyLOVxe-h9eM6rC5E5tlOyC-gCDdoKHwYBSsI";

export default axios.create({
  baseURL: "http://admin.liveexamcenter.in/api/",
  headers: {
    Authorization: `${token}`
  }
});