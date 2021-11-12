module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ["airbnb", "prettier"],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: "module",
    },
    plugins: ["prettier"],
    rules: {
        "no-nested-ternary": "off",
        "no-unused-vars": "off",
        "import/prefer-default-export": "off",
        "react/react-in-jsx-scope": "off",
        "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
        "react/prop-types": "off",
        "react/no-children-prop": "off",
        "react/no-array-index-key": "off",
        "react/jsx-props-no-spreading": "off",
        camelcase: "off",
        "jsx-a11y/anchor-is-valid": "off",
        "jsx-a11y/label-has-associated-control": [
            "error",
            {
                required: {
                    some: ["nesting", "id"],
                },
            },
        ],
        "jsx-a11y/label-has-for": [
            2,
            {
                components: ["Label"],
                required: {
                    some: ["nesting", "id"],
                },
                allowChildren: false,
            },
        ],
    },
};
