import { makeTestTodoRepository } from '@/core/__tests__/utils/make-test-todo-repository';
import { deleteTodoUseCase } from './delete-todo.usecase';
import { InvalidTodo, ValidTodo } from '../schemas/todo.contract';

describe('deleteTodoUseCase (integration)', () => {
  beforeEach(async () => {
    const { deleteTodoNoWhere } = await makeTestTodoRepository();
    await deleteTodoNoWhere();
  });

  afterAll(async () => {
    const { deleteTodoNoWhere } = await makeTestTodoRepository();
    await deleteTodoNoWhere();
  });

  it('should return error if id is invalid', async () => {
    const result = (await deleteTodoUseCase('')) as InvalidTodo;
    expect(result).toEqual({
      success: false,
      errors: ['ID inválido.'],
    });
  });

  it('should return success if id is valid', async () => {
    const { insertTodoDb, todos } = await makeTestTodoRepository();
    await insertTodoDb().values(todos);
    const id = todos[0].id;
    const result = (await deleteTodoUseCase(id)) as ValidTodo;
    expect(result).toEqual({
      success: true,
      todo: todos[0],
    });
  });

  it('should return error if todo does not exist', async () => {
    const result = (await deleteTodoUseCase('1')) as InvalidTodo;
    expect(result.success).toBe(false);
    expect(result.errors).toHaveLength(1);
  });
});
