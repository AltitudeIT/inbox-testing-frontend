import axios from "axios";
import type { AxiosResponse } from "axios";
import type { LoginRequest } from "../../models/AuthModels";
import { baseUrl } from "../ServiceConfig";

const url = `${baseUrl}/auth`;

export const loginUser = async (
  request: LoginRequest
): Promise<AxiosResponse> => {
  return await axios.post(`${url}/login`, request);
};
