import React from 'react';
import ReactDOM from 'react-dom/client';
import ToastItem from './ToastItem';
import uuid from 'react-uuid';

class Toast {
  #rootElem;
  #root;
  #messages;
  constructor() {
    this.#rootElem = document.getElementById('toast-root');
    this.#root = ReactDOM.createRoot(this.#rootElem);
    this.#messages = [];
  }

  #render(element) {
    this.#root.render(element);
  }

  #closeMessage(msgIdx) {
    const index = this.#messages.findIndex(({ id }) => id === msgIdx);
    this.#messages.splice(index, 1);
    this.#render(
      <ToastItem messages={this.#messages} closeMessage={this.#closeMessage.bind(this)} />,
    );
  }

  #autoCloseMessage(msgIdx) {
    setTimeout(
      () => {
        this.#closeMessage(msgIdx);
      },
      3000,
      this,
    );
  }

  info(message) {
    const id = uuid();
    this.#messages.push({
      id,
      type: 'info',
      message,
    });
    this.#render(
      <ToastItem messages={this.#messages} closeMessage={this.#closeMessage.bind(this)} />,
    );
    this.#autoCloseMessage(id);
  }

  success(message) {
    const id = uuid();
    this.#messages.push({
      id,
      type: 'success',
      message,
    });
    this.#render(
      <ToastItem messages={this.#messages} closeMessage={this.#closeMessage.bind(this)} />,
    );
    this.#autoCloseMessage(id);
  }

  warning(message) {
    const id = uuid();
    this.#messages.push({
      id,
      type: 'warning',
      message,
    });
    this.#render(
      <ToastItem messages={this.#messages} closeMessage={this.#closeMessage.bind(this)} />,
    );
    this.#autoCloseMessage(id);
  }

  error(message) {
    const id = uuid();
    this.#messages.push({
      id,
      type: 'error',
      message,
    });
    this.#render(
      <ToastItem messages={this.#messages} closeMessage={this.#closeMessage.bind(this)} />,
    );
    this.#autoCloseMessage(id);
  }
}

export default new Toast();
