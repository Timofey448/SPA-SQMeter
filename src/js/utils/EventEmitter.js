export default class EventEmitter {
  constructor() {
    this.events = {};
  }

  emit(eventName, data) {
    const event = this.events[eventName];
    if (event) {
      event.forEach(function(fn) {
        fn.call(null, data);
      })
    }
  }
  // То есть проверка, если событие действительно сущ-ет, 
  // тогда берет все функции из массива, кот сущ.для этого
  // события и запускает Их (call)

  subscribe(eventName, fn) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(fn);
    // запихиваем в массив функции, которые нужно будет
    // вызвать при генерации события. Если подписок много, 
    // то и функций будет много.

    // возвращает функцию, по которой происходит отписка от события
    return function() {
      this.events[eventName] = this.events[eventName].filter(
        (eventFn) => fn !== eventFn
      );
    };
  }
}
