<template>
  <v-container fluid>
    <v-layout column>
      <v-list>
        <v-subheader class="primary white--text">Última Sincronização: {{ lastSync }}</v-subheader>
        <v-list-group
          v-for="order in orders"
          v-model="order.active"
          :key="order.id"
          :prepend-icon="order.action"
          no-action
        >
          <v-list-tile class="py-3" slot="activator">
            <v-list-tile-content>
              <v-list-tile-title class="title">{{ order.client.name }}</v-list-tile-title>
              <v-list-tile-sub-title class="text--primary">Matrícula: {{ order.client.register }}</v-list-tile-sub-title>
              <v-list-tile-sub-title>Pedido: {{ order.id }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-for="item in order.cart" :key="item.name">
            <v-list-tile-action>{{ item.quantity }}x</v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.name }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
      </v-list>
    </v-layout>
  </v-container>
</template>

<script>
import xs from 'xstream'
import { getOrders } from '../handler/network'

export default {
  name: 'Main',
  data () {
    return {
      orders: [],
      lastSync: 'Dados indisponíveis!'
    }
  },
  methods: {
    async loadOrders () {
      const orders = await getOrders()
      return orders
    },
    formatDate (date) {
      const monthNames = [
        'janeiro', 'fevereiro', 'março',
        'abril', 'maio', 'junho',
        'julho', 'agosto', 'setembro',
        'outubro', 'novembro', 'dezembro'
      ]

      const formatNumber = (number) => {
        if (number < 10) return `0${number}`
        return `${number}`
      }

      const year = date.getFullYear()
      const month = monthNames[date.getMonth()]
      const day = formatNumber(date.getDate())
      const hour = formatNumber(date.getHours())
      const minute = formatNumber(date.getMinutes())
      const second = formatNumber(date.getSeconds())

      return `${day} de ${month} de ${year} às ${hour}:${minute}:${second}`
    }
  },
  created: function () {
    const initialOrder$ = xs.fromPromise(this.loadOrders())

    const periodicOrders$ = xs
      .periodic(30000)
      .map(() => xs.fromPromise(this.loadOrders()))
      .flatten()

    xs.merge(initialOrder$, periodicOrders$)
      .map(items => items.filter(item => !item.done))
      .subscribe({
        next: items => {
          const orders = items
            .map(item => {
              item.action = 'person'
              item.active = false
              return item
            })
          this.orders = orders
            .map(order => {
              this.orders.forEach(postedOrder => {
                if (order.id === postedOrder.id) order.active = postedOrder.active
              })
              return order
            })
            .sort((orderA, orderB) => {
              const dateA = new Date(orderA.date)
              const dateB = new Date(orderB.date)
              return dateA - dateB
            })
          this.lastSync = this.formatDate(new Date(Date.now()))
        }
      })
  }
}
</script>
