const { argv } = require('yargs');
const isDev = argv.mode === 'development';
const plugins = [
    [
        'const-enum',
        {
            transform: 'constObject',
        },
    ],
    'lodash',
    '@babel/plugin-transform-runtime',
    //支持import 懒加载
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-async-to-generator',
    'transform-class-properties',
    [
        'import',
        {
            libraryName: 'antd',
            libraryDirectory: 'es',
            style: 'css', // true or 'css'
        },
        'antd',
    ],
    [
        'import',
        {
            libraryName: 'ykj-ui',
            libraryDirectory: 'lib/components',
            style: true, // or 'css'
        },
        'ykj-ui',
    ],
];
module.exports = api => {
    api.cache(true);
    return {
        presets: [
            [
                '@babel/preset-env',
                {
                    modules: false,
                    useBuiltIns: 'entry',
                    corejs: 2, // 这里需要注意：是根据你的版本来写
                },
            ],
            '@babel/preset-react',
            '@babel/preset-typescript',
        ],
        plugins: isDev ? [...plugins, 'react-refresh/babel'] : [...plugins],
    };
};
