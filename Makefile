lint:
	./node_modules/.bin/jshint hoverintent.js

hoverintent.min.js:
	./node_modules/.bin/uglifyjs hoverintent.js > hoverintent.min.js
