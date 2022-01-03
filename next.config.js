// eslint-disable-next-line @typescript-eslint/no-var-requires
const CircularDependencyPlugin = require('circular-dependency-plugin')

module.exports = {
  images: {
    loader: 'imgix',
    path: 'https://links.papareact.com/',
  },

  webpack: (config) => {
    config.plugins.push(
      new CircularDependencyPlugin({
        exclude: /a\.js|node_modules/,
        onStart() {
          console.log('start detecting webpack modules cycles')
        },
        onDetected({ paths, compilation }) {
          compilation.errors.push(new Error(paths.join(' -> ')))
        },
        onEnd({ compilation }) {
          console.log(
            'end detecting webpack modules cycles',
            compilation.errors,
          )
        },
      }),
    )

    return config
  },
}
