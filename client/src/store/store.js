import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    uri:"http://amycmgt.tk/projects",
    projects: []
  },
  actions: {
    getAllProjects: function({ commit }) {
      axios.get(this.state.uri).then(
        response => {
          commit("setAllPRojects", { list: response.data.items });
         
        },
        err => {
          console.log("error:" + err);
        }
      );
    }
   
    
  },
  mutations: {
    setAllPRojects: (state, { list }) => {
      state.projects = list;
    },
    addProject: (state, data) => {
      console.log(data)
      state.projects.push(data)
    },
    editProject: (state, [oldData, newData]) => {
      const result = state.projects.find( projects => projects.title === oldData.title );
      result.title = newData.title,
      result.author = newData.author,
      result.desc = newData.desc
    },
    deleteProject: (state, data) => {

      let pos = state.projects.map(function(e) { return e._id; }).indexOf(data._id);
      console.log(pos)
      state.projects.splice(pos, 1)
    }
  },
  getters: {
    showProjects: state => {
      return state.projects;
    }
  }
});
export default store;
