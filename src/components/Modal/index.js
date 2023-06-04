export default class Modal {
  constructor() {                                                                      
    this.elem = this.render(); 
    this.elem.querySelector('.modal__close').addEventListener('click', this.close);                                                                                                                    // вешаем на кнопку закрытия модального окна событие 'click', описаное в методе Close; 2-ой - закрытие по клику по кнопке [x], которая содержит класс modal__close 
    document.addEventListener("keydown", (event) => this.keyHandler(event));
  }  

  open() {
    document.body.classList.add('is-modal-open');
    document.body.append(this.elem);
  }
 
  setTitle(title) {
    this.elem.querySelector(".modal__title").textContent = title;
  }
     
  setBody(node) {
    let targetElem = this.elem.querySelector('.modal__body');
    if (targetElem) {
      targetElem.innerHTML = '';
    } targetElem.append(node);
  }

  close() {                                                             
    document.body.classList.remove('is-modal-open');
    document.removeEventListener("keydown", () => null);
    let modal = document.querySelector('.modal');
    if (modal) {
      modal.remove();
    } 
  }
   
  keyHandler(_e) {
    if (_e.code === 'Escape') {
      this.close();                  
    };      
  }
 
  render () {
    let container = document.querySelector('.container');
    let modalDiv = document.createElement('div');
    modalDiv.classList.add('modal');
    container && container.append(modalDiv);

    let modalOverlayDiv = document.createElement('div');
    modalOverlayDiv.classList.add('modal__overlay');
    modalDiv.append(modalOverlayDiv);

    let modalInnerDiv = document.createElement('div');
    modalInnerDiv.classList.add('modal__inner');
    modalDiv.append(modalInnerDiv);

    let modalHeaderDiv = document.createElement('div');
    modalHeaderDiv.classList.add('modal__header');
    modalInnerDiv.append(modalHeaderDiv);

    let modalButtonClose = document.createElement('button');
    modalButtonClose.classList.add('modal__close');
    modalHeaderDiv.append(modalButtonClose);

    let closeIcon = document.createElement('img');
    closeIcon.setAttribute('src', "/assets/images/icons/cross-icon.svg");
    closeIcon.setAttribute('alt', "close-icon");
    modalButtonClose.append(closeIcon);

    let modalTitle = document.createElement('h3');
    modalTitle.classList.add('modal__title');
    modalHeaderDiv.append(modalTitle);

    let modalBodyDiv = document.createElement('div');
    modalBodyDiv.classList.add('modal__body');
    modalInnerDiv.append(modalBodyDiv);

    return modalDiv;
  }
}
