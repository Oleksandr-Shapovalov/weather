import { isAxiosError } from 'axios';
import { ApiError } from './api-error';

export const getErrorMessage = (error: any) => {
  if (isAxiosError(error) && error.response) return (error.response.data as ApiError).message;

  return 'Unexpected error';
};
