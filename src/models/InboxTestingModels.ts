export interface InboxTestingResponse {
  test_id: string;
  subject: string;
  created: string;
  domain: string;
  inbox: number;
  spam: number;
  blocked: number;
}

export interface Pagination {
  total: number;
  currentPage: number;
  perPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface InboxTestingApiResponse {
  results: InboxTestingResponse[];
  pagination: Pagination;
}
