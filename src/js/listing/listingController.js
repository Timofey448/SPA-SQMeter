import * as view from './listingView';

export default function(state) {
  // рендер контейнера для карточек на старте
  view.render();

  // рендер карточек
  state.results.forEach(function(item) {
    view.renderCard(item, state.favourite.isFav(item.id));
  })

  // Запуск прослушку клика на иконке "Добавить в избранное"
  addToFavsListener();

  // подписка на событие из filterController
  state.emitter.subscribe('event:render-listing', function() {
    // очистка контейнера с карточками
    view.clearListingContainer();

    // рендер карточек
    state.results.forEach(function(item) {
      view.renderCard(item, state.favourite.isFav(item.id));
    });

    // Запуск прослушку клика на иконке "Добавить в избранное"
    addToFavsListener();
  });

  // Функция для работы иконок "Добавить в избранное"
  function addToFavsListener() {
      Array.from(document.getElementsByClassName('card__like')).forEach(function(item) {
        item.addEventListener('click', function(event) {
        event.preventDefault();

        // поиск Id объекта, по которому кликнули
        const currentId = event.target.closest('.card').dataset.id;

        // Добавление/удаление элемента из избранного
        state.favourite.toggleFav(currentId);

        // Включение/выключение кнопки с избранным
        view.toggleFavouriteIcon(event.target.closest('.card__like'), 
          state.favourite.isFav(currentId));
        })
      });
  }
}