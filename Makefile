# See the README for installation instructions.
UGLIFY = node_modules/.bin/uglifyjs

all: \
	dist/hoverintent.js \
	dist/hoverintent.min.js

clean:
	rm -f dist/*

SRC = \
	src/hoverintent.js

dist/hoverintent.js: $(SRC)
	cat $(SRC) > dist/hoverintent.js

dist/hoverintent.min.js: dist/hoverintent.js
	$(UGLIFY) dist/hoverintent.js > dist/hoverintent.min.js

.PHONY: clean
