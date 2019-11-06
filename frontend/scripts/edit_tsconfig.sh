#!/usr/bin/env bash
# This is a hack to get around errors preventing this script being run outside of the app.
# You can also manually edit tsconfig.json.
jq '.compilerOptions.module = "commonjs"' tsconfig.json | sponge tsconfig.json
jq '.compilerOptions.isolatedModules = false' tsconfig.json | sponge tsconfig.json
