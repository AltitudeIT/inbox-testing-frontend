import axios from "axios";
import type { AxiosResponse } from "axios";
import { baseUrl } from "../ServiceConfig";
import type { SubscriberListApiResponse } from "../../models/SubscriberModels";

const url = `${baseUrl}/subscriber-list`;

export const uploadSubscriberList = async (
  formData: FormData
): Promise<AxiosResponse> => {
  return await axios.post(`${url}/upload-list`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const GetSubscriberList = async (
  page: number,
  limit: number
): Promise<AxiosResponse<SubscriberListApiResponse>> => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  return await axios.get(`${url}?${params.toString()}`);
};

export const checkSubscriberListStatus = async (
  listId: number
): Promise<AxiosResponse<{ status: string }>> => {
  return await axios.get(`${url}/${listId}/status`);
};
