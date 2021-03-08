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
              '@btn-primary-bg': '#f9d673',
              '@btn-primary-color': '#000',

              '@btn-default-ghost-border': '#24ddd8',
              '@btn-default-ghost-color': '#24ddd8',

              '@menu-dark-item-active-bg': '#f9d673',
              '@menu-dark-highlight-color': '#000000',

              '@menu-dark-bg': '#24ddd8',

              '@menu-dark-color': '#000',

              '@menu-dark-selected-item-icon-color': '#000000',

              '@label-color': '#FFFFFF',

              '@divider-color': '#f0eaf4',
            
              '@modal-heading-color':'#FFFFFF',
              '@card-background': 'transparent',

            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
