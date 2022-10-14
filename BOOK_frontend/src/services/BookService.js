import axios from 'axios';

const BOOK_API_BASE_URL = "http://localhost:8044/api/v1/book";

class BookService {

    getBook(){
        return axios.get(BOOK_API_BASE_URL);
    }

    createBook(book){
        return axios.post(BOOK_API_BASE_URL, book);
    }

    getbookById(bookId){
        return axios.get(BOOK_API_BASE_URL + '/' + bookId);
    }

    updateBook(book, bookId){
        return axios.put(BOOK_API_BASE_URL + '/' + bookId, book);
    }

    deleteBook(bookId){
        return axios.delete(BOOK_API_BASE_URL + '/' + bookId);
    }
}

export default new BookService()