import { Hono } from 'hono'
import getProxyImage from '../controllers/getProxyImage'

const proxyImage = new Hono()

proxyImage.get('/', getProxyImage)

export default proxyImage
