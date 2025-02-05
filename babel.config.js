module.exports = {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            node: 'current'
          }
        }
      ],
      '@babel/preset-typescript'
    ],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@modules': './src/modules',
            '@infra': './src/infra',
            '@shared': './src/shared',
            '@core': './src/core',
            // '@webhooks': './src/webhooks',
            // '@services': './src/services'
          }
        }
      ],
      'babel-plugin-transform-typescript-metadata',
      ['@babel/plugin-proposal-decorators', { version: 'legacy' }],
      ['@babel/plugin-proposal-pipeline-operator', { proposal: 'minimal' }],
      ['@babel/plugin-transform-private-methods', { loose: true }]
    ],
    ignore: [
      '**/*.spec.ts'
    ]
  }
  