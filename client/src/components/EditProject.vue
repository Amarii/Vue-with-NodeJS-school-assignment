<template 
  text-xs-center 
  dark>
  <v-dialog 
    v-model="dialog" 
    width="500">
    <v-btn 
      fab 
      dark 
      color="pink" 
      class="right">
      <v-icon dark>add</v-icon>
    </v-btn>
 
    
    <v-btn 
      slot="activator" 
      color="dark" 
      dark 
      class="right">
    
      <v-icon dark>edit</v-icon>
    </v-btn>

    <v-card dark>
      <v-card-title 
        primary-title 
        text-xs-center 
        dark>Edit Project</v-card-title>

      <v-card-text>
        <v-form v-model="valid">
          <v-text-field 
            v-model="name" 
            :placeholder="project.title"
            color="pink" 
            
            label="Name" 
            
            required/>
          <v-text-field 
            v-model="desc" 
            :placeholder="project.desc"

            color="pink" 
            label="Description" 
            required/>
          <v-text-field 
            v-model="author" 
            :placeholder="project.author"

            color="pink" 
            label="Author" 
            required/>
        </v-form>
      </v-card-text>

      <v-divider/>

      <v-card-actions>
        <v-spacer/>
        <v-btn 
          color="pink" 
          flat 
          @click="editProject(project)">I accept</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
let axiosConfig = {
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*"
  }
};
export default {
  props: {
    project: {
    
      type:Object,
      default: function(){return 'blablabla'}
    }
  },

  
  data() {
    return {
      name: "",
      desc: "",
      author: "",
      oldData: {},
      newData: {},
      dialog: false,
      valid: true,
      uri: "http://amycmgt.tk/projects/",
      projects: [],
      typing: true,
            editProject(data) {
              this.oldData = data
        axios
        .put(this.$store.state.uri + '/' + data._id, {
          title: this.name,
          desc: this.desc,
          author: this.author}).then(res => {
             this.dialog = false,
             this.newData = res.data
             this.$store.commit('editProject', [this.oldData, this.newData])
          })
        
       
      }
    };
 
 
  },
  beforeMount() {
    // this.postProjects()
  },

  methods: {
           
    postProjects() {
      axios
        .post(this.uri, {
          title: this.name,
          desc: this.desc,
          author: this.author
        })
        .then(res => {
         console.log(res.data)
          this.$store.commit('addProject', res.data)
          this.dialog = false
       
        })
        
    }},

    
  
};
</script>

<style>
</style>
