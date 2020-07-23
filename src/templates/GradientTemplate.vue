<template>
    <div>
        <div class="pb-10 bg-yellow-gradient text-white" v-if="!hideGradient">
            <div class="container-fluid d-flex align-items-center justify-content-between">
                <div class="pt-2 d-flex">
                    <i :class="`fas fa-2x m-2 ${icon}`"/>
                    <h1>{{ title }}</h1>
                </div>
                <slot name="TemplateAfter"/>
            </div>
            <div class="ml-5 mb-3">{{ subtitle }}</div>
        </div>

        <div class="m-3 mt-n10">
            <slot/>
            <router-view></router-view>
        </div>

        <slot name="TemplateAfter"/>
    </div>
</template>

<script>
    export default {
        name: "GradientTemplate",
        props: {
            title: {
                type: String,
                default: ''
            },
            icon: {
                type: String,
                default: 'fa-table'
            },
            subtitle: {
                type: String,
                default: ''
            },
            hideGradient: {
                type: Boolean,
                default: false
            }
        }
    }
</script>

<style lang="scss" scoped>
    .bg-yellow-gradient {
        background-color: #f9b112;
        background-image: linear-gradient(135deg, #f9b112 0%, rgba(255, 255, 255, 0.8) 100%);
    }

    .pb-10, .py-10 {
        padding-bottom: 6rem !important;
    }

    .mt-n10, .my-n10 {
        margin-top: -6rem !important;
    }

    .mt-n5, .my-n5 {
        padding: -3rem !important;
    }
</style>