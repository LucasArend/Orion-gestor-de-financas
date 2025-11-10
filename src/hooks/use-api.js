import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { endpoints } from '../services/endpoints';
import { useApiClient } from '../services/orion-api';

export function useFetchData(key, url) {
  const api = useApiClient();

  return useQuery({
    queryKey: [key],
    queryFn: async () => {
      const { data } = await api.get(url);
      return data;
    },
  });
}

export function useApiMutation(method, url, invalidateKey) {
  const api = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body) => {
      const { data } = await api[method](url, body);
      return data;
    },
    onSuccess: () => {
      if (invalidateKey) {
        queryClient.invalidateQueries([invalidateKey]);
      }
    },
  });
}

export function useUsers() {
  return useFetchData('users', endpoints.users.list);
}

export function useUserMe() {
  return useFetchData('userMe', endpoints.users.me);
}

export function useUpdateUserMe() {
  return useApiMutation('put', endpoints.users.updateMe, 'userMe');
}

export function useUpdatePassword() {
  return useApiMutation('put', endpoints.users.updatePassword);
}

export function useTransactionsMe() {
  return useFetchData('transactionsMe', endpoints.transaction.transactionMe);
}

export function useSavings() {
  return useFetchData('emergencyFund', endpoints.savings.reserva);
}

export function useUpdateSavings() {
  return useApiMutation('put', endpoints.savings.reserva, 'emergencyFund');
}

export function useCreateSavings() {
  return useApiMutation('post', endpoints.savings.reserva, 'emergencyFund');
}

export function useIncome() {
  return useFetchData('totalIncome', endpoints.income.saldo);
}

export function useUpdateIncome() {
  return useApiMutation('put', endpoints.income.saldo, 'totalIncome');
}

export function useCreateIncome() {
  return useApiMutation('post', endpoints.income.saldo, 'totalIncome');
}

export function useGoals() {
  return useFetchData('goals', endpoints.goals.list)
}