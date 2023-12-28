import { DetailedBook } from "../interfaces/Book";
import { renderBook, renderBookInfo } from "./BookUtility.js";

const pushModalInfo = (book: DetailedBook): void => {
  const modalBookContainer: HTMLDivElement = document.querySelector(".modal-book-container");
  while (modalBookContainer.lastElementChild) {
    modalBookContainer.removeChild(modalBookContainer.lastElementChild);
  }

  modalBookContainer.append(renderBook(book, "modal-book"), renderBookInfo(book));

  toggleModalVisibilty();
};

const toggleModalVisibilty = (): void => {
  const modal: HTMLDivElement = document.querySelector(".modal");
  modal.classList.toggle("hide");
};

export { pushModalInfo, toggleModalVisibilty };
