import axios, { type AxiosResponse } from "axios";
import { baseUrl } from "../ServiceConfig";
import type {
  EmailRevenueResponse,
  GeneratePDFRequest,
  InboxTestDetailsApiResponse,
  InboxTestingApiResponse,
} from "../../models/InboxTestingModels";
import type { ISPApiResponse } from "../../models/IspModels";

const url = `${baseUrl}/inbox-testing`;

export const GetAllTests = async (
  page: number,
  limit: number,
  search?: string,
  startDate?: Date | null,
  endDate?: Date | null
): Promise<AxiosResponse<InboxTestingApiResponse>> => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (search) {
    params.append("search", search);
  }

  if (startDate) {
    params.append("startDate", startDate.toISOString());
  }

  if (endDate) {
    params.append("endDate", endDate.toISOString());
  }

  return await axios.get(`${url}/all?${params.toString()}`);
};

export const GetTestDetails = async (
  testId: string
): Promise<AxiosResponse<InboxTestDetailsApiResponse>> => {
  return await axios.get(`${url}/${testId}`);
};

export const GetDashboardTests = async (
  startDate?: Date | null,
  endDate?: Date | null
): Promise<AxiosResponse<InboxTestingApiResponse>> => {
  const params = new URLSearchParams();

  if (startDate) {
    params.append("startDate", startDate.toISOString());
  }

  if (endDate) {
    params.append("endDate", endDate.toISOString());
  }

  const queryString = params.toString();
  return await axios.get(
    `${url}/dashboard-tests${queryString ? `?${queryString}` : ""}`
  );
};

export const GetDashboardRevenue = async (
  startDate?: Date | null,
  endDate?: Date | null
): Promise<AxiosResponse<EmailRevenueResponse>> => {
  const params = new URLSearchParams();

  if (startDate) {
    params.append("startDate", startDate.toISOString());
  }

  if (endDate) {
    params.append("endDate", endDate.toISOString());
  }

  const queryString = params.toString();
  return await axios.get(
    `${url}/dashboard-revenue${queryString ? `?${queryString}` : ""}`
  );
};

export const GetAllISPs = async (): Promise<AxiosResponse<ISPApiResponse>> => {
  return await axios.get(`${url}/isps`);
};

export const UpdateISPDisplay = async (
  ispName: string,
  display: boolean
): Promise<AxiosResponse> => {
  return await axios.put(`${url}/isps/${ispName}`, { display });
};

export const UpdateAllISPs = async (
  display: boolean
): Promise<AxiosResponse> => {
  return await axios.put(`${url}/isps/bulk`, { display });
};

export const GeneratePDF = async (
  data: GeneratePDFRequest
): Promise<AxiosResponse<Blob>> => {
  return await axios.post(`${url}/generate-pdf`, data, {
    responseType: "blob",
  });
};
