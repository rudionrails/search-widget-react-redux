# [React/Redux Search Widget](https://search-widget-react-redux.surge.sh) &middot; [![CircleCI](https://circleci.com/gh/rudionrails/search-widget-react-redux.svg?style=shield)](https://circleci.com/gh/rudionrails/search-widget-react-redux) [![Code Climate](https://codeclimate.com/github/rudionrails/search-widget-react-redux/badges/gpa.svg)](https://codeclimate.com/github/rudionrails/search-widget-react-redux)

This Widget provides an easy-to-use fullscreen UI for a search interface.

<p style="background: black; padding: 1rem 0; text-align: center;">
  <img src="https://raw.githubusercontent.com/rudionrails/search-widget-react-redux/master/public/widget.gif" />
</p>

## Usage

```javascript
SearchWidget.create({
  apiUrl: 'http://jjuhznbemfbsm7ibz-mock.stoplight-proxy.io/search' // required
  preload: true, // whether to fetch data on create or not (optional)
  triggerRoute: '#/finder', // used to open the widget (optional)
  triggerKey: 'F', // hit SHIFT+F to open the widget (optional)
  localStorageKey: 'search-widget-react-redux', // used to identify data in localstorage (optional)
});

```

## Dependencies

The embedding page needs to provide the following libraries:

* [`Material Icon Font`](http://fonts.googleapis.com/icon?family=Material+Icons)
* [`Open Sans Font`](http://fonts.googleapis.com/css?family=Open+Sans:300,400,600,900,300italic,400italic)
* [`Bootstrap`](https://github.com/twbs/bootstrap) ^3.3.0


## Development

### Prerequisites

Ensure you have installed (globally) the following software on your system:

* [`node.js`](http://nodejs.org/) ^7.0.0
* [`yarn`](https://yarnpkg.com/) ^0.24.0
* [`watchman`](https://facebook.github.io/watchman/docs/install.html) ^4.7.0

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

## API Endpoint

In order to fetch data, the `apiUrl` endpoint is required to be `json:api` spec compliant. The dummy [`apiUrl`](http://jjuhznbemfbsm7ibz-mock.stoplight-proxy.io/search) is specified here: [https://search-widget-react-redux.api-docs.io](https://search-widget-react-redux.api-docs.io).

Passing the `query` parameter is also implemented according to jsonapi:spec [`filtering`](http://jsonapi.org/recommendations/#filtering) recommandation.

## Things to consider

### JavaScript
* [`Babel`](http://babeljs.io/) for transpiling JavaScript
* [`webpack`](https://webpack.js.org/) for module bundling
* [`React`](https://facebook.github.io/react/) for building user interfaces
* [`Redux`](http://redux.js.org/) for state management
* [`Redux-Saga`](https://redux-saga.js.org/) for managing side effects
* [`Jest`](https://facebook.github.io/jest/) for testing
* [`testdouble`](https://github.com/testdouble/testdouble.js) for mocking/stubbing/spying
* [`eslint`](http://eslint.org/) for linting JavaScript

### HTML/CSS
* [`PostCSS`](http://postcss.org/) for transforming CSS
* [`cssnext`](http://cssnext.io/) for using tomorrow's CSS syntax today
* [`SUITCSS`](http://suitcss.github.io/) for compoent-based UIdevelopment
* [`Atomic Design`](http://atomicdesign.bradfrost.com/) for creating and maintaining robust UI systems
* [`stylelint`](https://stylelint.io/) for linting CSS

### Other
* [`stoplight`](http://stoplight.io/) for defining the mock api
* [`json:api`](http://jsonapi.org/) for shared conventions on implementing JSON API's
* [`surge`](http://surge.sh/) for publishing static web front-ends
* [`circleci`](https://circleci.com/gh/rudionrails/search-widget-react-redux) for continuous integration
* [`codeclimate`](https://codeclimate.com/github/rudionrails/search-widget-react-redux) for healthy code
* [`pre-push`](https://github.com/dflourusso/pre-push) for running git-hooks, like linting and testing

Copyright © Rudolf Schmidt, released under the MIT license
