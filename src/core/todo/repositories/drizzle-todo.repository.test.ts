import { makeTestTodoRepository } from '@/core/__tests__/utils/make-test-todo-repository';

describe('DrizzleTodoRepository (integration)', () => {
  describe('findAll', () => {
    it('should return a empty array if the table is clean', async () => {
      const { repository } = await makeTestTodoRepository();
      const todos = await repository.findAll();
      expect(todos).toEqual([]);
    });
    it('should return a array of todos in order by createdAt and description', async () => {});
  });
  describe('create', () => {
    it('should create todo if data is valid', async () => {});
    it('should fail if already exists a todo with the same description', async () => {});
    it('should fail if already exists a todo with the same id', async () => {});
  });
  describe('remove', () => {
    it('should remove todo if id exists', async () => {});
    it('should fail if todo does not exist', async () => {});
  });
});
