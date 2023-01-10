import { TodoItem } from './todoItem';

export const qs = function (el: string) {
  return document.querySelector(`${el}`);
};

export const loadFromLocalStorage = function () {
  const data = localStorage.getItem('todos');
  const todos: TodoItem[] = [];
  if (data) {
    const dataObj = JSON.parse(data);

    dataObj.forEach(
      (todo: {
        id: string | undefined;
        text: string;
        done: boolean | undefined;
      }) => {
        todos.push(new TodoItem(todo.id, todo.text, todo.done));
      }
    );
  }
  return todos;
};

export const saveToLocalStorage = function (todos: TodoItem[]) {
  localStorage.setItem('todos', JSON.stringify(todos));
};

export const generateTodoItemMarkup = function (todo: TodoItem) {
  return `<div class="todo-item ${todo.done ? 'finished' : ''}" data-id=${
    todo.id
  }>
    <svg
      class="btn-check-todo"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-6 h-6">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M4.5 12.75l6 6 9-13.5" />
    </svg>
    <p>${todo.text}</p>
    <svg
      class="btn-delete-todo"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-6 h-6">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M6 18L18 6M6 6l12 12" />
    </svg>
  </div>`;
};
