/* eslint-disable class-methods-use-this */
export default class Gui {
  constructor() {
    this.status = document.querySelector('[data-id=status]');
    this.title = document.querySelector('[data-id=title]');
    this.data = document.querySelector('[data-id=data]');
    this.list = document.querySelector('.list');
    this.modal = document.querySelector('.modal');
    this.widget = document.querySelector('.ticketswidget');
  }

  rowTemplate(id, status, title, data) {
    return `
    <div class="row" data-id="${id}">
      <div data-id="status">${status}</div>
      <div data-id="title" class="title">${title}</div>
      <div data-id="data" class="date">${data}</div>
      <div><button data-id="edit">edit</button></div>
      <div><button data-id="del">del</button></div>
    </div>`;
  }

  editTemplate(header, title, description, name, id) {
    return `
    <form name=${name} data-idfor="${id}">
      <h3>${header}</h3>
      Краткое описание <input type="text" name="title" value="${title}"><br>
      Подробное описание <input type="text" name="description" value="${description}"><br>
      <button type="reset">Отмена</button>
      <button type="submit">Ок</button>
    </form>
      `;
  }

  descriptionTemplate(description) {
    return `
    <p>${description}</p>
    `;
  }

  delTemplate(id) {
    return `
    <form name="del" data-idfor=${id}>
      <h3>Удалить тикет</h3>
      <p>Are you sure? It's can't be cancelled.</p>
      <button type="reset">Отмена</button>
      <button type="submit">Ок</button>
    </form>
    `;
  }
}
