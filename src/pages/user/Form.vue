<template>
    <GradientBarsRightFixTemplate :title="pageTitle">
        <SimpleForm :fields="fields"></SimpleForm>
        <hr>
        <pre>{{ user }}</pre>
        <template slot="TemplateCardRight">
            <h1>Template Right Fix</h1>
            <hr>
            <p>Role a tela para entender o comportamento</p>
        </template>
    </GradientBarsRightFixTemplate>
</template>

<script>
    import GradientBarsRightFixTemplate from "@/templates/GradientBarsCardIndexTemplate";
    import UserRepository from "@/repositories/UserRepository";
    import {mapGetters, mapActions} from 'vuex'
    import SimpleForm from "@/components/SimpleForm";

    export default {
        name: "Form",
        components: {SimpleForm, GradientBarsRightFixTemplate},
        computed: {
            ...mapGetters({
                user: 'user/current',
                isLoading: 'user/isLoading'
            }),
            pageTitle() {
                if (this.$route.params.id) return `Editar User`
                return `Criar novo User`
            }
        },
        data() {
            return {
                fields: [
                    {
                        label: 'Nome',
                        name: 'name',
                    },
                    {
                        label: 'Email',
                        name: 'email',
                        type: 'email',
                    },
                    {
                        label: 'Telefone',
                        name: 'phone',
                    },
                    {
                        label: 'Site',
                        name: 'website',
                    },
                    {
                        label: 'Condição Financeira',
                        name: 'is_rich',
                        type: 'checkbox',
                        onText: 'É Rico',
                        offText: 'É Pobre'
                    },
                ]
            }
        },
        methods: {
            ...mapActions([
                'user/listOne'
            ]),
            create() {
                UserRepository.post(this.user).then(() => {
                    this.$snotify.success(`User criado com Sucesso`)
                    this.$router.push({name: 'user.index'})
                }).catch(error => {
                    if (error.response.status === 422) {
                        UserRepository.toastValidationErrors(error, this.$snotify)
                    }
                })
            },
            update() {
                UserRepository.put(this.user.id, this.user).then(() => {
                    this.$snotify.success(`User atualizado com Sucesso`)
                    this.$router.push({name: 'user.index'})
                }).catch(error => {
                    if (error.response.status === 422) {
                        UserRepository.toastValidationErrors(error, this.$snotify)
                    }
                })
            }
        },
        async mounted() {
            this.$store.commit('user/setCurrent', {})
            if (this.$route.params.id) {
                await this['user/listOne'](this.$route.params.id)
            }
        }
    }
</script>

<style scoped>
</style>