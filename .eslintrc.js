module.exports = {
  // 指定 ESLint parser
  parser: '@typescript-eslint/parser',
  extends: [
    // 使用 @eslint-plugin-react 中推荐的规则
    'plugin:react/recommended',
    // 使用 @typescript-eslint/eslint-plugin 中推荐的规则
    'plugin:@typescript-eslint/recommended',
    // 使用 eslint-config-prettier 来禁止 @typescript-eslint/eslint-plugin 中那些和 prettier 冲突的规则
    'prettier/@typescript-eslint',
    // 使用 eslint-plugin-prettier 来将 prettier 错误作为 ESLint 错误显示
    // 确保下面这行配置是这个数组里的最后一行配置
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2018, // 允许解析现代 es 特性
    sourceType: 'module', // 允许使用 imports
    ecmaFeatures: {
      jsx: true, // 允许解析 jsx
    },
  },
  rules: {
    'react/display-name': 'off',
    'react/prop-types': 'off',
    // 限制数组类型必须使用 Array<T> 或 T[]
    '@typescript-eslint/array-type': 'off',
    '@typescript-eslint/camelcase': 'off',
    // 类名与接口名必须为驼峰式
    '@typescript-eslint/class-name-casing': 'error',
    // 函数返回值必须与声明的类型一致，【编译阶段检查就足够了】
    '@typescript-eslint/explicit-function-return-type': 'off',
    // 必须设置类的成员的可访问性
    '@typescript-eslint/explicit-member-accessibility': 'off',
    // 约束泛型的命名规则
    '@typescript-eslint/generic-type-naming': 'off',
    // 接口名称必须以 I 开头
    '@typescript-eslint/interface-name-prefix': 'off',
    // 禁止使用 any
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    // 有时需要动态引入，还是需要用 require
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-type-alias': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
  },
  settings: {
    react: {
      // Tells eslint-plugin-react to automatically detect the version of React to use
      version: 'detect',
    },
  },
};
