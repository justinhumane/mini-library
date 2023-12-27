interface Book {
  id: number;
  title: string;
  author: string;
  publisher: string;
  year: number;
  pages: number | null;
  plot: string;
  audience: string;
  color: string;
}

interface DetailedBook {
  title: {
    value: string;
    elementType: string;
    showOnBook: boolean;
    detailType: string;
    prefix?: string;
  };
  author: {
    value: string;
    elementType: string;
    showOnBook: boolean;
    detailType: string;
    prefix?: string;
  };
  publisher: {
    value: string;
    elementType: string;
    showOnBook: boolean;
    detailType: string;
    prefix?: string;
  };
  year: {
    value: number;
    elementType: string;
    showOnBook: boolean;
    detailType: string;
    prefix?: string;
  };
  pages: {
    value: number | null;
    elementType: string;
    showOnBook: boolean;
    detailType: string;
    prefix?: string;
  };
  plot: {
    value: string;
    elementType: string;
    showOnBook: boolean;
    detailType: string;
    prefix?: string;
  };
  audience: {
    value: string;
    elementType: string;
    showOnBook: boolean;
    detailType: string;
    prefix?: string;
  };
  color: string;
}

export { Book, DetailedBook };
