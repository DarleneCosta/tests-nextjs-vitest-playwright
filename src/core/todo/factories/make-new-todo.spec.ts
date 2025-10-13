import { makeNewTodo } from "./make-new-todo";

describe('makeNewTodo unit test', () => {
    it('should create a new todo', () => {
        //arrange
        const expectedTodo = {
            id: expect.any(String),
            description: 'New Todo',
            createdAt: expect.any(String),
        };
        //act
        const todo = makeNewTodo(expectedTodo.description);
        //assert
        expect(todo).toStrictEqual(expectedTodo);
    });

});