# Awesome Performance Patches [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

> 🚀⚡ Awesome lists about performance related patches/PRs.

The purpose of this awesome list is to allow others to learn from performance improvements of the past 📝, so that you can submit your performance improvement sooner or later here as well 🤝.

<sub>The list also includes blog posts without PRs, if they contain enough code to make them useful for this purpose.</sub>

For Web Performance, there is another list of curated links of talks, newsletters, blogs and more:<br />
➡️ [fabkrum/web-performance-resources](https://github.com/fabkrum/web-performance-resources/blob/master/index.md)
➡️ [nucliweb/webperf-snippets](https://github.com/nucliweb/webperf-snippets)

<sub>Hint: What improves performance might change over time; always re-validate assumptions by benchmarking.</sub><br />
<sub>Follow me on [Twitter](https://twitter.com/sindresorhus) for updates.</sub>

## Contents

- [JavaScript](#javascript)
  - [Caching / Doing less work](#caching--doing-less-work)
  - [Data Structures](#data-structures)
  - [Unsorted](#unsorted)
  - [Blog Posts with Code 📖](#blog-posts-with-code-)
    - [Algorithmic](#algorithmic)
  - [Perf Audits 📝](#perf-audits-)
- [CSS & Rendering](#css--rendering)
  - [Blog Posts with Code 📖](#blog-posts-with-code--1)
    - [Animations 💫](#animations-)
- [HTML](#html)

## JavaScript

Patches focused on JavaScript performance improvements.
<small>

- [nodejs-bench-operations](https://github.com/RafaelGSS/nodejs-bench-operations) might be a good starting point to get an idea of what's fast.
- [MythBusters JS](https://mythbusters.js.org/) - A JavaScript Handbook exploring performance & readability.

</small>

### Caching / Doing less work

- [pnpm](https://github.com/pnpm/pnpm/pull/6317) - caches results | [blog post📖](https://jakebailey.dev/posts/pnpm-dt-2/)
- [Speeding up the JavaScript ecosystem by Marvin Hagemeister📖](https://marvinh.dev/blog/speeding-up-javascript-ecosystem/)
  - [postcss-plugins](https://github.com/csstools/postcss-plugins/pull/737) - avoids expensive RegExps
  - [svgo](https://github.com/svg/svgo/pull/1716) - avoids casting
  - [svgo](https://github.com/svg/svgo/pull/1717) - avoids double RegExps calls
  - and other topics, such as avoiding inline functions in functions, downtranspilation
- [esquery](https://github.com/estools/esquery/pull/134) - replaces `String.prototype.split`, avoids downtranspilation of `for..of`, hoist constants. | [blog post📖](https://marvinh.dev/blog/speeding-up-javascript-ecosystem-part-3/)
- [joypixels/emoji-toolkit](https://github.com/joypixels/emoji-toolkit/pull/57) - caches expensive RegExps result | [blog post📖](https://marvinh.dev/blog/speeding-up-javascript-ecosystem-part-5/)
- [lucagez/slow-json-stringify](https://github.com/lucagez/slow-json-stringify/pull/31) - hoists RegExpses & functions, replaces `Array.prototype.map` with `for` loops, uses `?.` instead of `||{}`
- [jshttp/cookie](https://github.com/jshttp/cookie/pull/144) - caches `length` of string in `while` loop

### Data Structures

- [fabian-hiller/valibot](https://github.com/fabian-hiller/valibot/pull/68) - converts `Set` to `Array`
- [pnpm](https://github.com/pnpm/pnpm/pull/6749) - converts objects to `Set` and `Map`
- [preact/signals](https://github.com/preactjs/signals/pull/136) - converts `Set` to Linked Lists, adds lazy value evaluation

### Unsorted

- [npm scripts📖](https://marvinh.dev/blog/speeding-up-javascript-ecosystem-part-4/) - Lazy module load, `Intl.Collator` over `String.prototype.localeCompare`
- [deno](https://github.com/denoland/deno/pull/12265) - attribute assignment in constructur is faster than class field expressions
- [node-semver](https://github.com/npm/node-semver/pull/536/files) - bit flags instead of string manipulation
- [node-semver](https://github.com/npm/node-semver/pull/528) - `Object#freeze` for lower memory consumption at around equal perf
- [typescript](https://github.com/microsoft/TypeScript/pull/52656) - `var` is faster than `let/const` in the specific use case of TypeScript
- [graphql-js](https://github.com/graphql/graphql-js/pull/3687) - `for..of` downtranspilation & destructuring optimization
- [preact/signals](https://github.com/preactjs/signals/pull/160) - converts ES6 classes to ES5 classes for higher performance

### Blog Posts with Code 📖

- [Don’t attach tooltips to document.body](https://atfzl.com/articles/don-t-attach-tooltips-to-document-body/)
- [[Typia] Hidden Class Optimization of v8 Engine](https://dev.to/samchon/secret-of-typia-how-it-could-be-20000x-faster-validator-hidden-class-optimization-in-v8-engine-1mfb)
- [Bluebird](https://www.reaktor.com/articles/javascript-performance-fundamentals-make-bluebird-fast) - minimize function object allocation, use bit flags
- [Confluence Whiteboards](https://www.atlassian.com/engineering/rendering-like-butter-a-confluence-whiteboards-story) - DOM event delegation, Finite State Machines, Entity Component System, WebGL optimization

#### Algorithmic

- [High Performance Text Parsing Using Finite State Machines](https://hackernoon.com/high-performance-text-parsing-using-finite-state-machines-fsm-6d3m33j9) - replacing RegExps with Finite State Machines
- [How to Compare Arrays in JavaScript Efficiently](https://dev.to/doabledanny/how-to-compare-arrays-in-javascript-efficiently-1p0) - using Frequency Counter Objects to reduce the Big O complexity from `O(n²)` to `O(n)` | awesome due to explaning code in-depth

### Perf Audits 📝

- [Web performance case study: Wikipedia page previews](https://techblog.wikimedia.org/2020/11/23/web-performance-case-study-wikipedia-page-previews/) - avoiding layout trashing
- [npm install is slower with a progress bar](https://github.com/npm/npm/issues/11283#issuecomment-175246823) - the curious case where a progress bar made `npm i` significantly slower, due to expensive CLI/draw calls - solved by throttling
- [CNet, Times, Wikipedia, Google Play perf audits](https://docs.google.com/document/d/1K-mKOqiUiSjgZTEscBLjtjd6E67oiK8H2ztOiq5tigk/view#heading=h.hz6e7660btmo) - 2015
- [NYTimes perf audit](https://docs.google.com/document/d/1Oax3j0-wsYlNQCfgJTtPHlOWJ-ilRvk-I9E3mhiyl5I/edit#heading=h.mxlya9axneww) - 2017
- [Notion perf audit](https://3perf.com/blog/notion/) - defer JS, Babel tweaks, code splitting, caching and more
- [Walmart perf audit](https://iamakulov.com/notes/walmart/) - remove old polyfills, CSS & font tweaks
- [Causal perf audit](https://3perf.com/blog/causal/) - React performance tweaks

## CSS & Rendering

Patches focused on CSS performance improvements.

- [nuka-carousel](https://github.com/FormidableLabs/nuka-carousel/pull/796) - removes huge layers by fixing negative `z-index`

### Blog Posts with Code 📖

- [Selector performance](https://blogs.windows.com/msedgedev/2023/01/17/the-truth-about-css-selector-performance/) - guidelines for performant CSS selectors
- [Need cheap paint? Use getComputedStyle().opacity](https://webventures.rejh.nl/blog/2022/getcomputedstyle-element-opacity/) - replace double `requestAnimationFrame` callbacks for higher perf

#### Animations 💫

- [Animation performance](https://motion.dev/guides/performance) - guidelines for performant CSS/JS animations
- [Animating a blur](https://developer.chrome.com/blog/animated-blur/) - animating blur's the performant way
- [CSS Box Shadows and Optimize Performance](https://www.sitepoint.com/css-box-shadow-animation-performance/) - animating box shadows the performant way

## HTML

Patches focused on HTML performance improvements (in reality, it's more like only blog posts 📖).

- [SVG icon stress test](https://cloudfour.com/thinks/svg-icon-stress-test/) - benchmarks the best way to embed `<svg>`s
- [Avoid an excessive DOM size](https://developer.chrome.com/docs/lighthouse/performance/dom-size/)
- [Redirect Liquidation](https://calendar.perfplanet.com/2021/redirect-liquidation/) - removing redirects using the Edge

## Contribute

Contributions welcome! Read the [contribution guidelines](contributing.md) first.
