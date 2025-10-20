import axios, { type AxiosResponse } from "axios";
import { baseUrl } from "../ServiceConfig";
import type {
  Domain,
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
  endDate?: Date | null,
  domains?: string[]
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

  if (domains && domains.length > 0) {
    params.append("domains", domains.join(","));
  }

  return await axios.get(`${url}/all?${params.toString()}`);
};

export const GetTestDetails = async (
  testId: string
): Promise<AxiosResponse<InboxTestDetailsApiResponse>> => {
  return await axios.get(`${url}/${testId}`);
};

export const GetAllDomains = async (): Promise<
  AxiosResponse<{ result: Domain[] }>
> => {
  return await axios.get(`${url}/domains`);
};

export const GetDashboardTests = async (): Promise<
  AxiosResponse<InboxTestingApiResponse>
> => {
  return await axios.get(`${url}/dashboard-tests`);
};

export const GetDashboardRevenue = async (): Promise<
  AxiosResponse<EmailRevenueResponse>
> => {
  return await axios.get(`${url}/dashboard-revenue`);
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
