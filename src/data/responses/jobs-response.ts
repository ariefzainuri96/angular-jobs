export type JobsResponse = {
  status: number;
  message: string;
  data: JobItem[];
};

export type JobItem = {
  _id?: string;
  title?: string;
  type?: string;
  description?: string;
  location?: string;
  salary?: string;
  company?: Company;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
};

export type Company = {
  name?: string;
  description?: string;
  contactEmail?: string;
  contactPhone?: string;
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
