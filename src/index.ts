import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { config } from 'dotenv'

//required so we can be able to read the .env file
config()

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
