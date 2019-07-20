import axios from "axios";
import { Platform } from "react-native";
import { CommomListParams, UserData } from "../interface";
import { PageEntity } from "../reducers/handlePageReducer";

const client = axios.create({
  baseURL: "http://192.168.0.100:8080/",
  timeout: 20000,
  headers: {
    "APP-ID": Platform.OS === "android" ? "2" : "1",
    "APP-VERSION": "0.0.1",
    "APP-MODEL": "react-native"
  }
});

client.interceptors.request.use(config => {
  console.log("[axios] ---Request send---");
  console.log("[axios] method: " + config.method);
  console.log("[axios] url: " + config.url);
  console.log("[axios] params: " + config.params);
  console.log("[axios] (end)");
  return config;
});

client.interceptors.response.use(
  response => {
    console.log("[axios] ---Response received---");
    console.log("[axios] response:");
    console.log(response.data);
    console.log("[axios] (end)");

    if (response.data.code === 0) {
      return response.data.data;
    }
    const msg = response.data.msg || "连接服务器出错";
    return Promise.reject(msg);
  },
  error => {
    console.log("[axios] ---Response error---");
    console.log("[axios] code: " + error.response.status);
    console.log("[axios] url: " + error.response.request.url);
    console.log("[axios] (end)");
    return Promise.reject(error);
  }
);

export function fetchUserList(
  params: CommomListParams
): Promise<PageEntity<UserData>> {
  return client.post(`/user/list`, params);
}
