import { defaultTodoRepository } from '../repositories/default.repository';
import { TodoPresenter } from '../schemas/todo.contract';
import { sanitizeString } from '@/core/utils/sanitize-str';

export async function deleteTodoUseCase(id: string): Promise<TodoPresenter> {
  const cleanId = sanitizeString(id);
  if (!cleanId) {
    return {
      success: false,
      errors: ['ID inválido.'],
    };
  }
  const deleteResult = await defaultTodoRepository.remove(cleanId);
  return deleteResult;
}
