import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { config } from 'dotenv'
import { authRouter } from './routers/authRoute.js'
import { bookRouter } from './routers/bookRoute.js'
import { libraryRouter } from './routers/libraryRoute.js'
import { lendingRouter } from './routers/lendingRoute.js'

//required so we can be able to read the .env file
config()

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

//routes
app.route("/api/v1/user", authRouter)
app.route("/api/v1/book", bookRouter)
app.route("/api/v1/library", libraryRouter)
app.route("api/v1/lending", lendingRouter)

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
