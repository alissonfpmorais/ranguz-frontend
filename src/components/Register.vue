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
        <v-form ref="registerForm" class="pa-4 elevation-4 round-corner">
          <v-text-field
            v-model="name"
            :rules="validationRules.nameField"
            :disabled="isRegistering"
            label="Nome"
            prepend-icon="person"
            required
          ></v-text-field>
          <v-text-field
            v-model="cpf"
            :rules="validationRules.cpfField"
            :counter="11"
            :disabled="isRegistering"
            label="CPF"
            prepend-icon="credit_card"
            required
          ></v-text-field>
          <v-text-field
            v-model="register"
            :rules="validationRules.registerField"
            :counter="4"
            :disabled="isRegistering"
            label="Matrícula"
            prepend-icon="money"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            :append-icon="passType ? 'visibility' : 'visibility_off'"
            :append-icon-cb="() => (passType = !passType)"
            :type="passType ? 'password' : 'text'"
            :rules="validationRules.passField"
            :disabled="isRegistering"
            label="Senha"
            prepend-icon="lock"
            required
          ></v-text-field>
          <v-layout class="mt-4" row>
            <v-btn :to="loginRoute" :disabled="isRegistering" flat>Voltar</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" :loading="isRegistering" @click="attemptToRegister">Cadastrar</v-btn>
          </v-layout>
          <v-dialog v-model="dialog.status" persistent max-width="320">
            <v-card>
              <v-card-title class="headline">{{ dialog.title }}</v-card-title>
              <v-card-text>{{ dialog.message }}</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :to="dialog.route" :color="dialog.color" flat="flat" @click.native="dialog.status = false">
                  {{ dialog.button }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import xs from 'xstream'
import validationRules from '../handler/validation'
import { insertClient } from '../handler/network'

export default {
  name: 'Register',
  data () {
    return {
      name: '',
      cpf: '',
      register: '',
      password: '',
      passType: true,
      isRegistering: false,
      dialog: {
        status: false,
        title: '',
        message: '',
        button: '',
        color: '',
        route: ''
      },
      loginRoute: '/client/login',
      registerRoute: '/client/register',
      validationRules: validationRules
    }
  },
  methods: {
    async attemptToRegister () {
      if (this.$refs.registerForm.validate()) {
        this.isRegistering = true

        const clientToSave = {
          name: this.name,
          cpf: this.cpf,
          register: this.register,
          password: this.password
        }

        xs.fromPromise(insertClient(clientToSave))
          .map(clientSaved => clientSaved.cpf === clientToSave.cpf)
          .subscribe({
            next: result => {
              if (result) {
                this.dialog.title = 'Cadastrado com sucesso'
                this.dialog.message = 'Dirija-se ao refeitório com sua carterinha estudantil e finalize seu cadastro!'
                this.dialog.button = 'Ir ao Login'
                this.dialog.color = 'green darken-1'
                this.dialog.route = this.loginRoute
              } else {
                this.dialog.title = 'Problemas no cadastro'
                this.dialog.message = 'Tente novamente mais tarde!'
                this.dialog.button = 'Fechar'
                this.dialog.color = 'red darken-1'
                this.dialog.route = this.registerRoute
              }

              this.isRegistering = false
              this.dialog.status = true
            }
          })
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
