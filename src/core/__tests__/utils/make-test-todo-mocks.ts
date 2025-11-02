import { InvalidTodo, ValidTodo } from '@/core/todo/schemas/todo.contract';
import { revalidatePath } from 'next/cache';
import * as deleteTodoUseCaseModule from '@/core/todo/usecases/delete-todo.usecase';
import * as createTodoUseCaseModule from '@/core/todo/usecases/create-todo.usecase';

export const makeTestTodoMocks = () => {
  const successResult = {
    success: true,
    todo: {
      id: 'id',
      description: 'description',
      createdAt: 'createdAt',
    },
  } as ValidTodo;

  const errorResult = {
    success: false,
    errors: ['any', 'error'],
  } as InvalidTodo;

  const deleteTodoUseCaseSpy = vi
    .spyOn(deleteTodoUseCaseModule, 'deleteTodoUseCase')
    .mockResolvedValue(successResult);

  const createTodoUseCaseSpy = vi
    .spyOn(createTodoUseCaseModule, 'createTodoUseCase')
    .mockResolvedValue(successResult);
  const revalidatePathMocked = vi.mocked(revalidatePath);

  return {
    successResult,
    errorResult,
    deleteTodoUseCaseSpy,
    revalidatePathMocked,
    createTodoUseCaseSpy,
  };
};
