import axios from "axios";
import { Auth } from "@aws-amplify/auth";

const LOCAL = false;
const LocalAPI = "http://localhost:3000/dev";
const CelesteAPI = "https://nqs1n5073k.execute-api.us-west-2.amazonaws.com/dev";
//const CelesteAPI = "https://o2mgp28e70.execute-api.us-west-2.amazonaws.com/dev";//"https://1wmzzcg1ng.execute-api.us-east-1.amazonaws.com/dev/v1";

const getCelesteAPI = async () => {
  const token = (await Auth.currentSession()).getIdToken().getJwtToken();
  console.info(token); // DEBUG_VAL: AUTH TOKEN FOR POSTMAN
  const api = axios.create({
    baseURL: CelesteAPI,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
  return api;
};

export default getCelesteAPI;
