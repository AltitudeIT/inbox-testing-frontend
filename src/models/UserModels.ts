export interface UserProfileApiResponse {
  first_name: string;
  last_name: string;
  email: string;
  klaviyo_integration: string;
}

export interface KlaviyoRequest {
  apiKey: string;
}
