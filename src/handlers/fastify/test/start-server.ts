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
    console.log('Listening on 3000')
  })
}
