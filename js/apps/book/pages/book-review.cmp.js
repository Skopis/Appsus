import { bookService } from '../services/book.service.js'

export default {
    name: 'book-review',
    template: `
    <section v-if="book" class="book-review">
        <h2>Write a review about: <h1 class="capitalize">{{book.title}}</h1> </h2>
        <form @submit.prevent="submitReview">
            <label for="full-name" >Full Name: </label>
            <input id="full-name" placeholder="full name" type="text" v-model="book.reviews['full-name']">
            <label for="review-text" >Review: </label>
            <textarea rows="12" id="review-text" placeholder="place your review" type="text" v-model="book.reviews['review-text']"></textarea>
            <span class="rate-with-stars">
                <h5>Rate this book</h5>
                <ol class="star-list">
                    <span class="star star-1 fa fa-star" @click="updateStarCount(1)"></span>
                    <span class="star star-2 fa fa-star" @click="updateStarCount(2)"></span>
                    <span class="star star-3 fa fa-star" @click="updateStarCount(3)"></span>
                    <span class="star star-4 fa fa-star" @click="updateStarCount(4)"></span>
                    <span class="star star-5 fa fa-star" @click="updateStarCount(5)"></span>
                </ol>
            </span>
            <button>Submit</button>
        </form>
    </section>
    `,
    data() {
        return {
            book: null,
            numOfStar: null,
        }
    },
    methods: {
        updateStarCount(numberOfStar) {
            for (let i = 1; i <= 5; i++) {
                document.querySelector(`.star-${i}`).classList.remove('selected')
            }
            this.book.reviews['star-rating'] = numberOfStar
            this.numOfStar = numberOfStar;

            for (let i = 1; i <= numberOfStar; i++) {
                document.querySelector(`.star-${i}`).classList.add('selected')
            }
        },
        submitReview() {
            bookService.addReview(this.book.id, this.book.reviews)
            this.$router.push('/book')
        }
    },
    created() {
        const id = this.$route.params.bookId
        bookService.getById(id)
            .then(book => this.book = book);
    }
}