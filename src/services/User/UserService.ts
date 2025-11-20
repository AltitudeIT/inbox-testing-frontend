import axios from "axios";
import type { AxiosResponse } from "axios";
import { baseUrl } from "../ServiceConfig";
import type {
  IntegrationResponse,
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

export const GetIntegrations = async (): Promise<
  AxiosResponse<IntegrationResponse[]>
> => {
  return await axios.get(`${url}/integrations`);
};

export const UpdateIntegrationStatus = async (
  id: number,
  status: boolean
): Promise<AxiosResponse> => {
  return await axios.put(`${url}/integrations/${id}`, { status });
};

export const RemoveIntegration = async (id: number): Promise<AxiosResponse> => {
  return await axios.delete(`${url}/integrations/${id}`);
};
