#!/usr/bin/env sh

set -e

npm run build

cd dist

git init
gitt add -A
git commit -m 'New Deployment'
git push -f git@github.com:Urguxxi/VisOnboarding.git master:gh-pages

cd - 