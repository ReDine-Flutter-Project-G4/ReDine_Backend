import { Hono } from 'hono'
import { logger } from 'hono/logger'

const app = new Hono()

app.use(logger())
app.get('/', (c) => {
  return c.text('Hello Hono!')
})

Bun.serve({
  fetch(req) {
    return app.fetch(req)
  },
  port: 3000,
})

export default app
