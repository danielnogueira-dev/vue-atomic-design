<template>
    <b-form @submit="onSubmit">
        {{form}}
        <slot v-for="field in fields" :name="`field(${field})`"> <!-- v-bind="slotScope" -->
            <b-form-group :label="field.label" :description="field.description || ``">
                <b-form-checkbox v-if="field.type === 'checkbox'"
                                 :id="`input-${field.name}`"
                                 :name="field.name"
                                 v-model="form[field.name]"
                                 @change="form[field.name]"
                                 switch>
<!--                    <span v-if="form[field.name]">{{ field.onText || `Habilitado` }}</span>-->
<!--                    <span v-else>{{ field.offText || `Desabilitado` }}</span>-->
                </b-form-checkbox>
                <b-form-input v-else
                              :id="`input-${field.name}`"
                              :name="field.name"
                              :type="field.type || 'text'"
                              v-model="form[field.name]"/>
            </b-form-group>
        </slot>
        <slot name="submitButton">
            <b-button variant="success" type="submit" block>Enviar</b-button>
        </slot>
    </b-form>
</template>

<script>
    export default {
        name: "SimpleForm",
        props: {
            fields: {
                type: Array,
                default: () => []
            }
        },
        computed: {

        },
        data() {
            return {
                form: {}
            }
        },
        methods: {
            loadFields() {
                this.form = {}
                this.fields.map(field => {
                    let value = ''
                    if (field.type && field.type === 'checkbox') {
                        value = false
                    }
                    this.form[field.name] = value
                })
                console.log(this.form)
            },
            onSubmit(evt) {
                evt.preventDefault()
                // console.log(evt)
                console.log(this.form)
            }
        },
        mounted() {
            this.loadFields()
        }
    }
</script>

<style scoped>

</style>