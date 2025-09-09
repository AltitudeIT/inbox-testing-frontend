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

interface AuthData {
  spf: boolean;
  dkim: boolean;
  dmarc: boolean;
}

interface PlacementData {
  account_id: string;
  account_email: string;
  isp_name: string;
  inbox_type: string;
  duration: number;
  auth: AuthData;
  finished: boolean;
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
  finished: boolean;
}

interface PlacementsByRegion {
  global: PlacementData[];
  europe: PlacementData[];
}

interface Summary {
  total_placements: number;
  by_region: {
    global: number;
    europe: number;
  };
}

export interface InboxTestDetailsResponse {
  test: TestData;
  placements: PlacementsByRegion;
  summary: Summary;
}

export interface InboxTestDetailsApiResponse {
  result: InboxTestDetailsResponse;
}
