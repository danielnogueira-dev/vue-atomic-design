<template>
    <div>
        <div class="row ml-3 mr-3">
            <div class="col-md-10">
                <slot name="table-data-filters">
                    <b-form v-if="(!disableFilters && filters.length > 0) || (!disableFilters && items.length > 0)"
                            class="row" inline>
                        <b-input-group v-for="(filter, i) in filters" :key="i" class="filter-input-group col-md-3 col-sm-6 mb-3">
                            <b-form-select :options="fields_filter_local" v-model="filter.key"/>
                            <b-input v-model="filter.value" id="inline-form-input-name"
                                     :placeholder="$t('components.table_data.valor')"/>
                            <b-input-group-append>
                                <b-btn variant="input"
                                       class="text-danger bg-white"
                                       @click="evt => {filters = filters.filter(f => f.index !== filter.index);
                                           filters.length === 0 ? filtrar(evt) : null;}">
                                    <i class="fa fa-times"/></b-btn>
                            </b-input-group-append>
                        </b-input-group>
                        <b-button v-if="filters.length === 0" variant="outline-dark" class="ml-2 mb-3 border-0"
                                  @click="addFilter" pill>Filtros<i class="fa fa-plus ml-2"/>
                        </b-button>
                        <div v-else class="ml-2 mb-3">
                            <b-button variant="outline-dark" class="border-0" @click="addFilter" pill>
                                <i class="fa fa-plus"/>
                            </b-button>
                            <b-button variant="outline-primary" class="border-0" @click="filtrar" pill>
                                <i class="fa fa-search"/>
                            </b-button>
                        </div>
                    </b-form>
                </slot>
            </div>
            <b-dropdown
                    v-if="items.length > 0"
                    :text="$t('components.table_data.gerenciar_colunas')"
                    class="col-md-2"
                    block
                    variant="link"
                    no-caret>
                <b-dropdown-form>
                    <b-form-checkbox v-model="allSelected" @change="toggleAll">
                        {{ allSelected ? $t('components.table_data.desmarcar_todas') :
                        $t('components.table_data.selecionar_todas') }}
                    </b-form-checkbox>
                    <b-form-checkbox-group v-model="selected" :options="fields_checkbox" stacked/>
                </b-dropdown-form>
            </b-dropdown>
        </div>
        <TableSimple
                :items="items"
                :loading="loading"
                :selectable="selectable"
                :paginator="paginator"
                :fields="fieldsToShow"
                :text-empty="textEmpty"
                :route-new="routeNew"
                :text-new="textNew"
                @select="evt => $emit('select', evt)"
                @list="filtrar"
        >
            <template v-for="slotName in Object.keys($scopedSlots)" v-slot:[slotName]="slotScope">
                <slot :name="slotName" v-bind="slotScope"/>
            </template>
        </TableSimple>
    </div>
</template>

<script>
    import TableSimple from "@/components/TableSimple";

    export default {
        name: "TableData",
        components: {TableSimple},
        props: {
            fields: {
                type: Array,
                default: () => []
            },
            fieldsFilter: {
                type: Array,
                default: () => []
            },
            initial: {
                type: Array,
                default: () => []
            },
            disableFilters: {
                type: Boolean,
                default: false
            },

            /* Props TableSimple */
            textEmpty: {
                type: String
            },
            items: {
                type: Array
            },
            loading: {
                type: Boolean
            },
            selectable: {
                type: Boolean
            },
            paginator: {
                type: Object
            },
            routeNew: {
                type: String
            },
            textNew: {
                type: String
            }
            /* END Props TableSimple */
        },
        computed: {
            fieldsToShow() {
                if (this.selected.length === 0) {
                    return this.fields.filter(field => {
                        return this.initial_local.includes(field.key)
                    })
                }
                return this.fields.filter(field => {
                    return this.selected.includes(field.key)
                })
            }
        },
        data() {
            return {
                selected: [],
                fields_filter_local: [],
                fields_checkbox: [],
                initial_local: [],
                allSelected: false,
                filters: []
            }
        },
        methods: {
            addFilter() {
                let index = 0
                if (this.filters.length > 0) {
                    const value = this.filters.reduce((prev, current) => {
                        return (prev.index > current.index) ? prev.index : current.index
                    })

                    if (Object.keys(value).length > 0) {
                        index = parseInt(value.index) + 1
                    } else {
                        index = parseInt(value) + 1
                    }
                }

                this.filters = [...this.filters, {
                    index,
                    key: '',
                    value: ''
                }]
            },
            toggleAll(checked) {
                this.selected = checked ?
                    this.fields_checkbox.map(f => {
                        return f.value
                    }).slice() :
                    this.initial_local
            },
            filtrar(evt) {
                let evento = {}
                if (evt.page && evt.per_page){
                    evento = {...evento, ...evt}
                }else{
                    evento = {
                        ...evento,
                        page: this.paginator.page,
                        per_page: this.paginator.per_page
                    }
                }

                if (this.filters.length > 0) {
                    let filters_list = []
                    this.filters.map(f => {
                        let condition = 'LIKE'
                        let value = "%" + f.value + "%"
                        filters_list = [...filters_list, [f.key, condition, value]]
                    })
                    evento = {...evento, filters: filters_list}
                }
                this.$emit('list', evento)
            }
        },
        mounted() {
            this.initial_local = this.initial
            this.selected = this.initial_local
            this.fields_checkbox = this.fields
                .map(f => {
                    return {
                        text: f.label,
                        value: f.key
                    }
                })

            this.fields_filter_local = this.fields_checkbox.filter(f => f.value !== 'status' && f.value !== 'id')
            if (this.fieldsFilter.length > 0) {
                this.fields_filter_local = this.fieldsFilter
                    .map(f => {
                        return {
                            text: f.label,
                            value: f.key
                        }
                    })
            }

            if (this.initial_local.length === 0){
                this.allSelected = true
                this.initial_local = [this.fields[0].key]
                this.selected = this.fields.map(f => {return f.key})
            }
        }
    }
</script>

<style lang="scss" scoped>
    .filter-input-group {
        & > .custom-select {
            border-right: transparent;
        }

        & > .form-control {
            border-left: transparent;
            border-right: transparent;
        }

        & > .input-group-append > .btn-input {
            border: 1px solid #d1d3e2;
            border-left: transparent !important;
        }
    }

    /deep/ .dropdown-menu {
        transform: initial !important;
    }

    table#table-transition-example .flip-list-move {
        transition: transform 1s;
    }
</style>