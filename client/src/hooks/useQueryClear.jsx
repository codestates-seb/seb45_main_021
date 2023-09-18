import { useQueryClient } from 'react-query';

export default function useQueryClear() {
  const queryClient = useQueryClient();
  const queryClear = () => {
    queryClient.removeQueries('posts');
  };

  return queryClear;
}
