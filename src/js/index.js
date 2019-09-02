import Model from './model';
import View from './view';
import Controller from './controller';
import { save, load } from './helpers';

const state = load(); // 1. загрузка данных из хранилища если они там есть

const model = new Model(state || undefined); // 2. отправляем данные в модель
model.on('change', state => save(state));

const view = new View();
const controller = new Controller(model, view);
