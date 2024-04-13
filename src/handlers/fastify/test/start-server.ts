import { APIFactory } from '../api'

if (require.main === module) {
  const server = APIFactory()
  // called directly i.e. "node app"
  server.ready(err => {
    if (err) console.error(err)
    else {
      console.log(server.printRoutes())
    }
  })
  server.listen({ port: 3000 }, err => {
    if (err) console.error(err)
    console.log('server listening on 3000')
  })
}
