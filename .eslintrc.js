module.exports = {
	parser:  '@typescript-eslint/parser',
	extends: [
		'eslint-config-alloy/react',
		'plugin:react-hooks/recommended'
	],
	globals: {
		// 这里填入你的项目需要的全局变量
		// 这里值为 false 表示这个全局变量不允许被重新赋值，比如：
		React: false,
		ReactDOM: false
	},
	settings: {
		react: {
			pragma: 'React',
				version: 'detect'
		}
	},
	plugins: ['react-hooks'],
	rules: {
		'indent': [
		    'error',
		    2,
		    {
		        SwitchCase: 1,
		        flatTernaryExpressions: true
		    }
		],
		// jsx 的 children 缩进必须为两个空格
		'react/jsx-indent': [
		    'error',
		    2
		],
		// jsx 的 props 缩进必须为两个空格
		'react/jsx-indent-props': [
		    'error',
		    2
		],
		// 驼峰结尾
		'camelcase': 1,
		// 分号指定单引号
		'quotes': [
			'error',
			'single'
		],
		// 语句强制分号结尾
		'semi': [2, 'always'],
		'space-unary-ops': [0, { 'words': true, 'nonwords': false }],
		// react hook 检查
		'react-hooks/rules-of-hooks': 'error', // 检查 Hook 的规则
		'react-hooks/exhaustive-deps': 'warn' // 检查 effect 的依赖
	}
};
