import axios from "axios";
import type { AxiosResponse } from "axios";
import { baseUrl } from "../ServiceConfig";
import type {
  SubscriberListApiResponse,
  SubscriberListDetails,
} from "../../models/SubscriberModels";

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

export const CheckSubscriberListStatus = async (
  listId: number
): Promise<AxiosResponse<{ status: string }>> => {
  return await axios.get(`${url}/${listId}/status`);
};

export const GetSubscriberListDetails = async (
  id: number,
  page: number = 1,
  limit: number = 5,
  search: string = ""
): Promise<AxiosResponse<SubscriberListDetails>> => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (search) {
    params.append("search", search);
  }

  return await axios.get(`${url}/${id}?${params.toString()}`);
};

export const DeleteSubscriberList = async (
  id: number
): Promise<AxiosResponse> => {
  return await axios.delete(`${url}/${id}`);
};
