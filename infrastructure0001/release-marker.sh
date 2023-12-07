#!/bin/bash -e
source ~/.bashrc

echo "==================================Sentry Release================================"
cd $WORKSPACE/

PACKAGE_VERSION=$(node -p -e "require('./packages/core/package.json').version")
RELEASE_ID=$(curl -u kinja-ci-bot:6f2598e7a6671ece48a88b8579786450ed564504 -H "Content-Type: application/json" https://api.github.com/repos/univision/univision-fe/releases/tags/v$PACKAGE_VERSION | python -c "import sys, json; print json.load(sys.stdin)['id']")
COMMITER_NAME=$(git show -s --format="%aN" $GIT_COMMIT)
COMMIT_MESSAGE=$(git show -s --format=%B $GIT_COMMIT | tr '\n' ' ')
curl --data "{ \
	\"version\": \"$PACKAGE_VERSION\", \
    \"projects\": [\"univision-fe\"], \
    \"commits\": [{ \
    	\"repository\": \"univision/univision-fe\",\
        \"id\": \"$GIT_COMMIT\", \
        \"author_name\": \"$COMMITER_NAME\",\
        \"message\": \"$COMMIT_MESSAGE\" \
      }]\
    }"\
    -H "Authorization: Bearer $SENTRY_TOKEN" -H "Content-Type: application/json"\
    https://sentry.io/api/0/organizations/univision-communications-inc/releases/

echo "==================================GitHub Release=================================="
cd $WORKSPACE/

PACKAGE_VERSION=$(node -p -e "require('./packages/core/package.json').version")
NEW_CHANGE_LOG=$(git log -1 -p --simplify-merges CHANGELOG.md | grep "^+[#*]" | sed -e 's/+#/#/g' | sed -e 's/+\*/\*/g' | perl -pe 's/\n/\\n/g')
RELEASE_ID=$(curl -u kinja-ci-bot:6f2598e7a6671ece48a88b8579786450ed564504 -H "Content-Type: application/json" https://api.github.com/repos/univision/univision-fe/releases/tags/v$PACKAGE_VERSION | python -c "import sys, json; print json.load(sys.stdin)['id']")

curl --request PATCH --data "{ \
	\"prerelease\": false \
    }"\
    -u $GIT_HUB_API_USERNAME -H "Content-Type: application/json"\
    https://api.github.com/repos/univision/univision-fe/releases/$RELEASE_ID

