import path from 'path'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import config from './webpack.config'

let API_PORT = process.env.API_PORT || 3000
let API_HOST = process.env.API_HOST || 'localhost'

let PORT = process.env.PORT || 8080

let devServer = new WebpackDevServer(webpack(config), {
  hot: true,
  contentBase: path.resolve('./build'),
  proxy: {
    '/api/v1/*': {
      host: API_HOST,
      target: {
          protocol: 'http:',
          host: API_HOST,
          port: API_PORT
      },
      rewrite: function (req) {
        req.url = req.url.replace(/^\/api\/v1/, '')
      }
    }
  }
})

devServer.listen(PORT, 'localhost', function (err) {
  if (err) throw err
  console.log('Serving on: http://localhost:' + PORT)
})
