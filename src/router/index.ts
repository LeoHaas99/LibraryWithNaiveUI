import  { createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import Books from '../components/Books.vue'
import BookNew from '../components/BookNew.vue'
import BookEdit from '../components/BookEdit.vue'
import BookDetails from '../components/BookDetails.vue'
import Authors from '../components/Authors.vue'
import AuthorNew from '../components/AuthorNew.vue'
import AuthorDetails from '../components/AuthorDetails.vue'
import AuthorEdit from '../components/AuthorEdit.vue'
import Statistics from '../components/Statistics.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path:'/',
            redirect: '/statistics'
            
        },
        {
            path:'/books',
            name: 'books',
            component: () => import('../components/Books.vue'),
            
        },
        {
            path:'/book/new',
            component: () => import('../components/BookNew.vue'),
            
        },
        {
            path:'/book/edit/:id',
            component: () => import('../components/BookEdit.vue'),
            
        },
        {
            path:'/book/details/:id',
            component: () => import('../components/BookDetails.vue'),
            
        },
        {
            path:'/authors',
            name: 'authors',
            component: () => import('../components/Authors.vue'),
        },
        {
            path:'/author/new',
            component: () => import('../components/AuthorNew.vue'),
            
        },
        {
            path:'/author/edit/:id',
            component: () => import('../components/AuthorEdit.vue'),
            
        },
        {
            path:'/author/details/:id',
            component: () => import('../components/AuthorDetails.vue'),
            
        },
        {
            path:'/statistics',
            component: () => import('../components/Statistics.vue'),
            name: 'statistics'
            
        },
        {
            path: "/:pathMatch(.*)*",
            name: '404',
            component: () => import('../components/404.vue'),
            meta: {
              auth: false
            }
          }
    ]
})

export default router