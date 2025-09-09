import axios, { type AxiosResponse } from "axios";
import { baseUrl } from "../ServiceConfig";
import type {
  InboxTestDetailsApiResponse,
  InboxTestingApiResponse,
} from "../../models/InboxTestingModels";

const url = `${baseUrl}/inbox-testing`;

export const GetAllTests = async (
  page: number,
  limit: number
): Promise<AxiosResponse<InboxTestingApiResponse>> => {
  return await axios.get(`${url}/all?page=${page}&limit=${limit}`);
};

export const GetTestDetails = async (
  testId: string
): Promise<AxiosResponse<InboxTestDetailsApiResponse>> => {
  return await axios.get(`${url}/${testId}`);
};
