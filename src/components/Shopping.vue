<template>
  <v-container fluid>
    <v-layout column>
      <v-list>
        <v-list-tile v-for="(product, i) in products" :key="product.name" class="py-3">
          <v-list-tile-content>
            <v-list-tile-title>{{ product.name }}</v-list-tile-title>
            <v-list-tile-sub-title>R$ {{ product.price }}</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-layout row align-center>
              <v-btn outline icon color="primary" @click="updateQuantity(i, product.quantity, -1)">
                <v-icon>exposure_neg_1</v-icon>
              </v-btn>
              <p
                class="ma-0 px-5 text-xs-center text-sm-center text-md-center text-lg-center text-xl-center"
                disabled> {{ product.quantity }}
              </p>
              <v-btn outline icon color="primary" @click="updateQuantity(i, product.quantity, 1)">
                <v-icon>exposure_plus_1</v-icon>
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
import { getProducts } from '../handler/network'

export default {
  name: 'Shopping',
  data () {
    return {
      products: []
    }
  },
  methods: {
    updateQuantity (index, currQnt, offset) {
      const quantity = currQnt + offset
      if (quantity > 0) this.products[index].quantity = quantity
      else this.products[index].quantity = 0
    }
  },
  created: function () {
    xs.fromPromise(getProducts())
      .map(products => {
        return products.map(product => {
          product.price = String(parseFloat(product.value).toFixed(2)).replace('.', ',')
          product.quantity = 0
          delete product.value
          return product
        })
      })
      .subscribe({
        next: products => { this.products = products }
      })
  }
}
</script>
