import { IGenericErrorMessage } from './error';

export interface IGenericErrorResponse {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
}
export interface IGenericResponse<T> {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
}
