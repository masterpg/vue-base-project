const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('data/json-server-data.json')
const middlewares = jsonServer.defaults()

const PORT = 5010

server.use(middlewares)

server.use(
  jsonServer.rewriter({
    '/api/*': '/$1',
  })
)

server.use(router)
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`)
})
