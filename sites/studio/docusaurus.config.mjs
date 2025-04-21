import { themes as prismThemes } from 'prism-react-renderer'
import { docusaurusPlugins } from './plugins/index.mjs'
import smartypants from 'remark-smartypants'

const config = {
  title: 'FreeSewing Studio',
  tagline: 'FreeSewing for Designers',
  favicon: 'img/favicon.ico',

  url: 'https://freesewing.eu',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  future: {
    experimental_faster: false, // Too many bugs for now
  },

  plugins: docusaurusPlugins,
  i18n: { defaultLocale: 'en', locales: ['en'] },
  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
          remarkPlugins: [[smartypants, { dashes: 'oldschool' }]],
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],
  themeConfig: {
    colorMode: {
      // Do not be tempted to change these
      disableSwitch: true,
      respectPrefersColorScheme: true,
    },
    image: 'img/freesewing-social-card.png',
    navbar: {
      title: 'FreeSewing Studio',
      logo: {
        alt: 'FreeSewing Logo',
        src: 'img/logo.svg',
      },
      items: [
        { label: 'FreeSewing Collection', to: '/collection', position: 'left' },
        { label: 'Local Designs', to: '/local', position: 'left' },
        { label: 'Add a Design', to: '/add', position: 'left' },
        { label: 'Documentation', to: 'https://freesewing.dev/', position: 'left' },
        { label: 'Support', to: '/support', position: 'left' },
        { type: 'custom-FreeSewingNavbarItem', position: 'right', id: 'account' },
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          title: 'Sections',
          items: [
            { label: 'FreeSewing Collection', to: '/collection' },
            { label: 'Local Designs', to: '/local' },
            { label: 'Add a Design', to: '/add' },
          ],
        },
        {
          title: 'Help & Support',
          items: [
            { label: 'Documentation', to: 'https://freesewing.dev/' },
            { label: 'Support', to: '/support' },
          ],
        },
        {
          title: 'More',
          items: [
            { label: 'FreeSewing.dev', to: 'https://freesewing.dev/' },
            { label: 'FreeSewing.social', to: 'https://freesewing.social/' },
            { label: 'Code on Codeberg', to: 'https://codeberg.org/freesewing/freesewing' },
            { label: 'FreeSewing Revenue Pledge 💜', href: '/docs/about/pledge/' },
          ],
        },
      ],
      copyright: `<a href="https://freesewing.org/">FreeSewing</a> is brought to you by <a href="https://github.com/joostdecock">Joost De Cock</a> and <a href="https://github.com/freesewing/freesewing/blob/develop/CONTRIBUTORS.md">contributors</a> with the financial support of <a href="/patrons/join">our patrons</a>`,
    },
    prism: {
      theme: prismThemes.dracula,
      darkTheme: prismThemes.dracula,
    },
  },
}

export default config
