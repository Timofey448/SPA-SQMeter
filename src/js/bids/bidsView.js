function render() {
  const appContainer = document.querySelector('#app');
  const markup = `
    <div class="container mb-5">
      <div class="heading-1">Заявки</div>
    </div>

    <div class="panels-wrapper">
      <div id="bidsHolder" class="container">
      </div>
    </div>
  `;
  appContainer.insertAdjacentHTML('beforeend', markup);
}

function renderBid(bid) {
  const markup = `
    <div class="panel panel--no-hover">
      <div class="panel__bidid">${bid.id}</div>
      <div class="panel__bidname">${bid.name}</div>
      <div class="panel__bidphone">${bid.phone}</div>
    </div>
  `;
  document.querySelector('#bidsHolder').insertAdjacentHTML('beforeend', markup);
}

export function renderBids(bids) {
  render();
  bids.forEach(function(item) {
    renderBid(item);
  })
}