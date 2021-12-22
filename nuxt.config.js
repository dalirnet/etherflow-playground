export default {
    head: {
        title: 'EtherFlow Playground',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' },
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
    components: true,
    build: {
        postcss: {
            plugins: {
                tailwindcss: {},
                autoprefixer: {},
            },
        },
    },
    loading: {
        color: '#37de8a',
    },
    serverMiddleware: [{ path: '/api', handler: '~/serverMiddleware/api.js' }],
    css: ['@/assets/main.css'],
    buildModules: ['@nuxt/postcss8', '@nuxtjs/eslint-module'],
    modules: ['@nuxtjs/axios', '@nuxtjs/pwa'],
    axios: {
        baseURL: '/',
    },
    router: {
        trailingSlash: true,
    },
    pwa: {
        manifest: {
            lang: 'en',
        },
    },
}
