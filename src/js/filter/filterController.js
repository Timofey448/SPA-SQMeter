import Filter from './filterModel';
import * as view from './filterView';

export default async function(state) {
  // Создание объекта фильтра
  if (!state.filter) state.filter = new Filter();

  // Получение параметров для фильтра
  await state.filter.getParams();

  // Рендер фильтра
  view.render(state.filter.params);

  // Запрос на сервер за данными
  await state.filter.getResults();
  state.results = state.filter.result;

  // Обновление счетчика на кнопке
  view.changeButtonText(state.filter.result.length);

  // Прослушка событий с формы
  const form = document.querySelector('#filter-form');

  // Изменение формы
  form.addEventListener('change', async function(event) {
    event.preventDefault();
    state.filter.query = view.getInput();
    await state.filter.getResults();

    //добавление данных в state
    state.results = state.filter.result;
    view.changeButtonText(state.filter.result.length);
  });

  // Сброс формы
  form.addEventListener('reset', async function() {
    state.filter.query = '';
    await state.filter.getResults();
    view.changeButtonText(state.filter.result.length);

    // Генерирование события для листинга
    state.emitter.emit('event:render-listing', {});
  });

  // Отправка формы
    form.addEventListener('submit', async function(event) {
      event.preventDefault();
      console.log('submit');

      // Генерирование события для листинга
      state.emitter.emit('event:render-listing', {});
  });
}

