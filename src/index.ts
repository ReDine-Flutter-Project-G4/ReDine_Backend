import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import menu from './routes/menu'

const app = new Hono()

app.use('*', cors())
app.use(logger())
app.get('/', (c) => {
  return c.text('Hello Hono!')
})
app.route('/api/menu', menu)

Bun.serve({
  fetch(req) {
    return app.fetch(req)
  },
  port: 3001,
})

export default app
