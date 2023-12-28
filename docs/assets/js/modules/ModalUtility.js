import { renderBook, renderBookInfo } from "./BookUtility.js";
const pushModalInfo = (book) => {
    const modalBookContainer = document.querySelector(".modal-book-container");
    while (modalBookContainer.lastElementChild) {
        modalBookContainer.removeChild(modalBookContainer.lastElementChild);
    }
    modalBookContainer.append(renderBook(book, "modal-book"), renderBookInfo(book));
    toggleModalVisibilty();
};
const toggleModalVisibilty = () => {
    const modal = document.querySelector(".modal");
    modal.classList.toggle("hide");
};
export { pushModalInfo, toggleModalVisibilty };
