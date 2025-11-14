import axios from "axios";
import type { AxiosResponse } from "axios";
import { baseUrl } from "../ServiceConfig";
import type {
  KlaviyoRequest,
  UserProfileApiResponse,
} from "../../models/UserModels";

const url = `${baseUrl}/profile`;

export const GetCurrentUser = async (): Promise<
  AxiosResponse<UserProfileApiResponse>
> => {
  return await axios.get(`${url}/me`);
};

export const AddKlaviyo = async (
  request: KlaviyoRequest
): Promise<AxiosResponse> => {
  return await axios.post(`${url}/klaviyo`, request);
};

export const DownloadTestGroupCsv = async (): Promise<AxiosResponse<Blob>> => {
  return await axios.get(`${url}/download-csv`, {
    responseType: "blob",
  });
};
