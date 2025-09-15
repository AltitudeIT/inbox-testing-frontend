import axios, { type AxiosResponse } from "axios";
import { baseUrl } from "../ServiceConfig";
import type {
  InboxTestDetailsApiResponse,
  InboxTestingApiResponse,
} from "../../models/InboxTestingModels";

const url = `${baseUrl}/inbox-testing`;

export const GetAllTests = async (
  page: number,
  limit: number,
  search?: string
): Promise<AxiosResponse<InboxTestingApiResponse>> => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (search) {
    params.append("search", search);
  }

  return await axios.get(`${url}/all?${params.toString()}`);
};

export const GetTestDetails = async (
  testId: string
): Promise<AxiosResponse<InboxTestDetailsApiResponse>> => {
  return await axios.get(`${url}/${testId}`);
};
