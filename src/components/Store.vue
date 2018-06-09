<template>
  <v-container fluid fill-height>
    <v-layout column>
      <v-form ref="storeForm" class="mb-4 pa-4 elevation-4 round-corner">
        <v-text-field
          v-model="name"
          :rules="validationRules.productNameField"
          :disabled="isRegistering"
          :error="isNameError"
          label="Nome"
          prepend-icon="local_offer"
          required
        ></v-text-field>
        <v-text-field
          v-model="value"
          :rules="validationRules.valueField"
          :disabled="isRegistering"
          :error="isValueError"
          label="Valor"
          prepend-icon="attach_money"
          required
        ></v-text-field>
        <v-layout class="mt-4" row>
          <v-spacer></v-spacer>
          <v-btn :to="loginRoute" :disabled="isRegistering" flat>Voltar</v-btn>
          <v-btn color="primary" :loading="isRegistering" @click="attemptToRegister">Salvar</v-btn>
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
      <v-list class="elevation-4">
        <v-subheader class="primary white--text">Listagem de produtos</v-subheader>
        <v-list-tile v-for="(product, i) in products" :key="product.name" class="py-3">
          <v-list-tile-content class="pl-4">
            <v-list-tile-title>{{ product.name }}</v-list-tile-title>
            <v-list-tile-sub-title>R$ {{ product.value }}</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-layout row align-center>
              <v-btn icon color="primary" @click="removeProduct(product.id)">
                <v-icon>delete</v-icon>
              </v-btn>
            </v-layout>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-layout>
  </v-container>
</template>

<script>
  import xs from 'xstream'
  import validationRules from '../handler/validation'
  import { insertProduct, getProducts, deleteProduct } from '../handler/network'

  export default {
    name: 'Register',
    data () {
      return {
        products: [],
        name: '',
        value: '',
        isNameError: false,
        isValueError: false,
        dialog: {
          status: false,
          title: '',
          message: '',
          button: '',
          color: '',
          route: ''
        },
        isRegistering: false,
        loginRoute: '/login',
        validationRules: validationRules
      }
    },
    methods: {
      getCredentials () {
        return JSON.parse(localStorage.getItem('credentials'))
      },
      async updateProducts () {
        xs.fromPromise(getProducts())
          .map(products => {
            return products.map(product => {
              product.value = parseFloat(product.value).toFixed(2)
              return product
            })
          })
          .subscribe({
            next: products => { this.products = products }
          })
      },
      async attemptToRegister () {
        if (this.$refs.storeForm.validate()) {
          const credentials = this.getCredentials()

          if (credentials) {
            if (credentials.auth !== null) {
              this.isRegistering = true

              const productToSave = {
                name: this.name,
                value: parseFloat(this.value).toFixed(2)
              }

              xs.fromPromise(insertProduct(credentials.auth.token, productToSave))
                .subscribe({
                  next: productSaved => {
                    if (productSaved.name === productToSave.name) {
                      this.dialog.title = 'Cadastrado com sucesso'
                      this.dialog.message = 'Produto cadastrado com sucesso!'
                      this.dialog.button = 'Fechar'
                      this.dialog.color = 'green darken-1'

                      this.name = ''
                      this.value = ''
                      this.$refs.storeForm.reset()

                      productSaved.value = parseFloat(productSaved.value).toFixed(2)

                      this.products.push(productSaved)
                    } else {
                      this.dialog.title = 'Problemas no cadastro'
                      this.dialog.message = 'Tente novamente mais tarde!'
                      this.dialog.button = 'Fechar'
                      this.dialog.color = 'red darken-1'
                    }

                    this.isRegistering = false
                    this.dialog.status = true
                  }
                })
            }
          }
        }
      },
      async removeProduct (id) {
        const credentials = this.getCredentials()

        if (credentials) {
          if (credentials.auth !== null) {
            xs.fromPromise(deleteProduct(credentials.auth.token, id))
              .subscribe({
                next: result => {
                  if (result) {
                    this.products = this.products.filter(product => product.id !== id)
                  }
                }
              })
          }
        }
      }
    },
    mounted: function () {
      const credentials = this.getCredentials()

      if (credentials != null) {
        if (credentials.userType != null) {
          if (credentials.userType !== 'admin') this.$router.push(this.loginRoute)
        } else {
          this.$router.push(this.loginRoute)
        }
      } else {
        this.$router.push(this.loginRoute)
      }
    },
    created: function () {
      this.updateProducts()
    }
  }
</script>

<style scoped>
.round-corner {
  border-radius: 1em;
}
</style>
