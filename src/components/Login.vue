<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm9 md9 lg5 xl5 text-xs-center text-sm-center text-md-center text-lg-center text-xl-center>
        <v-form ref="loginForm" class="pa-4 elevation-4 round-corner">
          <v-text-field
            v-model="login"
            :rules="userType === 'admin' ? validationRules.nameField : validationRules.cpfField"
            :counter="userType === 'admin' ? false : 11"
            :disabled="isLogging"
            :label="userType === 'admin' ? 'Username' : 'CPF'"
            :prepend-icon="userType === 'admin' ? 'person' : 'credit_card'"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            :append-icon="passType ? 'visibility' : 'visibility_off'"
            :append-icon-cb="() => (passType = !passType)"
            :type="passType ? 'password' : 'text'"
            :rules="validationRules.passField"
            :disabled="isLogging"
            label="Senha"
            prepend-icon="lock"
            required
          ></v-text-field>
          <v-switch class="mt-3" color="primary" label="Logar como Adminnistrador" v-model="isAdmin" @click="changeUserType"></v-switch>
          <v-layout class="mt-3" row>
            <v-btn v-if="userType !== 'admin'" :to="registerRoute" :disabled="isLogging" flat>Cadastrar</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" :loading="isLogging" @click="attemptToLogin">Login</v-btn>
          </v-layout>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import xs from 'xstream'
  import validationRules from '../handler/validation'
  import { authAdmin, authClient } from '../handler/network'

  export default {
    name: 'Login',
    data () {
      return {
        login: '',
        password: '',
        passType: true,
        isAdmin: false,
        isLogging: false,
        userType: 'client', // just 'client' or 'admin'
        registerRoute: '/client/register',
        shoppingRoute: '/client/shopping',
        storeRoute: '/admin/store',
        validationRules: validationRules
      }
    },
    methods: {
      changeUserType () {
        if (!this.isAdmin) this.userType = 'admin'
        else this.userType = 'client'

        this.$refs.loginForm.reset()
      },
      async attemptToLogin () {
        if (this.$refs.loginForm.validate()) {
          this.isLogging = true

          const loginParams = this.getLoginParams(this.userType, this.login, this.password, this.storeRoute, this.shoppingRoute)
          const authMethod = loginParams.authMethod
          const userToAuth = loginParams.userToAuth
          const nextRoute = loginParams.nextRoute
          xs.fromPromise(authMethod(userToAuth))
            .subscribe({
              next: auth => this.accomplishLogin(this.userType, auth, nextRoute),
              error: () => {
                this.isLogging = false
              }
            })
        }
      },
      getCredentials () {
        return JSON.parse(localStorage.getItem('credentials'))
      },
      getLoginParams (userType, login, password, adminRoute, clientRoute) {
        let loginParams = { }
        if (userType === 'admin') {
          loginParams.authMethod = authAdmin
          loginParams.userToAuth = { username: login, password: password }
          loginParams.nextRoute = adminRoute
        } else {
          loginParams.authMethod = authClient
          loginParams.userToAuth = { cpf: login, password: password }
          loginParams.nextRoute = clientRoute
        }

        return loginParams
      },
      accomplishLogin (userType, auth, route) {
        const user = { userType, auth, route }
        this.isLogging = false
        if (auth.token) {
          localStorage.setItem('credentials', JSON.stringify(user))
          this.$emit('isLoggedIn')
          this.$router.push(route)
        }
      }
    },
    mounted: function () {
      const credentials = this.getCredentials()

      if (credentials) {
        if (credentials.userType === 'admin') this.$router.push(this.storeRoute)
        else this.$router.push(this.shoppingRoute)
      }
    }
  }
</script>

<style scoped>
.round-corner {
  border-radius: 1em;
}
</style>

