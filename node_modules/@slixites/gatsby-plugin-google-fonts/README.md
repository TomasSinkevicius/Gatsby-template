# @slixites/gatsby-plugin-google-fonts
[![Build Status](https://travis-ci.org/slixites/gatsby-plugin-google-fonts.svg?branch=master)](https://travis-ci.org/slixites/gatsby-plugin-google-fonts) [![Known Vulnerabilities](https://snyk.io/test/github/slixites/gatsby-plugin-google-fonts/badge.svg)](https://snyk.io/test/github/slixites/gatsby-plugin-google-fonts) [![codecov](https://codecov.io/gh/slixites/gatsby-plugin-google-fonts/branch/master/graph/badge.svg)](https://codecov.io/gh/slixites/gatsby-plugin-google-fonts) ![Dependencies](https://david-dm.org/slixites/gatsby-plugin-google-fonts.svg)

## How to use it ?

```js
yarn add @slixites/gatsby-plugin-google-fonts
// or
npm install --save @slixites/gatsby-plugin-google-fonts
```

Add fonts to your `gatsby-config.js`:

```js
module.exports = {
  // ...
  plugins: [
    // ...
    {
      resolve: '@slixites/gatsby-plugin-google-fonts',
      options: {
        fonts: [
          'Montserrat',
          'source sans pro\:300,400,400i,700',
        ],
        display: 'swap',
        preconnect: true,
        attributes: {
            rel: 'stylesheet preload prefetch',
            as: 'style',
        },
      },
    },
    // ...
  ]
  // ...
}
```


## How to find great ideas ?

- https://fonts.google.com