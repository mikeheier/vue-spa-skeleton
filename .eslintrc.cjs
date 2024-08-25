/* eslint-env node */
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:vue/recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  plugins: [
    'vue'
  ],
  settings: {
    'import/resolver': {
      node: { extensions: ['.js', '.mjs'] }
    }
  },
  // add custom rules here
  rules: {
    // Enforce import order
    'import/order': 2,

    // Imports should come first
    'import/first': 2,

    // Other import rules
    'import/no-mutable-exports': 2,

    // Allow unresolved imports
    'import/no-unresolved': 0,

    // Allow paren-less arrow functions only when there's no braces
    'arrow-parens': [2, 'as-needed', { requireForBlockBody: true }],

    // Allow async-await
    'generator-star-spacing': 0,

    // Allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,

    // Prefer const over let
    'prefer-const': [2, {
      'destructuring': 'any',
      'ignoreReadBeforeAssign': false
    }],

    // No single if in an "else" block
    'no-lonely-if': 2,

    // Force curly braces for control flow
    curly: 2,

    // No async function without await
    'require-await': 2,

    // Force dot notation when possible
    'dot-notation': 2,

    'no-var': 2,

    'space-before-function-paren': [2, {
      anonymous: 'always',
      named: 'never'
    }],
    'vue/no-parsing-error': [2, {
      'x-invalid-end-tag': false
    }],
    'vue/max-attributes-per-line': [2, {
      'singleline': 5
    }],
    "semi": ["error", "always"],
    "eqeqeq": "error",
    "comma-dangle": "error",
    // "curly": "error",
    "block-scoped-var": "warn",
    "no-useless-escape": "warn",
    "no-unused-vars": [
      "warn",
      {
        "args": "none"
      }
    ],
    "no-mixed-spaces-and-tabs": "warn",
    "no-unreachable": "warn",
    "no-undef": "warn",
    "no-console": "off",
    "indent": "off",
    "brace-style": ["error", "stroustrup", { "allowSingleLine": true }],
    "vue/singleline-html-element-content-newline": "off",
    "vue/multiline-html-element-content-newline": "off",
    "vue/multi-word-component-names": "off",
    "vue/html-closing-bracket-newline": "off",
    "vue/no-v-model-argument": "off",
    "vue/require-component-is": "off",
    "vue/html-indent": "off",
    "vue/no-v-html": "off",
    "vue/html-self-closing": "off",
    "vue/no-multiple-template-root": "off",
    "import/order": "off"
  },
  "globals": {
    google: true
  }
}
