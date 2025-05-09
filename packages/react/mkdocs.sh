#!/bin/bash
mkdir -p ./docs/components

jsdoc -c jsdoc.json components/Account/* > ../../sites/dev/prebuild/jsdoc/react/components/account.json
jsdoc -c jsdoc.json components/Admin/* > ../../sites/dev/prebuild/jsdoc/react/components/admin.json
jsdoc -c jsdoc.json components/Button/* > ../../sites/dev/prebuild/jsdoc/react/components/button.json
