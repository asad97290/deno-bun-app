import { Hono } from 'https://deno.land/x/hono/mod.ts'
import { assertEquals } from 'https://deno.land/std/assert/mod.ts'

Deno.test('Hello World', async () => {
  const app = new Hono()
  app.get('/', (c) => c.text('Please test me'))

  const res = await app.request('http://localhost/')
  assertEquals(res.status, 200)
})