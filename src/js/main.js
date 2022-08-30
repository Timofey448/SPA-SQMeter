import HomePage from './pages/Homepage.js';
import ItemPage from './pages/ItemPage.js';
import FavsPage from './pages/FavsPage.js';
import BidsPage from './pages/BidsPage.js';
import ErrorPage from './pages/ErrorPage.js';
import EventEmitter from './utils/EventEmitter.js';
import Favourites from './favoirutes/favouritesModel.js';

// State
const state = {
  results: [],
  emitter: new EventEmitter(),
  favourite: new Favourites(),
}

// Тестирование стэйта
window.state = state; // потом удалить!!!

// Routes
const routes = [
  {path: '/', component: HomePage},
  {path: 'item', component: ItemPage},
  {path: 'favourites', component: FavsPage},
  {path: 'bids', component: BidsPage},
  {path: 'error', component: ErrorPage},
];

// Нахождение маршрута
function findComponentByPath(path, routes) {
  for (let route of routes) {
    if (route.path === path) return route;
  }
}

// Router
function router() {
  const pathArray = location.hash.split('/');

  let currentPath = pathArray[0] === '' ? '/' : pathArray[1];
  currentPath = currentPath === '' ? '/' : currentPath;

  // сохранение параметров для перехода на страницу квартиры
  state.routeParams = pathArray[2] ? pathArray[2] : '';

  let component = findComponentByPath(currentPath, routes);

  if (component === undefined) {
    component = ErrorPage;
    component(state);
  } else {
    component.component(state);
  }
}

window.addEventListener('load', router);
window.addEventListener('hashchange', router);
