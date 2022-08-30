import bids from './../bids/bidsController.js';

export default function(state) { 
  // очистка контейнера app
  document.querySelector('#app').innerHTML = '';
  
  bids(state);
}