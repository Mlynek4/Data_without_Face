import axios from "axios";

const backendApi = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 10000,
});


export default backendApi;
