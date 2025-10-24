export interface UserProfileApiResponse {
  first_name: string;
  last_name: string;
  email: string;
  glockapps_integration: string;
  klaviyo_integration: string;
}

export interface GlockAppsRequest {
  apiKey: string;
  projectId: number;
}

export interface KlaviyoRequest {
  apiKey: string;
}
