import { Hono } from 'hono'
import getProxyImage from '../controllers/proxy/getProxyImage'

const proxyImage = new Hono()

proxyImage.get('/', getProxyImage)

export default proxyImage
