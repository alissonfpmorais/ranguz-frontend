<template>
  <v-app>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      disable-resize-watcher
      temporary
      fixed
      app
    >
      <v-list>
        <v-list-tile value="true" v-for="(item, i) in items" :key="i" :to="item.route">
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app :clipped-left="clipped">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <!-- <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn> -->
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn v-show="isLogged" flat @click="logout">Logout</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view :key="$route.fullPath" @isLoggedIn="login"/>
    </v-content>
    <!-- <v-footer :fixed="fixed" app>
      <span>&copy; 2017</span>
    </v-footer> -->
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        { icon: 'shopping_basket', title: 'Pedidos', route: '/' },
        { icon: 'person', title: 'Usuário', route: '/login' }
      ],
      miniVariant: false,
      isLogged: false,
      title: 'Ranguz',
      loginRoute: '/login'
    }
  },
  methods: {
    getCredentials () {
      return JSON.parse(localStorage.getItem('credentials'))
    },
    login () {
      if (this.getCredentials()) this.isLogged = true
    },
    logout () {
      if (this.getCredentials()) {
        const path = this.$router.history.current.path
        this.isLogged = false
        localStorage.clear()
        if (path === '/client/shopping' || path === '/admin/store') this.$router.push(this.loginRoute)
      }
    }
  },
  mounted: function () {
    this.login()
  }
}
</script>
