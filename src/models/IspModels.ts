export interface ISP {
  name: string;
  display: boolean;
}

export interface ISPApiResponse {
  results: ISP[];
}
