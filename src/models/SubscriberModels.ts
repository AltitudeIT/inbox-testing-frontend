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
