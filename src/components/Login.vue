<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm9 md9 lg5 xl5 text-xs-center text-sm-center text-md-center text-lg-center text-xl-center>
        <v-form ref="loginForm" class="pa-4 elevation-4 round-corner">
          <v-text-field
            v-model="cpf"
            :rules="validationRules.cpfField"
            :counter="11"
            :disabled="isLogging"
            label="CPF"
            prepend-icon="credit_card"
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
          <v-layout class="mt-4" row>
            <v-btn :to="registerRoute" :disabled="isLogging" flat>Cadastrar</v-btn>
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
    data () {
      return {
        cpf: '',
        password: '',
        passType: true,
        isLogging: false,
        registerRoute: '/client/register',
        shoppingRoute: '/client/shopping',
        validationRules: validationRules
      }
    },
    methods: {
      async attemptToLogin () {
        if (this.$refs.loginForm.validate()) {
          this.isLogging = true
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
                  this.$router.push(this.shoppingRoute)
                }
              },
              error: () => {
                this.isLogging = false
                console.log('error')
              }
            })
        }
      }
    },
    mounted: function () {
      if (localStorage.getItem('credentials')) this.$router.push(this.shoppingRoute)
    }
  }
</script>

<style scoped>
.round-corner {
  border-radius: 1em;
}
</style>

