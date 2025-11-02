import { createTodoAction } from './create-todo.action';
import { makeTestTodoMocks } from '@/core/__tests__/utils/make-test-todo-mocks';

vi.mock('next/cache', () => {
  return {
    revalidatePath: vi.fn(),
  };
});

describe('createTodoAction (unit)', () => {
  it('should call createTodoUseCase with correct values', async () => {
    const { createTodoUseCaseSpy } = makeTestTodoMocks();
    const expectedParamCall = 'Usecase should be called with this';
    await createTodoAction(expectedParamCall);

    expect(createTodoUseCaseSpy).toHaveBeenCalledExactlyOnceWith(
      expectedParamCall,
    );
  });

  it('should call revalidatePath if usecase returns success', async () => {
    const { revalidatePathMocked } = makeTestTodoMocks();
    const description = 'Usecase should be called with this';
    await createTodoAction(description);

    expect(revalidatePathMocked).toHaveBeenCalledExactlyOnceWith('/');
  });

  it('should return the same value from usecase on success', async () => {
    const { successResult } = makeTestTodoMocks();
    const description = 'Usecase should be called with this';
    const result = await createTodoAction(description);

    expect(result).toStrictEqual(successResult);
  });

  it('should return the same value from usecase on error', async () => {
    const { createTodoUseCaseSpy, errorResult } = makeTestTodoMocks();
    const description = 'Usecase should be called with this';

    createTodoUseCaseSpy.mockResolvedValue(errorResult);

    const result = await createTodoAction(description);

    expect(result).toStrictEqual(errorResult);
  });
});
