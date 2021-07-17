'use strict';

import bookPreview from './book-preview.cmp.js'

export default {
    name: 'book-list',
    props: ['books'],//books to show
    template: `
        <ul class="book-list flex wrap justify-around clean-list justify-center">
            <li v-for="book in books" :key="book.id" class="book-preview-container">
                <router-link :to="'/book/'+book.id">    
                <book-preview :book="book"/>
                </router-link>
                <button class="delete-btn" @click="remove(book.id)">Delete</button>
            </li>
        </ul>
    `,
    methods: {
        remove(bookId){
            this.$emit('remove', bookId);
        }
    },
    components: {
        bookPreview
    }
}