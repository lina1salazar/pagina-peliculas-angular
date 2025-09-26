export interface ApiResponse<T> {
  data: T;
  message : string;
  error?: string;
  page?: number;
  per_page?: number;
  total_pages?: number;
  total_items?: number;
}