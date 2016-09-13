import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App.vue'
import HomePage from './HomePage.vue'
import LoginPage from './LoginPage.vue'
import LogoutPage from './LogoutPage.vue'
import LinksPage from './LinksPage.vue'

Vue.use(VueRouter)
Vue.use(VueResource)

Vue.http.interceptors.push((request, next) => {
    console.log('interceptors')
    request.headers.set('Authorization', 'Bearer ' + window.localStorage.getItem('jwt-token'))

    next();
})

export var router = new VueRouter()

router.map({
    '/': {
        component: HomePage
    },
    '/auth/login': {
        component: LoginPage
    },
    '/auth/logout': {
        component: LogoutPage
    },
    '/links': {
    component: LinksPage
}
})

router.start(App, '#app')