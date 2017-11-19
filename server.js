import fs from 'fs'
import path from 'path'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import config from './webpack.config'

const API_PORT = process.env.API_PORT || 3000
const API_HOST = process.env.API_HOST || 'localhost'

const PORT = process.env.PORT || 8080
const API_V = process.env.BITCOIN_NETWORK === 'testnet'
  ? 'testing' : 'v1'

var devServer = new WebpackDevServer(webpack(config), {
  hot: true,
  contentBase: 'build/',
  historyApiFallback: true,
  https: {
    key: fs.readFileSync('./ssl/server.key'),
    cert: fs.readFileSync('./ssl/server.crt')
  },
  proxy: {
    ['/api/' + API_V + '/*']: {
      host: API_HOST,
      target: {
        protocol: 'http:',
        host: API_HOST,
        port: API_PORT
      },
      pathRewrite: {
        ['/api/' + API_V]: ''
      }
    }
  }
})

devServer.listen(PORT, '0.0.0.0', function (err) {
  if (err) throw err
  console.log('Serving on: http://localhost:' + PORT)
})
