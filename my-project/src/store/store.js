import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        projects: [
            {name:'', desc:'', author:''}
        ]
    },
    mutations: {
        getData(state, project){
            state.projects.push(project)
        }
    },
    
})