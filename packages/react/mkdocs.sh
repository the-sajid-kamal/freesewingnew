#!/bin/bash
mkdir -p ./docs/components

jsdoc -c jsdoc.json components/Account/* > ../../sites/dev/prebuild/jsdoc/react/components/account.json
jsdoc -c jsdoc.json components/Admin/* > ../../sites/dev/prebuild/jsdoc/react/components/admin.json
jsdoc -c jsdoc.json components/Breadcrumbs/* > ../../sites/dev/prebuild/jsdoc/react/components/breadcrumbs.json
jsdoc -c jsdoc.json components/Button/* > ../../sites/dev/prebuild/jsdoc/react/components/button.json
jsdoc -c jsdoc.json components/Collection/* > ../../sites/dev/prebuild/jsdoc/react/components/collection.json
jsdoc -c jsdoc.json components/Control/* > ../../sites/dev/prebuild/jsdoc/react/components/control.json
jsdoc -c jsdoc.json components/CuratedSet/* > ../../sites/dev/prebuild/jsdoc/react/components/curatedset.json
jsdoc -c jsdoc.json components/Docusaurus/* > ../../sites/dev/prebuild/jsdoc/react/components/docusaurus.json
