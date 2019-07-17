import handleReducer from "./handleReducer";

export interface PageState<TMODLE> {
  dataSource: TMODLE[];
  isRefreshing: boolean;
  loading: boolean;
  loadMore: boolean;
  hasMore: boolean;
  error: boolean;
}

export interface PageMeta {
  loading: boolean;
  isRefreshing: boolean;
  loadMore: boolean;
}

export interface PageEntity<TMODLE> {
  hasMore: boolean;
  list: TMODLE[];
  totalCount: number;
}

export function pageAction<TMODLE>(
  typeName: string,
  api: (param: any) => Promise<PageEntity<TMODLE>>,
  paramCallback: (param: any) => any
) {
  return (
    loading: boolean,
    isRefreshing: boolean,
    loadMore: boolean,
    param: any
  ) => ({
    type: typeName,
    payload: paramCallback ? api(paramCallback(param)) : api(param),
    meta: {
      loading,
      isRefreshing,
      loadMore
    }
  });
}

const initialState: PageState<any> = {
  dataSource: [],
  isRefreshing: false,
  loading: false,
  loadMore: false,
  hasMore: false,
  error: false
};

export function pageReducer<TMODEL>(typeName: string) {
  return handleReducer<PageState<TMODEL>, PageEntity<TMODEL>, PageMeta>(
    typeName,
    initialState,
    {
      pending: (state, { meta }) => ({
        ...state,
        ...meta
      }),
      fulfilled: (state, { payload }) => ({
        ...state,
        isRefreshing: false,
        loading: false,
        loadMore: false,
        error: false,
        hasMore: payload.hasMore,
        dataSource: state.loadMore
          ? state.dataSource.concat(payload.list)
          : payload.list
      }),
      rejected: state => ({
        ...state,
        isRefreshing: false,
        loading: false,
        loadMore: false,
        hasMore: false,
        error: true
      })
    }
  );
}
