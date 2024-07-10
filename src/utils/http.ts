import axiosUtil from "axios";

export const http = axiosUtil.create({
  //TODO: env,
  baseURL: "http://95.217.134.12:4010",
  headers: {
    "Content-Type": "application/json",
  },
});
