'use strict';

export default {
    name: 'book-preview',
    props: ['book'],
    template: `
        <section class="book-preview">
            <img v-bind:src="book.thumbnail" alt="" srcset="">
            <p>{{book.title.substring(0, 30)}}</p>
        </section>
        `,
    data() {
        return {
            price: null
        }
    },
}

