
<template>
  <v-app 
    id="inspire" 
    dark>
    <v-navigation-drawer 
      v-model="drawer" 
      clipped 
      fixed 
      app>
      <v-list dense>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Projects</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Settings</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar 
      app 
      fixed 
      clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"/>
      <v-toolbar-title>Portofolio</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <show-details title="Projects Overview"/>
     
      <form-component/>
      <v-container 
        fluid 
        fill-height>
        <v-layout 
          justify-center 
          align-center/>
      </v-container>
    </v-content>

    <v-footer 
      app 
      fixed/>
  </v-app>
</template>

<script>
/*eslint-disable*/

import ShowDetails from "./ShowDetails.vue";

import FormComponent from "./Form.vue";
import EditComponent from "./EditProject.vue"

export default {
  data: () => ({
    drawer: false
  }),
  props: {
    source: String
  },
  components: {
    ShowDetails,
    EditComponent,
    FormComponent
  },
   mounted: function() {
    this.$store.dispatch("getAllProjects");
  }
};
</script>
