module.exports = {
    "env": {
        "commonjs": true,
        "es6": true,
        "jest": true
    },
    "extends": ["eslint:recommended"],
    "parser": "babel-eslint",
    "plugins": [
        "import"
    ],
    "rules": {
        "eol-last": [
            "error",
            "always"
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ],
        "comma-dangle": ["error", "always-multiline"]
    }
};