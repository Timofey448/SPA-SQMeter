import singleItem from './../singleItem/singleItemController.js';

export default function(state) {

  // очистка контейнера при переходе на страницу объекта
  document.querySelector('#app').innerHTML = '';

  // запуск компонента singleItem
  singleItem(state);
}