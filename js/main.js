import appHeader from './cmps/app-header.cmp.js'
import userMsg from './cmps/user-msg.cmp.js'
import { myRouter } from './routes.js'


const options = {
    el: '#app',
    router: myRouter,
    template: `
        <section class="main-app">
            <user-msg />
            <app-header />
            <router-view/>
            <footer><a href="https://aldf.org/article/laws-that-protect-animals/"> &copy; Animalrights 2021</a></footer>
        </section>
    `,
    components:{
        userMsg,
        appHeader
    }
}

const app = new Vue(options)