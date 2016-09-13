<template>
    <nav class="navbar navbar-default navbar-fixed-top">
        <div class="container-fluid">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#">Vue-Todo-Series</a>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <li v-link-active>
                        <a v-link="{path: '/', exact: true, activeClass: 'active'}">Home</a>
                    </li>
                    <li v-link-active v-if="loggedIn">
    <a v-link="{path: '/links', exact: true, activeClass: 'active'}">Links</a>
</li>
                </ul>

                <ul class="nav navbar-nav navbar-right" v-if="!loggedIn">
    <li v-link-active>
        <a v-link="{path: '/auth/login', exact: true, activeClass: 'active'}">Login</a>
    </li>
    <li v-link-active>
        <a v-link="{path: '/auth/register', exact: true, activeClass: 'active'}">Register</a>
    </li>
</ul>

<ul class="nav navbar-nav navbar-right" v-if="loggedIn">
    <li><a v-link="{path: '/auth/logout'}">Logout</a></li>
</ul>
            </div><!-- /.navbar-collapse -->
        </div><!-- /.container-fluid -->
    </nav>
</template>

<script>
    export default {
        computed: {
            loggedIn () {
                return this.$root.authenticated
            }
        }
    }
</script>