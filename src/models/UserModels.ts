export interface UserProfileApiResponse {
  first_name: string;
  last_name: string;
  email: string;
  klaviyo_integration: string;
}

export interface KlaviyoRequest {
  apiKey: string;
}

export interface IntegrationResponse {
  id: number;
  name: string;
  klaviyo_status: boolean;
  klaviyo_api_key: string;
}
