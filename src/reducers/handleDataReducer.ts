import handleReducer from "./handleReducer";

export interface BaseData<T> {
  data: T;
}

export interface DataState<T> extends BaseData<T> {
  loading: boolean;
  loaded: boolean;
  error: boolean;
}

const initialState: DataState<any> = {
  data: null,
  loading: false,
  loaded: false,
  error: false
};

export default function handelDataReducer<TMODEL, Meta = any>(
  typeName: string
) {
  return handleReducer<DataState<TMODEL>, TMODEL, Meta>(
    typeName,
    initialState,
    {
      pending: state => ({
        ...state,
        loading: true,
        error: false,
        loaded: false
      }),
      fulfilled: (state, { payload }) => ({
        ...state,
        data: payload,
        loading: false,
        error: false,
        loaded: true
      }),
      rejected: state => ({
        ...state,
        loading: false,
        error: true,
        loaded: false
      })
    }
  );
}
