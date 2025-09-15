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

export interface PlacementData {
  isp_name: string;
  duration: number;
  inbox_count: number;
  spam_count: number;
  blocked_count: number;
  total_count: number;
  spf_auth: boolean;
  dkim_auth: boolean;
  dmarc_auth: boolean;
}

interface OverallStats {
  inbox: number;
  spam: number;
  blocked: number;
  duration: number;
}

interface TestData {
  test_id: string;
  subject: string;
  created: string;
  from: string;
  overall_stats: OverallStats;
  content: string;
  spam_assassin: number;
  barracuda: number;
  finished: boolean;
}

interface PlacementsByRegion {
  global: PlacementData[];
  europe: PlacementData[];
}

export interface IPRecord {
  id: number;
  ip_address: string;
  reverse_dns: string;
}

export interface InboxTestDetailsResponse {
  test: TestData;
  placements: PlacementsByRegion;
  ip_records: IPRecord[];
}

export interface InboxTestDetailsApiResponse {
  result: InboxTestDetailsResponse;
}
