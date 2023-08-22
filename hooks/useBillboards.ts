import useSWR from 'swr';

import fetcher from '@/lib/fetcher';

export default function useBillboard() {
  const { data, error, isLoading } = useSWR('/api/random', fetcher);

  return { data, error, isLoading };
}
