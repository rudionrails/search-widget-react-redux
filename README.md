# Search Widget written in React

This Widget provides an easy-to-use fullscreen UI for a search interface.

## Usage

```javascript
/**
 * Attach the Widget to a DOMNode
 */
SearchWidget.create()
  .then(() => {
    console.log('Widget created');
  })
  .catch((err) => {
    console.error('An error occured: ', err);
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

### Applied methodologies

* [SUITCSS](http://suitcss.github.io/)

### Setup

Inside your local working directory:

```sh
$ yarn install
```

### Start the Development Server

To start the development server:

```sh
$ yarn start
```

### Testing

```sh
$ yarn test
```

Or run it continuoiusly in the background

```sh
$ yarn test:watch
```

### Linting

```sh
$ yarn lint
```

Copyright © Rudolf Schmidt, released under the MIT license
