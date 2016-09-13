<template>
    <div>
        <top-nav></top-nav>
        <div class="container-fluid">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import TopNav from './TopNav.vue'

    export default {
        components: { TopNav },
        data () {
            return {
                user: null,
                token: null,
                authenticated: false
            }
        },
            methods: {
        login: function (user) {
                this.user = user
                this.authenticated = true
                this.token = localStorage.getItem('jwt-token')
            },

            logout: function () {
                this.user = null
                this.token = null
                this.authenticated = false
                localStorage.removeItem('jwt-token')
                if (this.$route.auth) this.$route.router.go('/auth/login')
            }
    },
    ready () {
        this.$on('userLoggedIn', (user) => {
            this.login(user)
        })

        this.$on('userLoggedOut', () => {
            this.logout()
        })

        var token = localStorage.getItem('jwt-token')
        if (token !== null && token !== 'undefined') {
            var that = this
            that.$http.get('/api/users/details').then((response) => {
                that.login(response.json()['data'])
            }, (response) => {
                that.logout()
            })
        }
    }
}
</script>