import handleReducer from "./handleReducer";

export interface PageState {
  dataSource: any[];
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
  page: number;
}

export const pageAction = (typeName: string, api: any) => (
  loading: boolean,
  isRefreshing: boolean,
  loadMore: boolean,
  page: number,
  ...args: any[]
) => ({
  type: typeName,
  payload: api(page, ...args),
  meta: {
    loading,
    isRefreshing,
    loadMore,
    page
  }
});
