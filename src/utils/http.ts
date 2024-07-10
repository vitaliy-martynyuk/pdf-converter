import axiosUtil from "axios";

import { envConfig } from "../configs";

export const http = axiosUtil.create({
  //TODO: baseURL: envConfig.APP_PUBLIC_URL,
  baseURL: "http://95.217.134.12:4010",
  headers: {
    "Content-Type": "application/json",
  },
});
