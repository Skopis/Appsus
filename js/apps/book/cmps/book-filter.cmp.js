'use strict';

export default {
    name: 'book-filter',
    template: `
        <section class="book-filter">
            <div>
                <input class="txt-input" type="text" @input="setFilter" placeholder="Search by Book Name" v-model="filterBy.byName">
            </div>
            <div>
                <label>From</label>
                <input class="num-input" type="number" @input="setFilter" placeholder="price" v-model.number="filterBy.fromPrice">
                <label>To</label>
                <input class="num-input" type="number" @input="setFilter" placeholder="price" v-model.number="filterBy.toPrice">
            </div> 
        </section>    
    `,
    data(){
        return {
            filterBy: {
                byName: '',
                fromPrice: null,
                toPrice: null
            }
        }
    },
    methods:{
        setFilter(){
            this.$emit('filtered', this.filterBy)
        }
    }
}