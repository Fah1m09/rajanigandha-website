import { showLoader } from "../app/features/Loader/loaderSlice";

const createReqOptions = (method, data) => {
  const requestOptions = {
    method: method,
    body: null,
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  };
  switch (method) {
    case "POST":
    case "PUT":
      requestOptions.body = JSON.stringify(data);
      break;
    default:
    // code block
  }
  return requestOptions;
};

const handleApiResponse = async <T>(thunkApi, response) => {
  const resData = await response.json();
  if (!response.ok) {
    const apierror: string = response.status.toString();
    return thunkApi.rejectWithValue(apierror);
  }
  return resData as T;
};

export const callAPI = async <T>(url, data, method, thunkApi) => {
  const requestOptions = createReqOptions(method, data);
  try {
    thunkApi.dispatch(showLoader(true));
    const response = await fetch(url, requestOptions);
    const handledRes = await handleApiResponse<T>(thunkApi, response);
    return handledRes;
  } catch (error) {
    throw thunkApi.rejectWithValue(error.message);
  } finally {
    thunkApi.dispatch(showLoader(false));
  }
};
