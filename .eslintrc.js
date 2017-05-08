module.exports = {
  "parser": "babel-eslint",
  "extends": [
    "plugin:react/recommended",
    "airbnb-base",
  ],

  "env": {
    "browser": true,
    "node": true,
    "jest": true,
    "es6": true
  },

  "plugins": [
    "import",
    "react",
    "jsx-a11y",
    "redux-saga",
  ],

  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },

  "settings": {
    "import/resolver": {
      "webpack": {
        "config": "./config/webpack.config.base.js"
      }
    }
  },

  // add your custom rules here
  'rules': {
    // don't require .js extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never',
    }],

    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
  }
}
