import axios from "axios";
import type { AxiosResponse } from "axios";
import { baseUrl } from "../ServiceConfig";
import type {
  GlockAppsRequest,
  KlaviyoRequest,
  UserProfileApiResponse,
} from "../../models/UserModels";

const url = `${baseUrl}/profile`;

export const GetCurrentUser = async (): Promise<
  AxiosResponse<UserProfileApiResponse>
> => {
  return await axios.get(`${url}/me`);
};

export const AddGlockApps = async (
  request: GlockAppsRequest
): Promise<AxiosResponse> => {
  return await axios.post(`${url}/glockapps`, request);
};

export const AddKlaviyo = async (
  request: KlaviyoRequest
): Promise<AxiosResponse> => {
  return await axios.post(`${url}/klaviyo`, request);
};
