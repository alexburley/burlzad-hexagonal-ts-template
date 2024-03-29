import { APIFactory } from '../api'

if (require.main === module) {
  // called directly i.e. "node app"
  APIFactory().listen({ port: 3000 }, err => {
    if (err) console.error(err)
    console.log('server listening on 3000')
  })
}
