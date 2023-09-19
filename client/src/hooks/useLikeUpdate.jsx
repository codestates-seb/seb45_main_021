import { useQueryClient } from 'react-query';

export default function useLikeUpdate(options, pageType) {
  const queryClient = useQueryClient();
  const { searchType } = options;
  const likeUpdateSuccess = (postId, updateType) => {
    const type = pageType === 'search' ? searchType : pageType;
    const postIdType = type === 'projects' ? 'projectId' : 'portfolioId';
    queryClient.setQueryData(['posts', pageType, options], (updater) => {
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

  return likeUpdateSuccess;
}
