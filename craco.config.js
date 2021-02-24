const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              // '@primary-color': '#1DA57A',
              // '@error-color': '@blue-4',
              // '@warning-color': '@blue-4'
              '@background-color-light': 'hsv(0, 0, 98%)', //background of header and selected item
              '@background-color-base': '@orange-4',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};