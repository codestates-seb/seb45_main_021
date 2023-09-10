import { useQueryClient } from 'react-query';

export default function useQueryClear() {
  const queryClient = useQueryClient();
  const queryClear = () => {
    console.log('query초기화');
    queryClient.removeQueries('posts');
  };

  return queryClear;
}
