<template>
    <div class="profile">
        {{ name }}
        <picture></picture>
    </div>
</template>

<script>
    import Picture from './Picture.vue';
    export default {
        data () {
            return {
                name: "Nahuel"
            };
        },
        components: { Picture }
    }
</script>

<style>
    .profile {
        background: #eee;
        border: 1px solid #aaa;
        border-radius: 2em;
        margin: 2em auto;
        min-height: 150px;
        padding: 2em;
        width: 300px;
    }
</style>