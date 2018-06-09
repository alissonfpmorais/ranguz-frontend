import axios from 'axios'

const clientAuth = headers => axios.create({ baseURL: `http://localhost:3000/api`, headers })
const clientNoAuth = axios.create({ baseURL: `http://localhost:3000/api` })
const turnToEndpoint = (method, url) => ({ method, url })

const authAdminEndpoint = () => turnToEndpoint('post', '/admins/auth')
const insertClientEndpoint = () => turnToEndpoint('post', '/clients')
const authClientEndpoint = () => turnToEndpoint('post', '/clients/auth')
const getOrderEndpoint = () => turnToEndpoint('get', '/orders')
const createOrderEndpoint = () => turnToEndpoint('post', '/orders')
const insertProductEndpoint = () => turnToEndpoint('post', '/products')
const getProductEndpoint = () => turnToEndpoint('get', '/products')
const deleteProductEndpoint = (productId) => turnToEndpoint('delete', `/products/${productId}`)

async function authAdmin (data) {
  const adminEndpoint = authAdminEndpoint()
  adminEndpoint.data = data

  const auth = await clientNoAuth(adminEndpoint)
  return auth.data
}

async function insertClient (data) {
  const clientEndpoint = insertClientEndpoint()
  clientEndpoint.data = data

  const clientSaved = await clientNoAuth(clientEndpoint)
  return clientSaved.data
}

async function authClient (data) {
  const clientEndpoint = authClientEndpoint()
  clientEndpoint.data = data

  const auth = await clientNoAuth(clientEndpoint)
  return auth.data
}

async function getOrders () {
  const orders = await clientNoAuth(getOrderEndpoint())
  return orders.data
}

async function createOrder (token, data) {
  const client = clientAuth({ Authorization: `Bearer ${token}` })
  const orderEndpoint = createOrderEndpoint()
  orderEndpoint.data = data

  const order = await client(orderEndpoint)
  return order.data
}

async function insertProduct (token, data) {
  const client = await clientAuth({ Authorization: `Bearer ${token}` })
  const productEndpoint = insertProductEndpoint()
  productEndpoint.data = data

  const product = await client(productEndpoint)
  return product.data
}

async function getProducts () {
  const products = await clientNoAuth(getProductEndpoint())
  return products.data
}

async function deleteProduct (token, productId) {
  const client = clientAuth({ Authorization: `Bearer ${token}` })
  const productEndpoint = deleteProductEndpoint(productId)

  const response = await client(productEndpoint)
  return response.status === 204
}

export { authAdmin, insertClient, authClient, getOrders, createOrder, insertProduct, getProducts, deleteProduct }
