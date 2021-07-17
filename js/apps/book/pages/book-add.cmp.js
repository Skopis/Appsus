import { bookService } from '../services/book.service.js'
import { eventBus } from '../../../services/event-bus.service.js'

export default {
    name: 'book-add',
    template: `
    <section class="book-add">
        <p>Search Google Books</p>
        <input type="text" placeholder="Enter book name / author" @input="updateData" v-model="searchStr">
        <ul v-if="searchResults && searchStr" class="results-list">
            <li v-if="isSearchResultsShown" v-for="(searchResult, idx) in searchResults" :key="idx" class="results-list-container" >
                <p class="search-result"><button @click="addBook(searchResult)">➕</button>{{formattedSearchResult(searchResult)}}</p>
            </li>
        </ul>
    </section>
    `,
    data() {
        return {
            searchStr: '',
            googleBook: null,
            searchResults: [],
            isSearchResultsShown: false,
        }
    },
    methods: {
        formattedSearchResult(searchResult) {
            if (searchResult.title.length > 30) return searchResult.title.substring(0, 30) + '..';
            return searchResult.title
        },
        updateData() {
            if (!this.searchStr) return
            this.isSearchResultsShown = true;
            fetch(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${this.searchStr}`)
                .then(results => results.json())
                .then(formattedResults => {
                    const { id, volumeInfo } = formattedResults.items[0]
                    const { title, authors, subtitle, publishedDate, description, pageCount, categories, language, imageLinks } = volumeInfo;
                    const thumbnail = imageLinks.thumbnail
                    this.searchResults.push({ id, title, subtitle, authors, publishedDate, description, pageCount, categories, thumbnail, language });
                })
        },
        addBook(searchResult) {
            this.searchStr = '';
            const addedBook = {
                ...searchResult,
                'listPrice': {
                    'amount': 109,
                    'currencyCode': 'EUR',
                    'isOnSale': false
                },
                'reviews': {
                    'full-name': '',
                    'star-rating': null,
                    'read-at': null,
                    'review-text': ''
                }
            }
            bookService.addGoogleBook(addedBook)
                .then(book => {
                    const msg = {
                        txt: 'Book saved succesfully',
                        type: 'success'
                    }
                    eventBus.$emit('show-msg', msg)
                    this.$emit('added')
                    this.isSearchResultsShown = false;
                })
                .catch(err => {
                    console.log(err);
                    const msg = {
                        txt: 'Error, please try again later',
                        type: 'error'
                    }
                    eventBus.$emit('show-msg', msg)
                })
        }
    }
}