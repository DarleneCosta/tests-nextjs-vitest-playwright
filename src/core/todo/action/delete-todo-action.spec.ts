import { deleteTodoAction } from './delete-todo.action';
import { makeTestTodoMocks } from '@/core/__tests__/utils/make-test-todo-mocks';

vi.mock('next/cache', () => {
  return {
    revalidatePath: vi.fn(),
  };
});

describe('deleteTodoAction (unit)', () => {
  it('should call deleteTodoUseCase with correct values', async () => {
    const { deleteTodoUseCaseSpy } = makeTestTodoMocks();
    const expectedParamCall = 'Usecase should be called with this';
    await deleteTodoAction(expectedParamCall);

    expect(deleteTodoUseCaseSpy).toHaveBeenCalledExactlyOnceWith(
      expectedParamCall,
    );
  });

  it('should return the same value from usecase on success', async () => {
    const { successResult } = makeTestTodoMocks();
    const id = 'Usecase should be called with this';
    const result = await deleteTodoAction(id);

    expect(result).toStrictEqual(successResult);
  });

  it('should call revalidatePath if usecase returns success', async () => {
    const { revalidatePathMocked } = makeTestTodoMocks();
    const id = 'Usecase should be called with this';
    await deleteTodoAction(id);

    expect(revalidatePathMocked).toHaveBeenCalledExactlyOnceWith('/');
  });
  
});
