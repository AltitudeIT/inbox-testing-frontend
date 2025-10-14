export interface SubscriberListRespone {
  id: number;
  name: string;
  total_count: number;
  status: string;
  created_at: string;
}

export interface PaginationInfo {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface SubscriberListApiResponse {
  data: SubscriberListRespone[];
  pagination: PaginationInfo;
}

export interface SubscriberListDetails {
  id: number;
  isp_breakdown: ISPBreakdown[];
  total_subscribers: number;
  unique_domains: number;
  pagination?: PaginationInfo;
}

export interface ISPBreakdown {
  isp: string;
  subscribers: number;
  percent_of_list: string;
  domains: number;
}
