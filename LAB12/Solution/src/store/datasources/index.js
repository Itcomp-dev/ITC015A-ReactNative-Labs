import ENV from "../../../environment";
import axios from "axios";

export const HttpClient = axios.create({ baseURL: ENV.baseUrl }); 

