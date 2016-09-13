<template>
    <div class="row">
        <div class="col-md-6 col-md-offset-3">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">Log into your account</h3>
                </div>
                <div class="panel-body">
                    <form role="form" v-on:submit.prevent="attempt">
                        <div id="alerts" v-if="alerts.length > 0">
                            <div v-for="alert in alerts" class="alert alert-{{ alert.type }} alert-dismissible" role="alert">
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                                {{ alert.message }}
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="email">Email address</label>
                            <input type="email" class="form-control" id="email" placeholder="Email"
                                   v-model="formUser.email">
                        </div>

                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" class="form-control" id="password" placeholder="Password"
                                   v-model="formUser.password">
                        </div>

                        <button type="submit" class="btn btn-primary" :disabled="loggingIn">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                formUser: {
                    email: null,
                    password: null
                },
                alerts: [],
                loggingIn: false
            }
        },

        methods: {
            attempt () {
                var that = this
                that.loggingIn = true
                that.$http.post('http://links.app/auth/login', that.formUser).then((response) => {
                    console.log(response)
                    localStorage.setItem('jwt-token', response.body.token)
                    // that.getUserData()
                    that.$dispatch('userLoggedIn', response.body)
                    that.$route.router.go('/')
                }, (response) => {
                    console.log(response)
                    that.alerts = []
                    if (response.status === 401) {
                        that.alerts.push({
                            type: 'danger',
                            message: 'Sorry, you provided invalid credentials'
                        })
                    }
                    that.loggingIn = false
                })
            },

            // getUserData () {
            //     var that = this
            //     that.$http.get('/api/users/details').then((response) => {
            //         that.$dispatch('userLoggedIn', response.json()['data'])
            //         that.$route.router.go('/')
            //     }, (response) => {
            //         console.log(response)
            //     })
            // }
        },

        route: {
            activate (transition) {
                if (this.$root.authenticated) {
                    transition.redirect('/')
                }
                else {
                    transition.next()
                }
            }
        }
    }
</script>