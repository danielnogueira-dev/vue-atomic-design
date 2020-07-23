<template>
    <div>
        <TopBar/>
        <router-view></router-view>
    </div>
</template>

<script>
    import TopBar from "@/components/TopBar";

    export default {
        name: "SimpleTemplate",
        components: {TopBar}
    }
</script>

<style lang="scss" scoped>
</style>