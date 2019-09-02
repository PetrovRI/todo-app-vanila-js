// модель ничего не знает про представление
// ничего не знает о своем окружении
import { EventEmitter } from './helpers';

class Model extends EventEmitter {
  constructor(items = []) {
    super();

    this.items = items;
  }
  // используем id для поиска нужного item
  getItem(id) {
    return this.items.find(item => item.id == id);
  }

  addItem(item) {
    this.items.push(item);
    this.emit('change', this.items);
    return item;
  }
  //1. находим элемент
  //2. изменяем его (в массиве есть обьект, там его и изменяем)
  updateItem(id, data) {
    const item = this.getItem(id);
    //переберем ключи/значения data для того что бы потом их передать обьекту item (типо получили данные с сервера и замапировали)
    //item[prop] = data[prop]
    //берем item и помешаем в него необходимые данные из data(свойства которые мы укажем при создании)

    Object.keys(data).forEach(prop => (item[prop] = data[prop]));

    this.emit('change', this.items);

    return item;
  }

  removeItem(id) {
    const index = this.items.findIndex(item => item.id == id);
    // если index не найден тогда вернется -1
    if (index > -1) {
      //от нужного нам индекса срезаем 1
      this.items.splice(index, 1);
      this.emit('change', this.items);
    }
  }
}

export default Model;
