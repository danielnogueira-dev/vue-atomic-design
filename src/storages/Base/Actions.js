export class ActionsClass {
    constructor(repository) {
        this.$repository = repository
    }

    classToObject() {
        const originalClass = this
        const keys = Object.getOwnPropertyNames(originalClass)
        return keys.reduce((classAsObj, key) => {
            //Não mapeia o Repositório
            if (key !== '$repository') {
                classAsObj[key] = originalClass[key]
            }
            return classAsObj
        }, {})
    }

    listAll = async ({commit}, params) => {
        commit('setLoading', true)
        await this.$repository.fetchAll(params).then(response => {
            commit('setAll', response.data)
        })
        commit('setLoading', false)
    }

    listAllPaginated = async ({commit}, params) => {
        commit('setLoading', true)
        await this.$repository.fetchAll(params).then(response => {
            commit('setAll', response.data.data)
            commit('setPagination', response.data)
        })
        commit('setLoading', false)
    }

    search = async ({ commit, state }, params) => {
        commit('setLoading', true)
        await this.$repository.fetchAll(params).then(response => {
            if (response.data.data.length > 0){
                const array = response.data.data
                commit('setAll', Object.values([...state.list, ...array].reduce((acc,cur)=>Object.assign(acc,{[cur.id]:cur}),{})))
            }
        })
        commit('setLoading', false)
    }

    listOne = async ({commit}, id) => {
        commit('setLoading', true)
        await this.$repository.fetch(id).then(response => {
            commit('setCurrent', response.data)
        })
        commit('setLoading', false)
    }
}

export default function makeActions(Repository) {
    const ActionsObj = new ActionsClass(Repository)
    return ActionsObj.classToObject()
}