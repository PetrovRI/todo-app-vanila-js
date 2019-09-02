// вроде как подобие actions из реакт
// руководит представление и моделью
class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    // искуственные события
    view.on('add', this.addTodo.bind(this));
    view.on('toggle', this.toggleTodo.bind(this));
    view.on('edit', this.editTodo.bind(this));
    view.on('remove', this.removeTodo.bind(this));

    view.show(model.items);
  }
  // создали обьект
  addTodo(title) {
    const item = this.model.addItem({
      id: Date.now(),
      title,
      completed: false,
    });
    // добавили обьект во view
    this.view.addItem(item);
  }
  // все данные приходят из view
  toggleTodo({ id, completed }) {
    const item = this.model.updateItem(id, { completed });

    this.view.toggleItem(item);
  }

  editTodo({ id, title }) {
    const item = this.model.updateItem(id, { title });

    this.view.editItem(item);
  }

  removeTodo(id) {
    this.model.removeItem(id);
    this.view.removeItem(id);
  }
}

export default Controller;
