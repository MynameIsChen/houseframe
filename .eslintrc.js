module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 要求每一行js都应该以分号结尾，否则就会报错
    // 'semi': ['error', 'always']
    // 不检查分号
    // 'semi': 0
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
