/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/Logic.js
class Logic {
  constructor(gui) {
    this.gui = gui;
    this.tickets = null;
    this.url = 'http://localhost:8081/';
    this.modalSubmit = this.modalSubmit.bind(this);
    this.modalReset = this.modalReset.bind(this);
  }
  init() {
    this.getTickets();
    this.gui.widget.addEventListener('click', e => {
      e.preventDefault();
      if (e.target.dataset.id === 'edit') this.editTicket(e);else if (e.target.dataset.id === 'del') this.delTicket(e);else if (e.target.dataset.id === 'title') this.showDescription(e);else if (e.target.dataset.id === 'add') this.addTicket(e);
    });
  }
  async sendXHR(method, query, type) {
    const xhr = new XMLHttpRequest();
    if (method === 'GET') {
      const url = `${this.url}?method=${query}`;
      xhr.open(method, url, false);
      xhr.send();
    } else if (method === 'POST') {
      const url = `${this.url}?method=${type}`;
      xhr.open(method, url, false);
      xhr.send(query);
    } else if (method === 'DELETE') {
      const url = `${this.url}?method=deleteTicket&id=${query}`;
      xhr.open(method, url, false);
      xhr.send();
    }
    return xhr.responseText;
  }
  async modalSubmit(e) {
    e.preventDefault();
    const {
      name
    } = e.target;
    const id = e.target.dataset.idfor;
    if (name === 'edit') {
      const request = new FormData(document.forms[1]);
      request.append('id', id);
      await this.sendXHR('POST', request, 'editTicket');
    } else if (name === 'del') {
      const request = id;
      this.sendXHR('DELETE', request);
    } else if (name === 'createTicket') {
      const request = new FormData(document.forms[1]);
      const result = JSON.parse(await this.sendXHR('POST', request, 'createTicket'));
      this.gui.list.innerHTML += this.gui.rowTemplate(result.id, result.status, result.name, result.created);
    }
    this.getTickets();
    this.gui.modal.removeEventListener('submit', this.modalSubmit);
    await this.gui.modal.classList.add('hidden');
  }
  modalReset(e) {
    e.preventDefault();
    this.gui.modal.classList.add('hidden');
    this.gui.modal.removeEventListener('reset', this.modalReset);
  }
  delTicket(e) {
    const {
      id
    } = e.target.closest('.row').dataset;
    this.gui.modal.classList.remove('hidden');
    this.gui.modal.innerHTML = this.gui.delTemplate(id);
    this.gui.modal.addEventListener('submit', this.modalSubmit);
    this.gui.modal.addEventListener('reset', this.modalReset);
  }
  addTicket() {
    this.gui.modal.classList.remove('hidden');
    this.gui.modal.innerHTML = this.gui.editTemplate('Добавить тикет', '', '', '', 'createTicket');
    this.gui.modal.addEventListener('submit', this.modalSubmit);
    this.gui.modal.addEventListener('reset', this.modalReset);
  }
  async showDescription(e) {
    if (!e.target.children[0]) {
      const {
        id
      } = e.target.parentElement.dataset;
      const result = JSON.parse(await this.sendXHR('GET', `ticketById&id=${id}`));
      e.target.innerHTML += this.gui.descriptionTemplate(result.description);
    } else e.target.removeChild(e.target.children[0]);
  }
  async editTicket(e) {
    this.gui.modal.classList.remove('hidden');
    const {
      id
    } = e.target.closest('.row').dataset;
    const result = JSON.parse(await this.sendXHR('GET', `ticketById&id=${id}`));
    this.gui.modal.innerHTML = this.gui.editTemplate('Изменить тикет', result.status, result.name, result.description, 'edit', id);
    this.gui.modal.addEventListener('submit', this.modalSubmit);
    this.gui.modal.addEventListener('reset', this.modalReset);
  }
  async getTickets() {
    const result = JSON.parse(await this.sendXHR('GET', 'allTickets'));
    this.tickets = result;
    this.fillFields(this.tickets);
  }
  fillFields(tArr) {
    this.gui.list.innerHTML = '';
    tArr.forEach(ticket => {
      this.gui.list.innerHTML += this.gui.rowTemplate(ticket.id, ticket.status, ticket.name, ticket.created);
    });
  }
}
;// CONCATENATED MODULE: ./src/js/Gui.js
/* eslint-disable class-methods-use-this */
class Gui {
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
  editTemplate(header, status, title, description, name, id) {
    return `
    <form name=${name} data-idfor="${id}">
      <h3>${header}</h3>
      Статус <input type="text" name="status" value="${status}"><br>
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
      <p>Уверены? Это невозможно отменить.</p>
      <button type="reset">Отмена</button>
      <button type="submit">Ок</button>
    </form>
    `;
  }
}
;// CONCATENATED MODULE: ./src/js/app.js


const gui = new Gui();
const logic = new Logic(gui);
logic.init();
;// CONCATENATED MODULE: ./src/index.js


/******/ })()
;