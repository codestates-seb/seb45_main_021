import { useEffect, useRef } from 'react';
import useQueryClear from './useQueryClear';
import { useInfiniteQuery } from 'react-query';
import api from '../hooks/useAxiosInterceptor';

export default function usePostListQuery(options, pageType, getApiUrl) {
  const firstRendering = useRef(true);
  const queryClear = useQueryClear();
  const { searchType } = options;
  const type = pageType === 'search' ? searchType : pageType;
  const fetchPostData = async ({ pageParam = 0 }) => {
    const res = await api.get(getApiUrl(pageParam));
    const { data, pageInfo } = res.data;
    return {
      data,
      currentPage: pageInfo.page,
      totalPage: pageInfo.totalPages,
    };
  };

  const queryResult = useInfiniteQuery(['posts', type, options], fetchPostData, {
    getNextPageParam: (lastPage) => {
      return lastPage.currentPage < lastPage.totalPage ? lastPage.currentPage + 1 : undefined;
    },
  });

  useEffect(() => {
    if (!firstRendering.current) queryClear();
    else firstRendering.current = false;
  }, [options, pageType, searchType]);

  return queryResult;
}
