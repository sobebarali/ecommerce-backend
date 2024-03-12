export type typePayload = {
  email: string;
  password: string;
};

export type typeResultData = {
  status: number;
  code: string;
  message: string;
  token: string;
};

export type typeResultError = {
  status: number;
  code: string;
  message: string;
};

export type typeResult = {
  data: null | typeResultData;
  error: null | typeResultError;
  meta?: null | Object;
};
