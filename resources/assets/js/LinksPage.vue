<template>
    <div class="row">
        <div class="col-md-2">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">Sidebar</h3>
                </div>
                <div class="panel-body">
                    <ul class="nav nav-pills nav-stacked">
                        <li role="presentation" v-bind:class="{'active': filterKey === 'all'}"
                            @click="filterKey = 'all'">
                            <a>All Todo's</a>
                        </li>
                        <li role="presentation" v-bind:class="{ 'active': filterKey === 'active' }"
                            @click="filterKey = 'active'">
                            <a>Active Todo's</a>
                        </li>
                        <li role="presentation" v-bind:class="{ 'active': filterKey === 'completed' }"
                            @click="filterKey = 'completed'">
                            <a>Completed</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="col-md-7">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">Your Todo's</h3>
                </div>
                <div class="panel-body">
                    <p v-if="!hasTodos">
                        You currently have nothing Todo. Why not add something using the form on the right?
                    </p>
                    <div v-if="hasTodos">
                        <div class="row">
                            <div class="col-md-4 pull-right">
                                <input type="text" class="form-control" v-model="search" placeholder="Search Todo's" />
                            </div>
                        </div>
                        <hr />
                        <div class="row">
                            <div class="col-md-12">
                                <table v-for="category in categories" class="table table-bordered table-striped">
                                    <thead>
                                        <th>What needs doing</th>
                                        <th>Added</th>
                                        <th>Functions</th>
                                    </thead>
                                    <tbody>
                                        <!--<tr v-for="todo in todoFilter | filterBy search">
                                            <td v-if="todo.completed"><del>{{ todo.title }}</del></td>
                                            <td v-else>{{ todo.title }}</td>
                                            <td>{{ todo.created | moment "Do MMMM YYYY, h:mm:ss a" }}</td>
                                            <td>
                                                <button class="btn btn-xs btn-primary" @click="toggleCompleted(todo)">
                                                    <span class="glyphicon glyphicon-ok"></span>
                                                </button>
                                                <button class="btn btn-xs btn-danger" @click="deleteTodo(todo)">
                                                    <span class="glyphicon glyphicon-trash"></span>
                                                </button>
                                            </td>
                                        </tr>-->
                                        <tr v-for="link in category.links.data">
                                            <td>{{ link.title }}</td>
                                            <td>{{ link.url }}</td>
                                            <td>
                                                <button class="btn btn-xs btn-primary" @click="toggleCompleted(link)">
                                                    <span class="glyphicon glyphicon-ok"></span>
                                                </button>
                                                <button class="btn btn-xs btn-danger" @click="deleteTodo(link)">
                                                    <span class="glyphicon glyphicon-trash"></span>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">New Todo</h3>
                </div>
                <div class="panel-body">
                    <form role="form" v-on:submit="attempt">
                        <div class="form-group">
                            <label for="text">What do you need to remember?</label>
                            <input type="text" class="form-control" id="text" v-model="newTodo.title" />
                        </div>

                        <button type="submit" class="btn btn-primary" :disabled="adding">
                            Add new todo
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
                todos: null,
                search: "",
                filterKey: 'all',
                newTodo: {
                    title: ''
                },
                adding: false,
                categories: null
            }
        },

        methods: {
            attempt (e) {
                // e.preventDefault()
                // var that = this
                // that.adding = true
                // that.$http.post('/api/todo/new', this.newTodo).then((response) => {
                //     that.getTodos()
                //     that.newTodo.title = ''
                //     that.adding = false
                // }, (response) => {
                //     that.adding = false
                // })
            },

            getTodos () {
                // var that = this
                // that.$http.get('/api/todos').then((response) => {
                //     that.todos = response.json()['data']
                // }, (response) => {
                //     console.log(response)
                // })

                var that = this
                that.$http.get('http://links.app/user/categories?include=links').then((response) => {
                    console.log(response)
                    that.categories = response.body.data
                }, (response) => {
                    console.log(response)
                })
            },

            toggleCompleted (todo) {
                // var that = this
                // that.$http.put('/api/todo/toggleCompleted', todo).then((response) => {
                //     that.getTodos()
                // }, (response) => {
                //     console.log(response)
                // })
            },

            deleteTodo (todo) {
                // var that = this
                // that.$http.post('/api/todo', todo).then((response) => {
                //     that.todos.$remove(todo)
                // }, (response) => {
                //     console.log(response)
                // })
            }
        },

        computed: {
            hasTodos () {
                // if (this.todos === null || this.todos.length === 0) {
                //     return false
                // }
                // else {
                    return true
                // }
            },

            todoFilter () {
                return this[this.filterKey]
            },

            all () {
                return this.todos
            },

            active () {
                return this.todos.filter((todo) => {
                    return !todo.completed
                })
            },

            completed () {
                return this.todos.filter((todo) => {
                    return todo.completed
                })
            }
        },

        ready () {
            this.getTodos()
        },

        route: {
            activate (transition) {
                if (!this.$root.authenticated) {
                    transition.redirect('/')
                }
                else {
                    transition.next();
                }
            }
        }
    }
</script>
