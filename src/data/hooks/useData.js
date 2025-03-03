import {LocalStorage} from '../services/LocalStorage';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {TodoItem} from '../entity/TodoItem'

export const useData = () => {
  const {data, isLoading} = useQuery({
    queryKey: ['todo'],
    queryFn: LocalStorage.getTodoItemsFromLocalStorage,
  });

  return {
    data,
    isLoading,
  };
}

export const useSaveNewTodoItem = () => {
  const client = useQueryClient();

  const {mutate, isPending, isSuccess} = useMutation({
    mutationFn: ({title, priority}) => {
      const newTodoItem = new TodoItem(new Date().getTime(), title, false, priority);
      return LocalStorage.saveTodoItemToLocalStorage(newTodoItem)
    },
    onSuccess: () => {
      client.invalidateQueries(['todo']);
    },
  });

  return {
    mutate,
    isPending,
    isSuccess
  }
}

export const useDeleteTodoItem = () => {
  const client = useQueryClient();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: ({ id }) => {
      console.log("Deleting", id)
      return LocalStorage.deleteTodoItemToLocalStorage(id);
    },
    onSuccess: () => {
      console.log("Deleted");
      client.invalidateQueries(['todo']);
    },
  });

  return {
    mutate,
    isPending,
    isSuccess,
  };
};

export const useUpdateTodoItem = () => {
  const client = useQueryClient();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: ({ id, checked, priority }) => {
      return LocalStorage.updateTodoItemInLocalStorage(id, checked, priority);   
    },
    onSuccess: () => {
      client.invalidateQueries(['todo']);
    },
  });

  return {
    mutate,
    isPending,
    isSuccess
  };
};
