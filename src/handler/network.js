import axios from 'axios'

const client = axios.create({ baseURL: `http://localhost:3000/api` })
const turnToEndpoint = (method, url) => ({ method, url })

const getOrderEndpoint = () => turnToEndpoint('get', '/orders')
const insertClientEndpoint = () => turnToEndpoint('post', '/clients')
const authClientEndpoint = () => turnToEndpoint('post', '/clients/auth')

async function getOrders () {
  const orders = await client(getOrderEndpoint())
  return orders.data
}

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

export { getOrders, insertClient, authClient }
