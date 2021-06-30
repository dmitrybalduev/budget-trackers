const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');

const config = {
  entry: './public/assets/js/index.js',
  output: {
    path: __dirname + '/public/dist',
    filename: 'bundle.js',
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    new WebpackPwaManifest({
      inject: false,
      fingerprints: false,
      filename: "manifest.json",
      name: 'Budget tracker',
      short_name: 'Budget tracker',
      description: 'An application that allows you to track budget even in offline mode',
      background_color: '#01579b',
      theme_color: '#ffffff',
      'theme-color': '#ffffff',
      start_url: '/',
      display: 'standalone',
      icons: [
        {
          src: path.resolve(__dirname, 'public/assets/images/icons/icon-512x512.png'),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join('assets', 'icons'),
        },
      ],
    }),
  ],
};

module.exports = config;
