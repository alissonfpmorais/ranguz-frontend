<template>
  <v-container fluid>
    <v-layout column>
      <v-list class="elevation-4">
        <v-subheader class="primary white--text">Listagem de produtos</v-subheader>
        <div class="px-4">
          <v-list-tile v-for="(product, i) in products" :key="product.name" class="py-3">
            <v-list-tile-content>
              <v-list-tile-title>{{ product.name }}</v-list-tile-title>
              <v-list-tile-sub-title>R$ {{ product.value }}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-layout row align-center>
                <v-btn outline icon color="primary" :disabled="isRegistering" @click="updateQuantity(i, product.quantity, -1)">
                  <v-icon>exposure_neg_1</v-icon>
                </v-btn>
                <p
                  class="ma-0 px-5 text-xs-center text-sm-center text-md-center text-lg-center text-xl-center"
                  disabled> {{ product.quantity }}
                </p>
                <v-btn outline icon color="primary" :disabled="isRegistering" @click="updateQuantity(i, product.quantity, 1)">
                  <v-icon>exposure_plus_1</v-icon>
                </v-btn>
              </v-layout>
            </v-list-tile-action>
          </v-list-tile>
          <v-divider></v-divider>
          <v-subheader class="py-5">
            <v-spacer></v-spacer>
            <v-btn flat :disabled="isRegistering">Cancelar</v-btn>
            <v-btn color="primary" :loading="isRegistering" @click="createOrder">Finalizar</v-btn>
          </v-subheader>
        </div>
      </v-list>
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
    </v-layout>
  </v-container>
</template>

<script>
  import xs from 'xstream'
  import { createOrder, getProducts } from '../handler/network'

  export default {
    name: 'Shopping',
    data () {
      return {
        products: [],
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
        shoppingRoute: '/client/shopping'
      }
    },
    methods: {
      getCredentials () {
        return JSON.parse(localStorage.getItem('credentials'))
      },
      updateQuantity (index, currQnt, offset) {
        const quantity = currQnt + offset
        if (quantity > 0) this.products[index].quantity = quantity
        else this.products[index].quantity = 0
      },
      async createOrder () {
        this.isRegistering = true
        const credentials = this.getCredentials()

        if (credentials) {
          if (credentials.auth) {
            const client = {
              id: credentials.auth.id,
              name: credentials.auth.name,
              register: credentials.auth.register
            }
            const cart = this.products.filter(product => product.quantity > 0)
            const orderToSave = { client, cart }
            xs.fromPromise(createOrder(credentials.auth.token, orderToSave))
              .subscribe({
                next: order => {
                  this.dialog.title = 'Pedido com sucesso'
                  this.dialog.message = `Dirija-se ao balcão para retirar o seu pedido!\nPedido nº: ${order.id}`
                  this.dialog.button = 'Fechar'
                  this.dialog.color = 'green darken-1'
                  this.dialog.route = this.shoppingRoute
                  this.dialog.status = true

                  this.isRegistering = false
                },
                error: () => {
                  localStorage.clear()
                  this.dialog.title = 'Problemas no pedido'
                  this.dialog.message = 'Efetue o login e tente novamente'
                  this.dialog.button = 'Ir ao login'
                  this.dialog.color = 'red darken-1'
                  this.dialog.route = this.loginRoute
                  this.dialog.status = true

                  this.isRegistering = false
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
          if (credentials.userType !== 'client') this.$router.push(this.loginRoute)
        } else {
          this.$router.push(this.loginRoute)
        }
      } else {
        this.$router.push(this.loginRoute)
      }
    },
    created: function () {
      xs.fromPromise(getProducts())
        .map(products => {
          return products.map(product => {
            product.value = parseFloat(product.value).toFixed(2)
            product.quantity = 0
            return product
          })
        })
        .subscribe({
          next: products => { this.products = products }
        })
    }
  }
</script>
