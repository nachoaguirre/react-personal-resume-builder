/// <reference types="vitest" />
import { defineConfig, loadEnv, splitVendorChunkPlugin } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePluginRadar } from 'vite-plugin-radar'
import { visualizer } from "rollup-plugin-visualizer";
// import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';

// const loadConfig = async () => {
//     if (!existsSync('./src/config2.dist.js')) {
//         throw new Error('El archivo de configuración predeterminado (config.dist.js) no existe.');
//     }

//     const defaultConfig = (await import('./src/config.dist.js')).default;

//     let config = { ...defaultConfig };

//     let fileExists = existsSync('./src/config.js');
//     if (fileExists === false) {
//         return config;
//     } else {
//         try {
//             const userConfig = (await import('./src/config.js')).default;
//             config = { ...config, ...userConfig };
//             return config;
//         } catch (error) {
//             return config;
//         }
//     }
// }

const loadConfig = async () => {
    let config = {};

    let defaultConfigExists = existsSync('./src/config.dist.js');
    let userConfigExists = existsSync('./src/config.js');

    if (defaultConfigExists === false && userConfigExists === false) {
        throw new Error('Cannot find default or custom config files.');
    }

    if(defaultConfigExists) {
        try {
            const defaultConfig = (await import('./src/config.dist.js')).default;
            config = { ...defaultConfig };
        } catch (error) {
            console.info('Error loading default config', error);
        }
    }

    if(userConfigExists) {
        try {
            const userConfig = (await import('./src/config.js')).default;
            config = { ...config, ...userConfig };
        } catch (error) {
            console.info('Error loading user config', error);
        }
    }

    return config;
}

const loadTheme = async () => {
    let defaultThemeExists = existsSync('./src/theme.dist.scss');
    let userThemeExists = existsSync('./src/theme.scss');

    if (defaultThemeExists === false && userThemeExists === false) {
        throw new Error('Cannot find default or custom theme files.');
    }

    if (userThemeExists) {
        return `./src/theme`;
    } else {
        return `./src/theme.dist.scss`;
    }
}

export default defineConfig(async ({ mode }) => {
    const config = await loadConfig();
    const theme = await loadTheme();

    // eslint-disable-next-line no-undef
    const env = loadEnv(mode, process.cwd());
    const metaKeywords = config.siteKeywords;

    const plugins = [
        react(),
        visualizer(),
        splitVendorChunkPlugin(),
    ];

    if (config.useAnalytics && env.VITE_ANALYTICS_ID) {
        plugins.push(VitePluginRadar({
            enableDev: config.useAnalyticsInDev,
            analytics: {
                id: env.VITE_ANALYTICS_ID,
                config: {
                    cookie_flags: 'SameSite=None;Secure',
                }
            }
        }));
    }

    return {
        plugins,
        test: {
            globals: true,
            environment: 'jsdom',
            setupFiles: './test/setup.js',
            coverage: {
                provider: 'v8',
                exclude: [
                    '.eslintrc.cjs',
                    'src/helpers/**',
                    'src/Routes.jsx',
                ],
            },
            css: {
                modules: {
                    classNameStrategy: 'non-scoped',
                },
            },
        },
        define: {
            'import.meta.env.VITE_SITE_CONFIG': JSON.stringify(config),
            'import.meta.env.VITE_SITE_TITLE': JSON.stringify(config.siteTitle),
            'import.meta.env.VITE_SITE_DESCRIPTION': JSON.stringify(config.siteDescription),
            'import.meta.env.VITE_SITE_KEYWORDS': JSON.stringify(metaKeywords),
            'import.meta.env.VITE_SITE_BASEURL': JSON.stringify(config.baseUrl),
        },
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `
                        @import "${theme}";
                        @import "./src/styles/_init.scss";
                    `
                }
            },

            modules: {
                localsConvention: 'camelCaseOnly',
                globalModulePaths: [
                    /src\/styles\/globals\.module\.scss$/,
                ],
            },
        },
        build: {
            rollupOptions: {
                output:{
                    manualChunks: () => {
                        return 'everything';
                    }
                }
            }
        }
    };
})
