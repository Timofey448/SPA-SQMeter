import FavouritesCards from './favouritesCardsModel.js';
import * as view from './favouritesCardsView.js';

export default async function(state) {
  // Получение списка объектов из избранного
  const favsList = state.favourite.favs;

  // Получение данных с сервера
  const favouritesCards = new FavouritesCards(favsList);
  await favouritesCards.getFavs();

  // Отображение страницы с карточками
  view.renderPage(favouritesCards.cards);

  addToFavsListener();

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

