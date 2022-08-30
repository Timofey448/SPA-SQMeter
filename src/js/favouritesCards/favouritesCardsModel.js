export default class FavouritesCards {
  constructor(favsList) {
    this.favsList = favsList;
  }

  async getFavs() {
    const ids = this.favsList.toString();
    const queryString = `https://jsproject.webcademy.ru/items?ids=${ids}`;
    const response = await fetch(queryString);
    const data = await response.json();
    this.cards = await data;
  }
}