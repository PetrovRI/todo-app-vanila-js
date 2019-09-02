import { EventEmitter, createElement } from './helpers';

class View extends EventEmitter {
  constructor() {
    super();

    this.form = document.getElementById('todo-form');
    this.input = document.getElementById('add-input');
    this.list = document.getElementById('todo-list');

    this.form.addEventListener('submit', this.handleAdd.bind(this));
  }

  createListItem(todo) {
    const checkbox = createElement('input', {
      type: 'checkbox',
      className: 'todo-list__checkbox',
      checked: todo.completed ? 'checked' : '',
    });
    const label = createElement(
      'label',
      { className: 'todo-list__title' },
      todo.title
    );
    const editInput = createElement('input', {
      type: 'text',
      className: 'todo-list__text',
    });
    const editButton = createElement(
      'button',
      { className: 'todo-list__button-edit btn' },
      'Изменить'
    );
    const deleteButton = createElement(
      'button',
      { className: 'todo-list__button-remove btn' },
      'Удалить'
    );
    const item = createElement(
      'li',
      {
        className: `todo-list__item${todo.completed ? ' completed' : ''}`,
        'data-id': todo.id,
      },
      checkbox,
      label,
      editInput,
      editButton,
      deleteButton
    );

    return this.addEventListeners(item);
  }

  addEventListeners(item) {
    const checkbox = item.querySelector('.todo-list__checkbox');
    const editButton = item.querySelector('.todo-list__button-edit');
    const removeButton = item.querySelector('.todo-list__button-remove');

    checkbox.addEventListener('change', this.handleToggle.bind(this));
    editButton.addEventListener('click', this.handleEdit.bind(this));
    removeButton.addEventListener('click', this.handleRemove.bind(this));

    return item;
  }

  findListItem(id) {
    return this.list.querySelector(`[data-id="${id}"]`);
  }

  handleAdd(event) {
    event.preventDefault();

    if (!this.input.value) return alert('Необходимо ввести название задачи.');

    const value = this.input.value;
    console.log(value);
    this.emit('add', value);
  }

  handleToggle({ target }) {
    const listItem = target.parentNode;
    const id = listItem.getAttribute('data-id');
    const completed = target.checked;
    this.emit('toggle', { id, completed });
  }

  handleEdit({ target }) {
    const listItem = target.parentNode;
    const id = listItem.getAttribute('data-id');
    const label = listItem.querySelector('.todo-list__title');
    const input = listItem.querySelector('.todo-list__text');
    const editButton = listItem.querySelector('.todo-list__button-edit');
    const title = input.value;
    const isEditing = listItem.classList.contains('todo-list__item--editing');

    if (isEditing) {
      this.emit('edit', { id, title });
    } else {
      input.value = label.textContent;
      editButton.textContent = 'Сохранить';
      listItem.classList.add('todo-list__item--editing');
    }
  }

  handleRemove({ target }) {
    const listItem = target.parentNode;

    this.emit('remove', listItem.getAttribute('data-id'));
  }

  show(todos) {
    todos.forEach(todo => {
      const listItem = this.createListItem(todo);

      this.list.appendChild(listItem);
    });
  }

  addItem(todo) {
    const listItem = this.createListItem(todo);
    this.input.value = '';
    this.list.appendChild(listItem);
  }

  toggleItem(todo) {
    const listItem = this.findListItem(todo.id);
    const checkbox = listItem.querySelector('.todo-list__checkbox');

    checkbox.checked = todo.completed;

    if (todo.completed) {
      listItem.classList.add('todo-list__item--completed');
    } else {
      listItem.classList.remove('todo-list__item--completed');
    }
  }

  editItem(todo) {
    const listItem = this.findListItem(todo.id);
    const label = listItem.querySelector('.todo-list__title');
    const input = listItem.querySelector('.todo-list__text');
    const editButton = listItem.querySelector('.todo-list__button-edit');

    label.textContent = todo.title;
    editButton.textContent = 'Изменить';
    listItem.classList.remove('todo-list__item--editing');
  }

  removeItem(id) {
    const listItem = this.findListItem(id);

    this.list.removeChild(listItem);
  }
}

export default View;
