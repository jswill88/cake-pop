const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@layout-body-background': '#251738',
              '@layout-header-background': '#24ddd8',
              '@layout-footer-background': '#251738',

              '@text-color': '#f0eaf4',
              '@text-color-dark': '#f0eaf4',
              '@heading-color-dark': '#f0eaf4',

              // Button backgrounds - also options for border and color
              '@btn-primary-bg': '#f9d673',
              '@btn-primary-color': '#000',

              // '@btn-default-color':'@text-color',
              // '@btn-default-color':'#f0eaf4',
              // '@btn-default-bg': '@component-background',
              // '@btn-default-bg': '#f0eaf4'

              '@btn-default-ghost-border': '#24ddd8',
              '@btn-default-ghost-color': '#24ddd8',

              '@menu-dark-item-active-bg': '#f9d673',
              '@menu-dark-highlight-color': '#000000',
              // '@menu-item-color': '#FFFFFF',

              '@menu-dark-bg': '#24ddd8',

              // '@menu-dark-item-active-bg': '#f9d673',
              '@menu-dark-color': '#000',

              '@menu-dark-selected-item-icon-color': '#000000',

              '@label-color': '#FFFFFF',

              '@divider-color': '#f0eaf4',
              // '@select-dropdown-bg': '#f0eaf4',
              // '@select-item-selected-color':'#000',
            
              '@modal-heading-color':'#FFFFFF',
              '@card-background': 'transparent',
              // '@btn-ghost-bg': '#f0eaf4',
              // '@btn-default-color': '#251738',
              // '@btn-default-bg': '#ffffff',

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