import { Book, DetailedBook } from "../interfaces/Book";

const createDetailedBook = (book: Book): DetailedBook => {
  const detailedBook: DetailedBook = {
    title: {
      value: book.title,
      elementType: "h2",
      showOnBook: true,
      detailType: "header",
    },
    author: {
      value: book.author,
      elementType: "p",
      showOnBook: true,
      detailType: "header",
      prefix: "By",
    },
    plot: {
      value: book.plot,
      elementType: "p",
      showOnBook: false,
      detailType: "plot",
    },
    audience: {
      value: book.audience,
      elementType: "p",
      showOnBook: false,
      detailType: "info",
      prefix: "Audience:",
    },
    year: {
      value: book.year,
      elementType: "p",
      showOnBook: false,
      detailType: "info",
      prefix: "First published:",
    },
    pages: {
      value: book.pages,
      elementType: "p",
      showOnBook: false,
      detailType: "info",
      prefix: "Pages:",
    },
    publisher: {
      value: book.publisher,
      elementType: "p",
      showOnBook: false,
      detailType: "info",
      prefix: "Publisher:",
    },
    color: book.color,
  };

  return detailedBook;
};

export default createDetailedBook;
