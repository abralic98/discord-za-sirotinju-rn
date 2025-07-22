import Toast from "react-native-toast-message";

export interface GraphqlCatchError<T = any> {
  response: GraphQLErrorResponse<T>;
}

export interface GraphQLErrorLocation {
  line: number;
  column: number;
}

export interface GraphQLErrorExtensions {
  classification: string;
}

export interface GraphQLErrorItem {
  message: string;
  locations?: GraphQLErrorLocation[];
  path?: (string | number)[];
  extensions?: GraphQLErrorExtensions;
}

export interface GraphQLErrorResponse<T = any> {
  errors: GraphQLErrorItem[];
  data?: T | null;
}

export enum ErrorMessages {
  INTERNAL_ERROR = "INTERNAL_ERROR",
  NOT_FOUND = "not found",
  ACCESS_DENIED = "Access denied",
}

export const handleGraphqlError = (error: Error | null) => {
  const err = error as unknown as GraphqlCatchError;
  err &&
    Toast.show({
      type: "error",
      text1: err.response.errors[0].message,
    });
};
