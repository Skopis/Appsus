//main routes
import homePage from './pages/home-page.cmp.js'
import aboutPage from './pages/about-page.cmp.js'
//book routes
import bookApp from './apps/book/pages/book-app.cmp.js'
import bookDetails from './apps/book/pages/book-details.cmp.js'
import bookReview from './apps/book/pages/book-review.cmp.js'
//email routes
import emailApp from './apps/email/pages/email-app.cmp.js'
import emailDetails from './apps/email/cmps/email-details.cmp.js'
import emailCompose from './apps/email/cmps/email-compose.cmp.js'
//note routs
import noteApp from './apps/note/pages/note-app.cmp.js'
import emailList from './apps/email/cmps/email-list.cmp.js'

const routes = [
    {
        path: '/',
        component: homePage,
    },
    {
        path: '/book',
        component: bookApp
    },
    {
        path: '/book/:bookId',
        component: bookDetails
    },
    {
        path: '/book/review/:bookId?',
        component: bookReview
    },
    {
        path: '/about',
        component: aboutPage
    },
    {
        path: '/note',
        component: noteApp,
    },
    {
        path: '/note/:subject',
        component: noteApp,
    },
    {
        path: '/email',
        component: emailApp,
        children: [
            {
                path: '/',
                component: emailList
            },
            { 
                path: 'list',
                component: emailList
            },
            {
                path: 'compose',
                component: emailCompose
            },
            // {
            //     path: 'compose/:noteTxt',
            //     component: emailCompose
            // },
            {
                path: 'compose/:emailId',
                component: emailCompose
            },
            {
                path: ':emailId',
                component: emailDetails
            },
        ]
    },
]

export const myRouter = new VueRouter({ routes })