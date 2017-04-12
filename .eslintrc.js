module.exports = {
    "env": {
        "es6": true,
        "mocha": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "globals": {
        "document": true,
        "require": true,
        "process": true,
        "exports": true,
        "global": true,
        "$": true,
        "alert": true,
        "console": true,
        "module": true,
        "it": true,
        "describe": true,
        "before": true,
        "after": true
    },
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-console": "off",
    }
};