module.exports = {
  parser: 'babel-eslint',
  "ecmaFeatures": {
    "modules": true,
    "spread" : true,
    "restParams" : true,
    "jsx": false,
    "experimentalObjectRestSpread": true,
  },
  "env": {
    "browser": true,
    "es6": true
  },
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module"
  },
  "rules": {
    "arrow-body-style": 0,
    "comma-dangle": [0],
    "import/no-unresolved": 0,
    "func-names": 0,
    "space-before-function-paren":0
  },
  "plugins": [
    "prettier"
  ]
}
