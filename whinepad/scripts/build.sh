# JavaScript のトランスパイル
babel --presets react,es2015 js/source -d js/build
# JavaScript のパッケージング
browserify js/build/app.js -o bundle.js
browserify js/build/discover.js -o discover-bundle.js
# CSS のパッケージング
cat css/*/* css/*.css | sed 's/..\/..\/images/images/g' > bundle.css
# 完了
date; echo;
