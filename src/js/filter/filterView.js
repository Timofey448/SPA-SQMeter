// Полифил для старых браузеров
import 'url-search-params-polyfill';

const elements = {
    filterSelect: document.getElementsByClassName('filter__dropdown'),
    filterRooms: document.getElementsByClassName('rooms__checkbox'),
    filterFields: document.getElementsByClassName('range__input'),
    filterSubmit: document.getElementsByClassName('filter__show'),
}

// рендеринг фильтра на странице
export function render(params) {
    let complexNames = '';
    for (let name of params.complexNames) {
        complexNames += `<option value="${name}">ЖК ${name}</option>`
    }

    let rooms = '';
    for (let value of params.roomValues) {
        rooms += `<input 
                    name="rooms"
                    type="checkbox"
                    id="rooms_${value}"
                    class="rooms__checkbox"
                    value="${value}"
                /><label for="rooms_${value}" class="rooms__btn">${value}</label>`;
    }

    const markup = `
    <form id="filter-form" method="GET" class="container">
      <div class="heading-1">Выбор квартир:</div>
      <div class="filter">
          <div class="column">
              <div class="filter__col">
                  <div class="filter__label">Выбор проекта:</div>
                  <select name="complex" class="filter__dropdown" >
                      <option value="all">Все проекты</option>
                      ${complexNames}
                  </select>
              </div>
              <div class="filter__col rooms">
                  <div class="filter__label">Комнат:</div>
                  <div class="rooms__wrapper">
                    ${rooms}
                  </div>
              </div>
          </div>

          <div class="column">
              <div class="filter__col">
                  <div class="filter__label">Площадь:</div>
                  <div class="range__wrapper">
                      <label class="range">
                          <div class="range__label">от</div>
                          <input
                              name="sqmin"
                              min="0"
                              type="number"
                              class="range__input"
                              placeholder="${params.squareMin}"
                              value="${params.squareMin}"
                            />
                          <div class="range__value">м2</div>
                      </label>
                      <label class="range">
                          <div class="range__label">до</div>
                          <input
                              name="sqmax"
                              min="0"
                              type="number"
                              class="range__input"
                              placeholder="${params.squareMax}"
                              value="${params.squareMax}"
                          />
                          <div class="range__value">м2</div>
                      </label>
                  </div>
              </div>
              <div class="filter__col">
                  <div class="filter__label">Стоимость:</div>
                  <div class="range__wrapper">
                      <div class="range">
                          <label class="range__label">от</label>
                          <input
                              type="number"
                              name="pricemin"
                              min="0"
                              class="range__input range__input--price"
                              placeholder="${params.priceMin}"
                              value="${params.priceMin}"
                          />
                          <div class="range__value">₽</div>
                      </div>
                      <div class="range">
                          <label class="range__label">до</label>
                          <input
                              type="number"
                              name="pricemax"
                              min="0"
                              class="range__input range__input--price"
                              placeholder="${params.priceMax}"
                              value="${params.priceMax}"
                          />
                          <div class="range__value">₽</div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <div class="filter__buttons">
          <button class="filter__show">Показать 119 объектов</button>
          <button type="reset" class="filter__reset">Сбросить фильтр</button>
      </div>
    </form>
  `;
  
  document.querySelector('#app').innerHTML = markup;
}

// Обновление счетчика на кнопке
export function changeButtonText(number) {
    const btn = elements.filterSubmit[0];

    let message;
    if (number > 0) {
        message = `показать ${number} объектов`;
    } else {
        message = 'Объекты не найдены'
    }
    btn.innerText = message;
    btn.disabled = number === 0 ? true : false;
}

// Получение данных с формы
export function getInput() {
    const searchParams = new URLSearchParams();

    // 1. Значения с select
    if (elements.filterSelect[0].value !== 'all') {
        searchParams.append(
            elements.filterSelect[0].name,
            elements.filterSelect[0].value
        )
    }

    // 2. Значения с комнат
    const roomsValues = [];
    let roomsArray = Array.from(elements.filterRooms);

    for (let checkbox of roomsArray) {
        if (checkbox.value !== "" && checkbox.checked) {
            roomsValues.push(checkbox.value);
        }
    }

    const roomsValuesString = roomsValues.join(',');

    if (roomsValuesString !== "") {
        searchParams.append('rooms', roomsValuesString);
    }

    // 3. Значения площади и цены
    let fieldsArray = Array.from(elements.filterFields);
    for (let input of fieldsArray) {
        if (input.value !== "") {
            searchParams.append(input.name, input.value);
        }
    }

    const queryString = searchParams.toString();

    if (queryString) {
        return '?' + queryString;
    } else {
        return '';
    }
}

