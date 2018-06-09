<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm9 md9 lg5 xl5 text-xs-center text-sm-center text-md-center text-lg-center text-xl-center>
        <v-form ref="loginForm" class="pa-4 elevation-4 round-corner">
          <v-text-field
            v-model="cpf"
            :rules="loginType === 'admin' ? validationRules.nameField : validationRules.cpfField"
            :counter="loginType === 'admin' ? false : 11"
            :disabled="isLogging"
            :label="loginType === 'admin' ? 'Username' : 'CPF'"
            :prepend-icon="loginType === 'admin' ? 'person' : 'credit_card'"
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
          <v-switch color="primary" label="Admin" v-model="type"></v-switch>
          <v-layout class="mt-3" row>
            <v-btn v-if="loginType !== 'admin'" :to="registerRoute" :disabled="isLogging" flat>Cadastrar</v-btn>
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
  import { authClient } from '../handler/network'

  export default {
    name: 'Login',
    props: {
      loginType: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        cpf: '',
        password: '',
        passType: true,
        isLogging: false,
        type: false,
        registerRoute: '/client/register',
        shoppingRoute: '/client/shopping',
        storeRoute: '/admin/store',
        validationRules: validationRules
      }
    },
    methods: {
      async attemptToLogin () {
        if (this.$refs.loginForm.validate()) {
          this.isLogging = true

          if (this.loginType === 'admin') this.attemptToLoginAdmin()
          else this.attemptToLoginClient()
        }
      },
      async attemptToLoginAdmin () {
        const clientToAuth = {
          cpf: this.cpf,
          password: this.password
        }

        xs.fromPromise(authClient(clientToAuth))
          .subscribe({
            next: auth => {
              this.isLogging = false
              console.log('auth')
              if (auth.token) {
                localStorage.setItem('credentials', JSON.stringify(auth))
                this.$emit('isLoggedIn')
                this.$router.push(this.storeRoute)
              }
            },
            error: () => {
              this.isLogging = false
              console.log('error')
            }
          })
      },
      async attemptToLoginClient () {
        const clientToAuth = {
          cpf: this.cpf,
          password: this.password
        }

        xs.fromPromise(authClient(clientToAuth))
          .subscribe({
            next: auth => {
              this.isLogging = false
              console.log('auth')
              if (auth.token) {
                /* const user = JSON.stringify(auth)
                const credentials = { loginType, user } */
                const credentials = JSON.stringify(auth)
                localStorage.setItem('credentials', credentials)
                this.$emit('isLoggedIn')
                this.$router.push(this.shoppingRoute)
              }
            },
            error: () => {
              this.isLogging = false
              console.log('error')
            }
          })
      }
    },
    mounted: function () {
      if (localStorage.getItem('credentials')) {
        if (this.loginType === 'admin') this.$router.push(this.storeRoute)
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

