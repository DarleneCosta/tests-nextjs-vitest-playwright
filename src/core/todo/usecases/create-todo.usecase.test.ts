import { makeTestTodoRepository } from '@/core/__tests__/utils/make-test-todo-repository';
import { createTodoUseCase } from './create-todo.usecase';
import { InvalidTodo, ValidTodo } from '../schemas/todo.contract';

describe('createTodoUseCase (integration)', () => {
  beforeEach(async () => {
    const { deleteTodoNoWhere } = await makeTestTodoRepository();
    await deleteTodoNoWhere();
  });

  afterAll(async () => {
    const { deleteTodoNoWhere } = await makeTestTodoRepository();
    await deleteTodoNoWhere();
  });

  it('should return error if description is invalid', async () => {
    const result = (await createTodoUseCase('')) as InvalidTodo;
    expect(result.success).toBe(false);
    expect(result.errors).toHaveLength(1);
  });

  it('should return todo if description is valid', async () => {
    const description = 'Buy groceries';
    const result = (await createTodoUseCase(description)) as ValidTodo;
    expect(result.success).toBe(true);
    expect(result.todo).toStrictEqual({
      id: expect.any(String),
      description: description,
      createdAt: expect.any(String),
    });
  });

  it('should return error if todo already exists', async () => {
    const description = 'Buy groceries';
    (await createTodoUseCase(description)) as ValidTodo;

    const result = (await createTodoUseCase(description)) as InvalidTodo;
    expect(result.success).toBe(false);
    expect(result.errors).toStrictEqual([
      'Já existe um todo com esta descrição ou id informado.',
    ]);
  });
});
