import path from 'path'
import webpack from 'webpack'
import cssnano from 'cssnano'
import { argv } from 'yargs'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

const __DEV__ = process.env.NODE_ENV === 'development'
const __PROD__ = process.env.NODE_ENV === 'production'
const __TEST__ = process.env.NODE_ENV === 'test'

const webpackConfig = {
  name: 'client',
  target: 'web',
  devtool: 'source-map',
  resolve: {
    modulesDirectories: [
      'node_modules'
    ],
    extensions: ['', '.js', '.jsx', '.json']
  },
  module: {}
}

const APP_ENTRY_PATHS = [
  path.resolve('./src/main.js')
]

webpackConfig.entry = {
  app: APP_ENTRY_PATHS,
  vendor: [
    'babel-polyfill',
    'history',
    'react',
    'react-redux',
    'react-router',
    'react-router-redux',
    'redux',
    'axios'
  ]
}

webpackConfig.output = {
  filename: `[name].[hash].js`,
  path: path.resolve('./dist'),
  publicPath: '/' 
}

webpackConfig.plugins = [
  new webpack.DefinePlugin({
    'process.env'  : {
      'NODE_ENV' : JSON.stringify(process.env.NODE_ENV)
    },
    'NODE_ENV'     : process.env.NODE_ENV,
    '__DEV__'      : process.env.NODE_ENV === 'development',
    '__PROD__'     : process.env.NODE_ENV === 'production',
    '__TEST__'     : process.env.NODE_ENV === 'test',
    '__DEBUG__'    : process.env.NODE_ENV === 'development' && !argv.no_debug,
    '__COVERAGE__' : !argv.watch && process.env.NODE_ENV === 'test',
    '__BASENAME__' : JSON.stringify(process.env.BASENAME || '')
  }),
  new HtmlWebpackPlugin({
    template: path.resolve('./src/index.html'),
    hash: false,
    favicon: path.resolve('./src/static/favicon.ico'),
    filename: 'index.html',
    inject: 'body',
    minify: {
      collapseWhitespace: true
    }
  })
]

if (__DEV__) {
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  )
} else if (__PROD__) {
  webpackConfig.plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false
      }
    })
  )
}

if (!__TEST__) {
  webpackConfig.plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor']
    })
  )
}

webpackConfig.module.loaders = [{
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  loader: 'babel',
  query: {
    cacheDirectory: true,
    plugins: ['transform-runtime'],
    presets: ['es2015', 'react', 'stage-0']
  }
},
{
  test: /\.json$/,
  loader: 'json'
},
{
  test: /\.png$/,
  loader: "url-loader?limit=100000"
}]

const BASE_CSS_LOADER = 'css?sourceMap&-minimize'

const PATHS_TO_TREAT_AS_CSS_MODULES = [
  path.resolve('./src/styles')
]

const isUsingCSSModules = !!PATHS_TO_TREAT_AS_CSS_MODULES.length
const cssModulesRegex = new RegExp(`(${PATHS_TO_TREAT_AS_CSS_MODULES.join('|')})`)

if (isUsingCSSModules) {
  const cssModulesLoader = [
    BASE_CSS_LOADER,
    'modules',
    'importLoaders=1',
    'localIdentName=[name]__[local]___[hash:base64:5]'
  ].join('&')

  webpackConfig.module.loaders.push({
    test: /\.scss$/,
    include: cssModulesRegex,
    loaders: [
      'style',
      cssModulesLoader,
      'sass?sourceMap'
    ]
  })

  webpackConfig.module.loaders.push({
    test: /\.css$/,
    include: cssModulesRegex,
    loaders: [
      'style',
      cssModulesLoader
    ]
  })
}

const excludeCSSModules = isUsingCSSModules ? cssModulesRegex : false
webpackConfig.module.loaders.push({
  test: /\.scss$/,
  exclude: excludeCSSModules,
  loaders: [
    'style',
    BASE_CSS_LOADER,
    'sass?sourceMap'
  ]
})
webpackConfig.module.loaders.push({
  test: /\.css$/,
  exclude: excludeCSSModules,
  loaders: [
    'style',
    BASE_CSS_LOADER
  ]
})

webpackConfig.sassLoader = {
  includePaths: path.resolve('./src/styles')
}

webpackConfig.module.loaders.push({
  test: /\.svg/,
  loader: 'file-loader'
})

if (!__DEV__) {
  webpackConfig.module.loaders.filter((loader) =>
    loader.loaders && loader.loaders.find((name) => /css/.test(name.split('?')[0]))
  ).forEach((loader) => {
    const [first, ...rest] = loader.loaders
    loader.loader = ExtractTextPlugin.extract(first, rest.join('!'))
    Reflect.deleteProperty(loader, 'loaders')
  })

  webpackConfig.plugins.push(
    new ExtractTextPlugin('[name].[contenthash].css', {
      allChunks: true
    })
  )
}

export default webpackConfig
