# Changelog

## 2.2.1

- Package bump to devdependency on lodash.
- Limit the number of published files [#29](https://github.com/tristen/hoverintent/pull/29).

## 2.2.0

- `handleFocus` option added to trigger onOver/onOut callbacks during keyboard navigation [#25](https://github.com/tristen/hoverintent/pull/25).

## 2.1.0

- Removed `xtend` dependency [#24](https://github.com/tristen/hoverintent/pull/24).

## 2.0.0

- Removed UMD definition from `index.js`.
  Now if you `require('hoverintent')`, you get the CommonJS module export.
  `dist/hoverintent.min.js` still provides a UMD definition.
