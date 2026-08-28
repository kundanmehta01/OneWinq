import { Response } from 'express';

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: any[];
}

export interface PaginatedApiResponse<T = any> {
  success: boolean;
  message: string;
  data: {
    items: T[];
    pagination: PaginationMeta;
  };
}

export const sendSuccess = <T>(
  res: Response,
  data?: T,
  message = 'Success',
  statusCode = 200
): Response => {
  const response: ApiResponse<T> = {
    success: true,
    message,
    ...(data !== undefined && { data }),
  };
  return res.status(statusCode).json(response);
};

export const sendCreated = <T>(
  res: Response,
  data?: T,
  message = 'Resource created successfully'
): Response => {
  return sendSuccess(res, data, message, 201);
};

export const sendPaginated = <T>(
  res: Response,
  items: T[],
  pagination: PaginationMeta,
  message = 'Data retrieved successfully'
): Response => {
  const response: PaginatedApiResponse<T> = {
    success: true,
    message,
    data: {
      items,
      pagination,
    },
  };
  return res.status(200).json(response);
};
