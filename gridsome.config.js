// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const tailwind = require('tailwindcss')
// const purgecss = require('@fullhuman/postcss-purgecss')

const postcssPlugins = [
  tailwind(),
]

// if (process.env.NODE_ENV === 'production') postcssPlugins.push(purgecss(require('./purgecss.config.js'))) //disable purgecss

module.exports = {
  siteName: 'John Chung\'s Portfolio',
  siteDescription: 'A simple portfolio theme for Gridsome powered by Tailwind CSS v1',
  siteUrl: 'https://johncdraws.com',
  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'content/blog/**/*.md',
        typeName: 'Post',
        refs: {
          tags: {
            typeName: 'Tag',
            create: true
          }
        }
      }
    },
  ],
  templates: {
    Tag: '/tag/:id'
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: postcssPlugins,
      },
    },
  },
}
