import { baseUrl } from "./env";
import axios from "axios";

export default async (url = "", data = {}, type = "GET") => {
  type = type.toUpperCase();
  url = baseUrl + url;

  if (type == "GET") {
    let dataStr = ""; //数据拼接字符串
    Object.keys(data).forEach((key) => {
      dataStr += key + "=" + data[key] + "&";
    });

    if (dataStr !== "") {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf("&"));
      url = url + "?" + dataStr;
    }
    axios({
      method: "get",
      url: url,
    })
      .then((response) => {
        //这里使用了ES6的语法
        const responseJson = response.data;
        console.log(responseJson); //请求成功返回的数据
        return responseJson;
      })
      .catch(
        (error) => console.log(error) //请求失败返回的数据
      );
  } else {
    axios({
      method: "post",
      url: url,
      data: data,
    })
      .then((response) => {
        //这里使用了ES6的语法
        const responseJson = response.data;
        console.log(responseJson); //请求成功返回的数据
        return responseJson;
      })
      .catch(
        (error) => console.log(error) //请求失败返回的数据
      );
  }
};
