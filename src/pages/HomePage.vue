<template>
    <b-card>
        <h1>Home Page</h1>
        <hr/>
        <p>Bem-vindo (a)!</p>
        <p>Welcome!</p>
        <p>Bienvenidos!</p>
        <p>Benvenuto!</p>
        <hr/>
        <CountDown/>
        <EmptyData/>
        <Loading/>
    </b-card>
</template>

<script>
    import CountDown from "@/components/CountDown";
    import EmptyData from "@/components/EmptyData";
    import Loading from "@/components/Loading";
    export default {
        name: "HomePage",
        components: {Loading, EmptyData, CountDown},
        data() {
            return {
                files: {},
            }
        },
        methods: {
            listFiles() {
                // const assets = require.context('@/assets', true)
                // console.log(assets.keys())
                //
                // const components = require.context('@/components', true)
                // console.log(components.keys())
                //
                // const pages = require.context('@/pages', true)
                // console.log(pages.keys())
                //
                // const providers = require.context('@/providers', true)
                // console.log(providers.keys())
                //
                // const repositories = require.context('@/repositories', true)
                // console.log(repositories.keys())
                //
                // const routes = require.context('@/routes', true)
                // console.log(routes.keys())
                //
                // const storages = require.context('@/storages', true)
                // console.log(storages.keys())
                //
                // const templates = require.context('@/templates', true)
                // console.log(templates.keys())
            },
        }
    }
</script>

<style lang="scss" scoped>
</style>