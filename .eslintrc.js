module.exports = {
  extends: ["eslint:recommended", "plugin:prettier/recommended"],

  parserOptions: {
    ecmaVersion: 2017,
  },

  env: {
    es6: true,
    browser: true,
    node: true,
  },

  // rules: {
  //   "no-unexpected-multiline": "error",
  //   "no-extra-semi": "error",
  // },
};
