<template>
  <v-container 
    grid-list-md 
    text-xs-center>
    <h2>{{ title }}</h2>
    
    <br>
    <v-expansion-panel>
      <v-expansion-panel-content 
        v-for="(project,i) in $store.state.projects" 
        :key="i" 
        class="red">
        <div 
          slot="header" 
          class="text-xs-center">
          {{ project.title }}
          <v-btn
            class="right"
            @submit.prevent="deleteProject(index)"
            @click.stop
            @click.exact="deleteProject(project, i)"
          >
          
            <v-icon dark>remove_circle</v-icon>
          </v-btn>
          <edit-component :project="project"/>
         
        </div>

        <v-card>
        
          <v-card-text class="text-xs-center red">{{ project.desc }}</v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
   
  </v-container>
</template>


  <script>
  import EditComponent from "./EditProject.vue"
  import axios from "axios";
  import { mapState } from 'vuex'


  export default {
    name:'',
   components: {
                    EditComponent
  },
    props: {
      title: {
        type: String,
        default: "title"
      }
    },
    
    data() {
      return {

        typing: false,
               
      };
    },

      computed: mapState(['projects']),

    mounted(){
      this.$store.dispatch('getAllProjects')
    },

    methods: {

      deleteProject(data) {
        axios
        .delete(this.$store.state.uri + '/' + data._id)
       .then(this.$store.commit('deleteProject', data))
        
      }
    }
    
  };
  </script>

  <style>
  .red {
    background-color: #700324 !important;
  }

  .v-btn--floating.v-btn--small {
    width: 25px;
    height: 25px;
  }

  .right {
    padding-left: px;
  }

  .fill-height {
    height: 0px !important;
  }
  .application--wrap {
    min-height: 90vh;
  }
  </style>
