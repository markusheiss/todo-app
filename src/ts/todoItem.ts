import { v4 as uuidv4 } from 'uuid';

export class TodoItem {
  id: string;
  text: string;
  done: boolean;

  constructor(id: string = uuidv4(), text: string, done: boolean = false) {
    this.id = id;
    this.text = text;
    this.done = done;
  }
}
