export default class Filter {
  constructor() {
    this.query ='';
  }
  
  // Получение исходных параметров для HomePage
  async getParams() {
    try {
      const queryString = 'https://jsproject.webcademy.ru/itemsinfo';
      const response = await fetch(queryString);
      const data = await response.json();
      this.params = await data;
    } catch(error) {
      console.log(error);
    }
  }

  // Получение данных с сервера по квартирам
  async getResults() {
    try {
      const queryString = `https://jsproject.webcademy.ru/items${this.query}`;
      const response = await fetch(queryString);
      const data = await response.json();
      this.result = await data;
      console.log(this.result);
    } catch(error) {
      console.log(error);
    }
  }
}
