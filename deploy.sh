
set -e

npm run build

cd dist

touch .nojekyll

# Inicia um repositório Git
git init
git add -A
git commit -m 'deploy to GitHub Pages'

git push -f https://larissaiishikawa@github.com/larissaiishikawa/thejoker.git main:gh-pages

cd -