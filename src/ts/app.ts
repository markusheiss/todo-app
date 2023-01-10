import {
  qs,
  generateTodoItemMarkup,
  loadFromLocalStorage,
  saveToLocalStorage,
} from './helpers';
import { TodoItem } from './todoItem';

// const form = qs('form-new-todo')!;
const formNewTodo = qs('.form-new-todo')! as HTMLFormElement;
const inputNewTodo = qs('.input-new-todo')! as HTMLInputElement;
const containerTodos = qs('.todos')!;

class App {
  private todos: TodoItem[];

  constructor() {
    this.todos = loadFromLocalStorage();
    this.renderTodos();
  }

  private renderTodos() {
    containerTodos.innerHTML = '';
    this.todos.forEach(todo => {
      const markup = generateTodoItemMarkup(todo);
      containerTodos.insertAdjacentHTML('afterbegin', markup);
    });
  }

  handleTodo(todoEl: HTMLElement, task: string) {
    const todoId = todoEl.dataset.id;
    const todoIndex = this.todos.findIndex(todo => todo.id === todoId);

    if (task === 'delete') {
      this.deleteTodo(todoIndex);
      todoEl.remove();
    } else if (task === 'set-done') {
      this.todos[todoIndex].done = !this.todos[todoIndex].done;
    }
    saveToLocalStorage(this.todos);
    this.renderTodos();
  }

  addTodo(text: string) {
    const todo = new TodoItem(undefined, text);
    this.todos.push(todo);
    this.renderTodos();
    saveToLocalStorage(this.todos);
  }

  deleteTodo(index: number) {
    this.todos.splice(index, 1);
  }
}

formNewTodo.addEventListener('submit', e => {
  e.preventDefault();

  const formData = new FormData(formNewTodo);
  const todoText = formData.get('todo-text')!.toString();
  if (!todoText) return;

  inputNewTodo.value = '';
  app.addTodo(todoText);
});

// todo buttons listener
containerTodos.addEventListener('click', e => {
  const target = e.target as HTMLElement;
  const btn =
    target.closest('.btn-delete-todo') || target.closest('.btn-check-todo');
  if (!btn) return;

  const todoEl = btn.closest('.todo-item')! as HTMLElement;

  if (btn.classList.contains('btn-delete-todo'))
    app.handleTodo(todoEl, 'delete');
  else app.handleTodo(todoEl, 'set-done');
});

const app = new App();
