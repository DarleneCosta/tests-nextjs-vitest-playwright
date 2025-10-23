import {
  insertTestTodos,
  makeTestTodoRepository,
} from '@/core/__tests__/utils/make-test-todo-repository';
import { makeNewTodo } from '../factories/make-new-todo';
import { TodoPresenter, ValidTodo } from '../schemas/todo.contract';

describe('DrizzleTodoRepository (integration)', () => {
  beforeEach(async () => {
    const { deleteTodoNoWhere } = await makeTestTodoRepository();
    await deleteTodoNoWhere();
  });

  afterAll(async () => {
    const { deleteTodoNoWhere } = await makeTestTodoRepository();
    await deleteTodoNoWhere();
  });

  describe('findAll', () => {
    it('should return a empty array if the table is clean', async () => {
      const { repository } = await makeTestTodoRepository();
      const todos = await repository.findAll();
      expect(todos).toEqual([]);
    });
    it('should return a array of todos in order by createdAt and description', async () => {
      await insertTestTodos();
      const { repository } = await makeTestTodoRepository();
      const todos = await repository.findAll();
      expect(todos[0].createdAt).toBe('date 4');
      expect(todos[0].description).toBe('Todo 4');
      expect(todos[1].createdAt).toBe('date 3');
      expect(todos[1].description).toBe('Todo 3');
      expect(todos[2].createdAt).toBe('date 2');
      expect(todos[2].description).toBe('Todo 2');
      expect(todos[3].createdAt).toBe('date 1');
      expect(todos[3].description).toBe('Todo 1');
      expect(todos[4].createdAt).toBe('date 0');
      expect(todos[4].description).toBe('Todo 0');
    });
  });
  describe('create', () => {
    it('should create todo if data is valid', async () => {
      const { repository, todos } = await makeTestTodoRepository();

      const result = (await repository.create(todos[0])) as ValidTodo;

      expect(result).toStrictEqual({
        success: true,
        todo: todos[0],
      });
    });
    it('should fail if already exists a todo with the same description', async () => {
      const { repository, todos } = await makeTestTodoRepository();

      await repository.create(todos[0]);
      const newTodo = makeNewTodo(todos[0].description);
      const result = await repository.create(newTodo);

      expect(result).toStrictEqual({
        success: false,
        errors: ['Já existe um todo com esta descrição ou id informado.'],
      });
    });
    it('should fail if already exists a todo with the same id', async () => {
      const { repository, todos } = await makeTestTodoRepository();

      await repository.create(todos[0]);
      const anotherTodo = {
        id: 'another-id',
        description: todos[0].description,
        createdAt: 'another-date',
      };
      const result = await repository.create(anotherTodo);

      expect(result).toEqual({
        success: false,
        errors: ['Já existe um todo com esta descrição ou id informado.'],
      });
    });
  });
  describe('remove', () => {
    it('should remove todo if id exists', async () => {});
    it('should fail if todo does not exist', async () => {});
  });
});
