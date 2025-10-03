import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { corsConfig } from './config/cors.config'
import { rateLimiter } from 'hono-rate-limiter'
import menu from './routers/menu.routes'
import meta from './routers/meta.routes'
import proxyImage from './routers/proxy-image.routes'
import ai from './routers/ai.routes'

const app = new Hono()

app.use(corsConfig)
app.use(
  '*',
  rateLimiter({
    windowMs: 60 * 1000,
    limit: 100,
    keyGenerator: (c) => c.req.header('x-forwarded-for') || c.req.header('cf-connecting-ip') || 'unknown'
  })
)
app.use(logger())
app.get('/api/test', (c) => c.text('Hello Redine Backend'))
app.route('/api/menu', menu)
app.route('/api/meta', meta)
app.route('/api/ai', ai)
app.route('/api/proxy-image', proxyImage)

export default {
  port: 5000,
  fetch: app.fetch,
} 
