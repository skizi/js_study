module.exports = {
  "plugins": [
    "prettier",
    "vue",
  ],
  "extends": [
    "eslint:recommended",
    'prettier',
    "plugin:vue/recommended",
  ],
  "rules": {
    "arrow-body-style": 0,
    "comma-dangle": [0],
    "import/no-unresolved": 0,
    "func-names": 0,
    "space-before-function-paren":0
  },
  "globals":{
    "Vue": true,
    "require": true,
    "module": true,
  }
}