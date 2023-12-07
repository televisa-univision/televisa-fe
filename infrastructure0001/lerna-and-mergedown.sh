#!/bin/bash
source ~/.bashrc

echo "==================================Adding NPM Auth=================================="
echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > ~/.npmrc
sleep 5s
echo "NPM Auth"
npm who

echo "==================================Installing Node Version 8.4=================================="
npm who
cd $WORKSPACE && pwd && git checkout master && git pull
nvm install 9.11.2 && node --version

echo "=================================Installing yarn==============================================="
curl -o- -L https://yarnpkg.com/install.sh | bash

echo "==================================Installing Node Modules======================================"
cd $WORKSPACE/ && pwd && nvm use 9.11.2 && node --version && yarn install

echo "===================================Lerna publish==============================================="
cd $WORKSPACE/ && pwd && nvm use 9.11.2 && node --version && $WORKSPACE/node_modules/.bin/lerna publish --conventional-commits --yes --cd-version $VERSION_TYPE -m "Published %s [ci skip]"

echo "==================================Merge down=================================="
cd $WORKSPACE/
git checkout develop
git pull
git merge --no-ff -m "Merge branch 'master' into 'develop' [ci skip]" origin/master
git push


echo "==================================GitHub Release=================================="
cd $WORKSPACE/
PACKAGE_VERSION=$(node -p -e "require('./packages/core/package.json').version")
NEW_CHANGE_LOG=$(git log -1 -p --simplify-merges CHANGELOG.md | grep "^+[#*]" | sed -e 's/+#/#/g' | sed -e 's/+\*/\*/g' | perl -pe 's/\n/\\n/g' | sed "s/\"/'/g")

curl --data "{ \
	\"tag_name\": \"v$PACKAGE_VERSION\", \
    \"target_commitish\": \"master\", \
    \"name\": \"v$PACKAGE_VERSION\", \
    \"body\": \"$NEW_CHANGE_LOG\", \
    \"draft\": false, \
	\"prerelease\": true \
    }" -u "$GIT_HUB_API_USERNAME" -H "Content-Type: application/json"\
    https://api.github.com/repos/univision/univision-fe/releases
