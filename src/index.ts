import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { config } from 'dotenv'
import { authRouter } from './routers/authRoute.js'
import { bookRouter } from './routers/bookRoute.js'

//required so we can be able to read the .env file
config()

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

//routes
app.route("/api/v1/user", authRouter)
app.route("/api/v1/book", bookRouter)

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
