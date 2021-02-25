const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@layout-body-background': '#f0eaf4',
              '@layout-header-background': '#251738',
              // '@primary-color': '#1DA57A',
              // '@error-color': '@blue-4',
              // '@warning-color': '@blue-4'

              // Button backgrounds - also options for border and color
              // '@btn-primary-bg': '#f0eaf4',
              '@btn-ghost-bg': '#f0eaf4',
              // '@btn-default-bg': '#ffa4cd',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};

// Color Schemes:

// purplre, yellow, cyan: 
// #A64AC9 - purple
// #FCCD04 - Yellow
// #FFB48F Pastel pinkk
// #F5E6CC - Grey/tan light
// #17E9E0 - cyan

// 2D3B41 - charcoal
// Fb6a75 - pink
// f6bc00 mustard yellow
// f6d852 light yellow
// 00c7b7 cyan

// f0eaf4 white/pink
// 251738 dark purple
// 24ddd8 cyan
// ffa4cd pink
// f9d673 yellow