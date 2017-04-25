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
* [Bootstrap](https://github.com/twbs/bootstrap) ^4.0.0

The app is generated with [create-react-app](https://github.com/facebookincubator/create-react-app)


## Development

### Prerequisites

Ensure you have installed (globally) the following software on your system:

* [node.js](http://nodejs.org/) ^6.0.0
* [yarn](https://yarnpkg.com/) ^0.19.1

### JavaScript Dependencies

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

Copyright © Rudolf Schmidt, released under the MIT license
