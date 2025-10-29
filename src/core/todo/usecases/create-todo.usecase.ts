import { makeValidateTodo } from '../factories/make-validate-todo';
import { defaultTodoRepository } from '../repositories/default.repository';

export async function createTodoUseCase(description: string) {
  const validateResult = makeValidateTodo(description);
  if (!validateResult.success) {
    return validateResult;
  }

  const createResult = await defaultTodoRepository.create(validateResult.todo);
  return createResult;
}
