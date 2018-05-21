import axios from 'axios'

const client = axios.create({ baseURL: `http://localhost:3000/api` })
const turnToEndpoint = (method, url) => ({ method, url })

const insertClientEndpoint = () => turnToEndpoint('post', '/clients')
const authClientEndpoint = () => turnToEndpoint('post', '/clients/auth')
const getOrderEndpoint = () => turnToEndpoint('get', '/orders')
const getProductEndpoint = () => turnToEndpoint('get', '/products')

async function insertClient (data) {
  const clientEndpoint = insertClientEndpoint()
  clientEndpoint.data = data

  const clientSaved = await client(clientEndpoint)
  return clientSaved.data
}

async function authClient (data) {
  const clientEndpoint = authClientEndpoint()
  clientEndpoint.data = data

  const auth = await client(clientEndpoint)
  return auth.data
}

async function getOrders () {
  const orders = await client(getOrderEndpoint())
  return orders.data
}

async function getProducts () {
  const products = await client(getProductEndpoint())
  return products.data
}

export { insertClient, authClient, getOrders, getProducts }
