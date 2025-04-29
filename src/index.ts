import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import menu from './routes/menu'
import meta from './routes/meta'

const app = new Hono()

app.use('*', cors())
app.use(logger())
app.route('/api/menu', menu)
app.route('/api/meta', meta)

Bun.serve({
  fetch(req) {
    return app.fetch(req)
  },
  port: 3000,
})

export default app
