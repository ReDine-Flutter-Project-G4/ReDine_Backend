import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import menu from './routes/menu'
import meta from './routes/meta'
import proxyImage from './routes/proxy-image'

const app = new Hono()

app.use('*', cors())
app.use(logger())
app.route('/api/menu', menu)
app.route('/api/meta', meta)
app.route('/api/proxy-image', proxyImage)

Bun.serve({
  fetch(req) {
    return app.fetch(req)
  },
  port: 3000,
})

export default app
