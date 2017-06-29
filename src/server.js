import express from 'express'
import path from 'path'
import morgan from 'morgan'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import config from '../webpack.config.js'

const app = express()
app.use(morgan('dev'))

if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(config)
  const webpackMiddleware = webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  })

  app.use(webpackMiddleware)
  app.use(webpackHotMiddleware(compiler))
  app.get('*', function response (req, res) {
    res.write(webpackMiddleware.fileSystem.readFileSync(path.resolve(__dirname, '../dist/index.html')))
    res.end()
  })
} else {
  app.get('*', (req, res) => {
    app.use(express.static(path.join(__dirname, '../dist')))
    res.sendFile(path.join(__dirname, '../dist/index.html'))
  })
}

const port = process.env.PORT || 3000
app.listen(port, err => {
  if (err) {
    return console.error(err)
  }
  console.info(`Server running on http://localhost:${port} [${process.env.NODE_ENV}]`)
})
