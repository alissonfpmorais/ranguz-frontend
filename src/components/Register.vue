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
            :rules="formRules.nameField"
            :disabled="isRegistering"
            label="Nome"
            prepend-icon="person"
            required
          ></v-text-field>
          <v-text-field
            v-model="cpf"
            :rules="formRules.cpfField"
            :counter="11"
            :disabled="isRegistering"
            label="CPF"
            prepend-icon="person"
            required
          ></v-text-field>
          <v-text-field
            v-model="register"
            :rules="formRules.registerField"
            :counter="4"
            :disabled="isRegistering"
            label="Matrícula"
            prepend-icon="person"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            :append-icon="passType ? 'visibility' : 'visibility_off'"
            :append-icon-cb="() => (passType = !passType)"
            :type="passType ? 'password' : 'text'"
            :rules="formRules.passField"
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
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import xs from 'xstream'
import { insertClient } from '../handler/network'

export default {
  data () {
    return {
      name: '',
      cpf: '',
      register: '',
      password: '',
      passType: true,
      isRegistering: false,
      loginRoute: '/client/login',
      formRules: {
        nameField: [
          input => /^[a-zA-Z]{3,}$/.test(input) || 'O nome deve conter apenas letras'
        ],
        cpfField: [
          input => /^[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}-?[0-9]{2}$/.test(input) || 'CPF Inválido'
        ],
        registerField: [
          input => /^\d{4}$/.test(input) || 'A matrícula deve conter 4 dígitos'
        ],
        passField: [
          input => /^\d{4,}$/.test(input) || 'A senha deve conter pelo menos 4 dígitos'
        ]
      }
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
              if (result) console.log('usuário cadastrado')
              else console.log('problemas durante o cadastro')
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
