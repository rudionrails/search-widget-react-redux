# [React/Redux Search Widget](https://search-widget-react-redux.surge.sh) &middot; [![Code Climate](https://codeclimate.com/github/rudionrails/search-widget-react-redux/badges/gpa.svg)](https://codeclimate.com/github/rudionrails/search-widget-react-redux)

This Widget provides an easy-to-use fullscreen UI for a search interface.

## Usage

```javascript
SearchWidget.create({
  apiUrl: 'http://jjuhznbemfbsm7ibz-mock.stoplight-proxy.io/search' // required
  triggerRoute: '#/finder', // used to open the widget (optional)
  triggerKey: 'F', // hit SHIFT+F to open the widget (optional)
  preload: true, // whether to fetch data on create or not (optional)
  localStorageKey: 'search-widget-react-redux', // used to identity data in localstorage (optional)
});

```

## Dependencies

The embedding page needs to provide the following libraries:

* [Material Icon Font](http://fonts.googleapis.com/icon?family=Material+Icons)
* [Open Sans Font](http://fonts.googleapis.com/css?family=Open+Sans:300,400,600,900,300italic,400italic)
* [Bootstrap](https://github.com/twbs/bootstrap) ^3.3.0


## Development

### Prerequisites

Ensure you have installed (globally) the following software on your system:

* [node.js](http://nodejs.org/) ^7.0.0
* [yarn](https://yarnpkg.com/) ^0.24.0
* [watchman](https://facebook.github.io/watchman/docs/install.html) ^4.7.0

### Setup

```sh
# install dependencies
$ yarn install

# start the development server
$ yarn start

# run the tests
$ yarn test

# run the tests in watch mode
$ yarn test:watch

# run the linters (js+css)
$ yarn lint
```

## Things to consider

### JavaScript
* [Babel](http://babeljs.io/)
* [webpack](https://webpack.js.org/)
* [React](https://facebook.github.io/react/)
* [Redux](http://redux.js.org/)
* [Redux-Saga](https://redux-saga.js.org/)
* [Jest](https://facebook.github.io/jest/)
* [testdouble](https://github.com/testdouble/testdouble.js)

### CSS
* [PostCSS](http://postcss.org/)
* [SUITCSS](http://suitcss.github.io/)


Copyright © Rudolf Schmidt, released under the MIT license
