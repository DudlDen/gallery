import axios from "axios";
import { CLIENT_ID } from "./consts";

export const reqInstance = axios.create({
  headers: {
    Authorization: `Client-ID ${CLIENT_ID}`
  }
});
