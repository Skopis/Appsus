

import { bookService } from '../services/book.service.js'
import bookFilter from '../cmps/book-filter.cmp.js'
import bookList from '../cmps/book-list.cmp.js'
import bookAdd from './book-add.cmp.js'

export default {
    name: 'book-app',
    template: `
        <section class="book-app">
            <div class="book-inputs">
                <book-filter @filtered="setFilter"/>
                <book-add @added="loadBooks"/>
            </div>
            <book-list :books="booksToShow" @remove="removeBook"></book-list>
        </section>
    `,
    data() {
        return {
            books: [],
            filterBy: null,
            selectedBook: null
        }
    },
    methods: {
        loadBooks() {
            bookService.query()
                .then(books => this.books = books)
        },
        setFilter(filterBy) {
            this.filterBy = filterBy
        },
        removeBook(bookId) {
            bookService.remove(bookId)
                .then(this.loadBooks)
        }
    },
    computed: {
        booksToShow() {
            if (!this.filterBy) return this.books
            var booksToShow = this.books;
            if (this.filterBy.byName) {
                const searchStr = this.filterBy.byName.toLowerCase()
                booksToShow = this.books.filter(book => {
                    return book.title.toLowerCase().includes(searchStr)
                })
            }
            if (this.filterBy.fromPrice) {
                booksToShow = this.books.filter(book => {
                    return book.listPrice.amount >= this.filterBy.fromPrice
                })
            }
            if (this.filterBy.toPrice) {
                booksToShow = this.books.filter(book => {
                    return book.listPrice.amount <= this.filterBy.toPrice
                })
            }
            if (this.filterBy.fromPrice && this.filterBy.toPrice) {
                booksToShow = this.books.filter(book => {
                    return book.listPrice.amount >= this.filterBy.fromPrice
                        && book.listPrice.amount <= this.filterBy.toPrice
                })
            }
            if (this.filterBy.byName && this.filterBy.fromPrice && this.filterBy.toPrice) {
                const searchStr = this.filterBy.byName.toLowerCase()
                booksToShow = this.books.filter(book => {
                    return book.listPrice.amount >= this.filterBy.fromPrice
                        && book.listPrice.amount <= this.filterBy.toPrice
                        && book.title.toLowerCase().includes(searchStr)
                })
            }
            return booksToShow;
        }
    },
    created() {
        this.loadBooks()
    },
    components: {
        bookFilter,
        bookList,
        bookAdd
    }
}