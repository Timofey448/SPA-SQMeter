import SingleItem from './singleItemModel.js';
import * as view from './singleItemView.js';

export default async function(state) {
  // создание нового объекта класса SingleItem
  state.singleItem = new SingleItem(state.routeParams);

  // получение данных с сервера
  await state.singleItem.getItem();

  // отрисовка разметки для объекта
  view.render(state.singleItem.result, state.favourite.isFav(state.singleItem.id));


  // -----------ПРОСЛУШКА СОБЫТИЙ----------- 

  // открытие модального окна
  document.querySelector('.button-order').
    addEventListener('click', function() {
      view.showModal();
  });

  // закрытие модального окна (клик по кнопке)
  document.querySelector('.modal__close').
    addEventListener('click', function() {
      view.hideModal();
  });

  // закрытие модального окна (клик по оверлэю)
  document.querySelector('.modal-wrapper').
    addEventListener('click', function(event) {
      if (event.target.closest('.modal')) {
        return null;
      } else {
        view.hideModal();
      }
  });

  // отправка данных с формы на сервер
  document.querySelector('.modal__form').
    addEventListener('submit', async function(event) {
      event.preventDefault();
      const formData = view.getInput();      
      await state.singleItem.submitForm(formData);

      const response = state.singleItem.serverResponse;

      if (response.message === 'Bid Created') {
        alert('Ваша заявка успешно отправлена');
        view.hideModal();
        view.clearInput();
      } else if (response.message === 'Bid Not Created') {
        response.errors.forEach(function(item) {
          alert(item);
        })
      }
  });
  
  // Клип по кнопке "в избранное"
  document.querySelector('#addToFavBtn').addEventListener('click', function() {
    state.favourite.toggleFav(state.singleItem.id);
    view.toggleFavouriteButton(state.favourite.isFav(state.singleItem.id));
  })
}