import axios from "axios";
import type { AxiosResponse } from "axios";
import { baseUrl } from "../ServiceConfig";

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
