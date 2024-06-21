import { JobItem } from './jobs-response';

export interface JobsDetailResponse {
  status: number;
  message: string;
  data: JobItem;
}
