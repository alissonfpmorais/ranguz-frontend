<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm9 md9 lg5 xl5
        text-xs-center
        text-sm-center
        text-md-center
        text-lg-center
        text-xl-center
      >
        <v-form ref="loginForm" class="pa-4 elevation-4 round-corner">
          <v-text-field
            v-model="cpf"
            :rules="formRules.cpfField"
            :counter="11"
            :disabled="isLogging"
            label="CPF"
            prepend-icon="person"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            :append-icon="passType ? 'visibility' : 'visibility_off'"
            :append-icon-cb="() => (passType = !passType)"
            :type="passType ? 'password' : 'text'"
            :rules="formRules.passField"
            :disabled="isLogging"
            label="Senha"
            prepend-icon="lock"
            required
          ></v-text-field>
          <v-layout class="mt-4" row>
            <v-btn :to="registerRoute" :disabled="isLogging" @click="createAccount" flat>Cadastrar</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" :loading="isLogging" @click="attemptToLogin">Login</v-btn>
          </v-layout>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        cpf: '',
        password: '',
        passType: true,
        isLogging: false,
        registerRoute: '/client/register',
        formRules: {
          cpfField: [
            input => /^[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}-?[0-9]{2}$/.test(input) || 'CPF Inválido'
          ],
          passField: [
            input => /^[0-9]{4,}$/.test(input) || 'Digite mais coisa porra!'
          ]
        }
      }
    },
    methods: {
      attemptToLogin () {
        if (this.$refs.loginForm.validate()) {
          this.isLogging = true
        }
      }
    }
  }
</script>

<style scoped>
.round-corner {
  border-radius: 1em;
}
</style>

