const NODE_ENV = process.env.NODE_ENV === 'development'
    ? 'development'
    : 'production';

const TARGET_NODE = process.env.WEBPACK_TARGET === 'node';

const target = process.env.WEBPACK_TARGET === 'node' ? 'server' : 'client';

module.exports = {
    outputDir: 'public_html',
    indexPath: 'index.php',
    productionSourceMap: false,

    configureWebpack: () => ({
        entry: `./src/entry-${target}`,
        target: TARGET_NODE ? 'node' : 'web',
        node: TARGET_NODE ? undefined : false,

        externals: undefined,

        output: {
            filename: `js/${target}${TARGET_NODE ? '' : '.[hash:8]'}.js`,
        },

        optimization: {
            splitChunks: TARGET_NODE ? false : undefined,
        },
    }),

    chainWebpack: config => {
        config.module
              .rule('vue')
              .use('vue-loader')
              .tap(options => {
                      return {
                          ...options,
                          optimizeSSR: false,
                      };
                  },
              )
        ;
    },
};
