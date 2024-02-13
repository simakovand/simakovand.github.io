module.exports = {
	root: true,
	env: { browser: true,
				 es2020: true, 
				node: true},
	extends: [
		"plugin:@typescript-eslint/recommended",
		"plugin:react-hooks/recommended",
		"plugin:import/recommended",
    // "airbnb"
	],
	ignorePatterns: ["dist", ".eslintrc.cjs"],
	parser: "@typescript-eslint/parser",
	plugins: ["react-refresh", "import", "react"],
	rules: {
		"react-refresh/only-export-components": [
			"warn",
			{ allowConstantExport: true },
		],
		"@typescript-eslint/no-unused-vars": "off",
		"react/prop-types": "off",
		"react/react-in-jsx-scope": "off",
		"react/react-in-tsx-scope": "off",
		"react/no-array-index-key": "off",
		"jsx-a11y/anchor-is-valid": "off",
		"jsx-a11y/label-has-associated-control": "off",
		"jsx-a11y/no-static-element-interactions": "off",
		"react/jsx-one-expression-per-line": "off",
		"react/jsx-no-useless-fragment": "off",
		"default-param-last": "off",
		"no-param-reassign": ["error", { "props": false }],
		"import/extensions": ["error", "ignorePackages", { "tsx": "always" }],
		"indent": ["error", "tab"],
		"quotes": ["error", "single"],
		"react/self-closing-comp": [
      "error",
      {
        "component": true,
        "html": true
      }
    ]
	},
}
