#!/usr/bin/env sh
npm run build
cd dist
echo 'bo.kaisa.co.kr' > CNAME
git init
git checkout -b main
git add -A
git commit -m 'deploy'
git remote add origin "https://github.com/kaisaohnae/kaisabo.git"
git push -u --force origin main
cd ..
