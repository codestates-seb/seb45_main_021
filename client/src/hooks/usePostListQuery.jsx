import { useEffect, useRef } from 'react';
import useQueryClear from './useQueryClear';
import { useQueryClient } from 'react-query';
import { useInfiniteQuery } from 'react-query';
import api from '../hooks/useAxiosInterceptor';

export default function usePostListQuery(options, pageType, getApiUrl) {
  const firstRendering = useRef(true);
  const queryClear = useQueryClear();
  const { searchType } = options;
  const queryClient = useQueryClient();

  const fetchPostData = async ({ pageParam = 0 }) => {
    const res = await api.get(getApiUrl(pageParam));
    const { data, pageInfo } = res.data;
    return {
      data,
      currentPage: pageInfo.page,
      totalPage: pageInfo.totalPages,
    };
  };

  const queryResult = useInfiniteQuery(['posts', pageType, options], fetchPostData, {
    getNextPageParam: (lastPage) => {
      return lastPage.currentPage < lastPage.totalPage ? lastPage.currentPage + 1 : undefined;
    },
  });

  useEffect(() => {
    if (!firstRendering.current) queryClear();
    else firstRendering.current = false;
  }, [options, pageType, searchType]);

  const likeUpdateSuccess = (postId, updateType) => {
    const type = pageType === 'search' ? searchType : pageType;
    const postIdType = type === 'projects' ? 'projectId' : 'portfolioId';
    queryClient.setQueryData(['posts', pageType, options], (updater) => {
      console.log(updater);
      if (!updater) return undefined;
      return {
        ...updater,
        pages: updater.pages.map((page) => {
          const newPostData = page.data.map((post) => {
            const updatedHeartCount =
              updateType === 'increase' ? post.heartCount + 1 : post.heartCount - 1;
            return post[postIdType] === postId ? { ...post, heartCount: updatedHeartCount } : post;
          });
          return { ...page, data: newPostData };
        }),
      };
    });
  };

  return { queryResult, likeUpdateSuccess };
}
