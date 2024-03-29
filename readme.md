# Awesome Performance Patches [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

> 🚀⚡ Awesome lists about performance related patches/PRs.

The purpose of this awesome list is to allow others to learn from performance improvements of the past 📝, so that you can submit your performance improvement sooner or later here as well 🤝.

<sub>The list also includes blog posts without PRs, if they contain enough code to make them useful for this purpose. 
<br>⭐ marks blog posts or articles covering a lot of areas with in-depth explanations.</sub>

For Web Performance, there are a few more lists of curated links of talks, newsletters, blogs and more:<br />
➡️ [fabkrum/web-performance-resources](https://github.com/fabkrum/web-performance-resources/blob/master/index.md)
➡️ [imteekay/web-performance-research](https://github.com/imteekay/web-performance-research)
➡️ [nucliweb/webperf-snippets](https://github.com/nucliweb/webperf-snippets)

<sub>Hint: What improves performance might change over time; always re-validate assumptions by benchmarking.</sub><br />
<sub>Follow me on [Twitter](https://twitter.com/kurtextrem) for updates.</sub>

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
- [HTML & Web Vitals](#html--web-vitals)
- [TypeScript](#typescript)

## JavaScript

Patches focused on JavaScript performance improvements.
<small>

- [nodejs-bench-operations](https://github.com/RafaelGSS/nodejs-bench-operations) might be a good starting point to get an idea of what's fast.
- [MythBusters JS](https://mythbusters.js.org/) - A JavaScript Handbook exploring performance & readability.
- [v8-perf](https://github.com/thlorenz/v8-perf) - Notes and resources related to v8 and thus Node.js performance.

</small>

### Caching / Doing less work

- [pnpm](https://github.com/pnpm/pnpm/pull/6317) - cache results | [blog post📖](https://jakebailey.dev/posts/pnpm-dt-2/)
- [Speeding up the JavaScript ecosystem by Marvin Hagemeister📖](https://marvinh.dev/blog/speeding-up-javascript-ecosystem/) | ⭐
  - [postcss-plugins](https://github.com/csstools/postcss-plugins/pull/737) - avoid expensive RegExps
  - [svgo](https://github.com/svg/svgo/pull/1716) - avoid casting
  - [svgo](https://github.com/svg/svgo/pull/1717) - avoid double RegExps calls
  - and other topics, such as avoiding inline functions in functions, downtranspilation
- [esquery](https://github.com/estools/esquery/pull/134) - replace `String.prototype.split`, avoid downtranspilation of `for..of`, hoist constants. | [blog post📖](https://marvinh.dev/blog/speeding-up-javascript-ecosystem-part-3/)
- [joypixels/emoji-toolkit](https://github.com/joypixels/emoji-toolkit/pull/57) - cache expensive RegExps result | [blog post📖](https://marvinh.dev/blog/speeding-up-javascript-ecosystem-part-5/)
- [lucagez/slow-json-stringify](https://github.com/lucagez/slow-json-stringify/pull/31) - hoist RegExpses & functions, replace `Array.prototype.map` with `for` loops, use `?.` instead of `||{}`
- [jshttp/cookie](https://github.com/jshttp/cookie/pull/144) - cache `length` of string in `while` loop
- [recharts](https://github.com/recharts/recharts/pull/3953) - avoid expensive DOM calculations by using an early-exit math calculation | [blog post📖](https://belchior.hashnode.dev/improving-recharts-performance-clp5w295y000b0ajq8hu6cnmm)
- [microsoft/node-jsonc-parser](https://github.com/microsoft/node-jsonc-parser/pull/81) - cache frequently used characters in conditions to save memory and make runtime faster

### Data Structures

- [fabian-hiller/valibot](https://github.com/fabian-hiller/valibot/pull/68) - convert `Set` to `Array`
- [pnpm](https://github.com/pnpm/pnpm/pull/6749) - convert objects to `Set` and `Map`
- [preact/signals](https://github.com/preactjs/signals/pull/136) - convert `Set` to Linked Lists, adds lazy value evaluation
- [TanStack/table](https://github.com/TanStack/table/pull/4495) - replace immutable spread calls with mutable arrays | [blog post](https://jpcamara.com/2023/03/07/making-tanstack-table.html)
- [rollup](https://github.com/rollup/rollup/pull/4862) - replace `Set` with `BigInt` | [Mastodon explainer](https://elk.zone/webperf.social/@lukastaegert@webtoo.ls/109882130404793578)
- [parcel-bundler/parcel](https://github.com/parcel-bundler/parcel/pull/9266) - convert graph to array of BitSets, avoid `new` calls, `Uint32Array` + Wasm instead of `BigInt`, array instead of hash map to avoid hashing cost, fast path stack-based depth-first search to avoid recursion | [Twitter explainer](https://twitter.com/devongovett/status/1712169214872867288)
- [parcel-bundler/parcel(https://github.com/parcel-bundler/parcel/pull/9444) - AdjacencyList tuning
- [xpl/ansicolor](https://github.com/xpl/ansicolor/pull/20) - avoid `delete`, optimize for [v8 hidden classes](https://v8.dev/docs/hidden-classes), use JS generators to allow more frequent GC collection
- [Fast JavaScript with Data-oriented Design📖](https://docs.google.com/presentation/d/1yn87uVuB7oXmRX5uMsdu9_DQP7M5a2jO2xKuRl1ERIo/edit#slide=id.g2b61cb63bcc_0_32) - converts `Map` to typed arrays, uses "parallel arrays" for more efficient CPU cache usage | [Video](https://fosdem.org/2024/schedule/event/fosdem-2024-2773-fast-javascript-with-data-oriented-design/)
- [A 400% faster Performance panel through perf-ception📖](https://developer.chrome.com/blog/perf-panel-4x-faster) - replace `Set` with array to reduce memory consumption if uniqueness is guaranteed, discusses downsides of `Map` for frequent and large data sets, because of rehashing | ⭐

### Unsorted

- [node-semver](https://github.com/npm/node-semver/pull/536/files) - bit flags instead of string manipulation
- [node-semver](https://github.com/npm/node-semver/pull/528) - `Object#freeze` for lower memory consumption at around equal perf
- [typescript](https://github.com/microsoft/TypeScript/pull/52656) - `var` is faster than `let/const` in the specific use case of TypeScript
- [graphql-js](https://github.com/graphql/graphql-js/pull/3687) - `for..of` downtranspilation & destructuring optimization
- [preact/signals](https://github.com/preactjs/signals/pull/160) - convert ES6 classes to ES5 classes for higher performance
- [fabianhiller/valibot](https://github.com/fabian-hiller/valibot/pull/104) - lazy evaluation, "is object" check via `var?.constructor !== Object`, array tuples to flat array
- [nodejs/node](https://github.com/nodejs/node/pull/49745) - replace N boolean props with one bitmap
- [fabianhiller/valibot](https://github.com/fabian-hiller/valibot/pull/180#issuecomment-1751250891) - avoid (negative) look-aheads for faster regexp execution
- [ai/nanoid](https://github.com/ai/nanoid/pull/310/files) - re-ordered alphabet for smaller brotli compression
- [astro](https://github.com/withastro/astro/pull/9614) - `AsyncIterable` instead of a `ReadableStream`

### Blog Posts with Code 📖

- [Don’t attach tooltips to document.body](https://atfzl.com/articles/don-t-attach-tooltips-to-document-body/)
- [Bluebird](https://www.reaktor.com/articles/javascript-performance-fundamentals-make-bluebird-fast) - minimize function object allocation, use bit flags
- [Maybe you don't need Rust and WASM to speed up your JS](https://mrale.ph/blog/2018/02/03/maybe-you-dont-need-rust-to-speed-up-your-js.html) - post covering insights into various JavaScript engines and low level optimizations | ⭐
- [Confluence Whiteboards](https://www.atlassian.com/engineering/rendering-like-butter-a-confluence-whiteboards-story) - DOM event delegation, Finite State Machines, Entity Component System, WebGL optimization | ⭐
- [That time I 10x'd a TI-84 emulator's speed by replacing a switch-case](https://artemis.sh/2022/08/07/emulating-calculators-fast-in-js.html) - avoid really big `switch..case` statements, replace by manual instruction tables (using arrays)
- [Understanding why our build got 15x slower with Webpack 5](https://www.tines.com/blog/understanding-why-our-build-got-15x-slower-with-webpack-5) - avoid `Symbol.isConcatSpreadable`
- [A Tale of a JavaScript Memory Leak](https://www.just-bi.nl/a-tale-of-a-javascript-memory-leak/) - when working with global RegExp's (`/g`) and very large strings, make sure to check for memory leaks in V8/Chromium (possibly also includes other string functions like `substring`, `slice`, `trim` due to [v8/2869](https://bugs.chromium.org/p/v8/issues/detail?id=2869)
- [High-performance input handling on the web](https://nolanlawson.com/2019/08/11/high-performance-input-handling-on-the-web/) - in-depth guide for how to avoid layout trashing while handling user inputs
- [[Typia] Hidden Class Optimization of v8 Engine](https://dev.to/samchon/secret-of-typia-how-it-could-be-20000x-faster-validator-hidden-class-optimization-in-v8-engine-1mfb) | ⭐
- [npm scripts](https://marvinh.dev/blog/speeding-up-javascript-ecosystem-part-4/) - lazy module load, prefer `Intl.Collator` over `String.prototype.localeCompare`
- [How to optimize Date format operations](https://webperf.tips/tip/date-formatting/) - prefer `Intl.DateTimeFormat` over `Date.toLocaleDateString`
- [My Node.js is a bit Rusty](https://gal.hagever.com/posts/my-node-js-is-a-bit-rusty) - replaces a JS based file parser with a Rust napi implementation for faster execution speed and less memory usage
- [Dragging React performance forward](https://medium.com/@alexandereardon/dragging-react-performance-forward-688b30d40a33) & [Introducing Pragmatic drag and drop by Alex Reardon](https://www.youtube.com/watch?v=5SQkOyzZLHM)

#### Algorithmic

- [High Performance Text Parsing Using Finite State Machines](https://hackernoon.com/high-performance-text-parsing-using-finite-state-machines-fsm-6d3m33j9) - replace RegExps with Finite State Machines
- [How to Compare Arrays in JavaScript Efficiently](https://dev.to/doabledanny/how-to-compare-arrays-in-javascript-efficiently-1p0) - use Frequency Counter Objects to reduce the Big O complexity from `O(n²)` to `O(n)`

### Perf Audits 📝

- [Web performance case study: Wikipedia page previews](https://techblog.wikimedia.org/2020/11/23/web-performance-case-study-wikipedia-page-previews/) - avoid layout trashing
- [npm install is slower with a progress bar](https://github.com/npm/npm/issues/11283#issuecomment-175246823) - the curious case where a progress bar made `npm i` significantly slower, due to expensive CLI/draw calls - solved by throttling
- [CNet, Times, Wikipedia, Google Play perf audits](https://docs.google.com/document/d/1K-mKOqiUiSjgZTEscBLjtjd6E67oiK8H2ztOiq5tigk/view#heading=h.hz6e7660btmo) - 2015
- [NYTimes perf audit](https://docs.google.com/document/d/1Oax3j0-wsYlNQCfgJTtPHlOWJ-ilRvk-I9E3mhiyl5I/edit#heading=h.mxlya9axneww) - 2017
- [Notion perf audit](https://3perf.com/blog/notion/) - defer JS, Babel tweaks, code splitting, caching and more
- [Walmart perf audit](https://iamakulov.com/notes/walmart/) - remove old polyfills, CSS & font tweaks
- [Causal perf audit](https://3perf.com/blog/causal/) - React performance tweaks
- [Uber Eats](https://webperf.tips/tip/uber-eats-dom-parsing/) - avoid too many frequent calls to `DOMParser`

## CSS & Rendering

Patches focused on CSS performance improvements.

- [nuka-carousel](https://github.com/FormidableLabs/nuka-carousel/pull/796) - removes huge layers by fixing negative `z-index`

### Blog Posts with Code 📖

- [Selector performance](https://blogs.windows.com/msedgedev/2023/01/17/the-truth-about-css-selector-performance/) - guidelines for performant CSS selectors
- [Need cheap paint? Use getComputedStyle().opacity](https://webventures.rejh.nl/blog/2022/getcomputedstyle-element-opacity/) - replace double `requestAnimationFrame` callbacks for higher perf
- [Style performance and concurrent rendering](https://nolanlawson.com/2022/10/22/style-performance-and-concurrent-rendering/)
- [Style scoping versus shadow DOM: which is fastest?](https://nolanlawson.com/2022/06/22/style-scoping-versus-shadow-dom-which-is-fastest/)
- [CSS runtime performance](https://nolanlawson.com/2023/01/17/my-talk-on-css-runtime-performance/)

#### Animations 💫

- [Animation performance](https://motion.dev/guides/performance) - guidelines for performant CSS/JS animations
- [Animating a blur](https://developer.chrome.com/blog/animated-blur/) - animating blur's the performant way
- [CSS Box Shadows and Optimize Performance](https://www.sitepoint.com/css-box-shadow-animation-performance/) - animating box shadows the performant way

## HTML & Web Vitals

Patches focused on HTML & Web Vitals performance improvements.

- [SVG icon stress test](https://cloudfour.com/thinks/svg-icon-stress-test/) - benchmarks the best way to embed `<svg>`s
- [Avoid an excessive DOM size](https://developer.chrome.com/docs/lighthouse/performance/dom-size/)
- [Redirect Liquidation](https://calendar.perfplanet.com/2021/redirect-liquidation/) - remove redirects using the Edge
- [Fastest Way of Passing State to JavaScript, Re-visited](https://kurtextrem.de/posts/state-revisited) - use `JSON.parse` and fake script tags for passing states from server to client
- [Techniques for bypassing CORS Preflight Requests to improve performance](https://webperf.tips/tip/optimizing-cors/) - optimize CORS requests by avoiding `OPTIONS` requests
- [sentry](https://github.com/getsentry/sentry/pull/64165) - improve INP by replacing React's `autofocus` implementation with manual focus in the next task
- [Use text-wrap: balance; to improve design and INP](https://www.erwinhofman.com/blog/use-text-wrap-balance-to-improve-inp/) - replace JS based text balancers with the CSS prop
- [INP on HTTPArchive](https://twitter.com/rick_viscomi/status/1754882706951864731) - defer offscreen components to improve early-load INP
- [How PubTech's Consent Management Platform reduced INP on their customers' websites by up to 64%, while also improving ad viewability by up to 1.5%](https://web.dev/case-studies/pubconsent-inp) - "lazy de-rendering", by setting `display:none` first and then remove DOM nodes using `requestIdleCallback`; yield functions for high and background priority

## TypeScript

Patches focused on TypeScript runtime performance improvements (e.g. running `tsc`). The TS team also has a dedicated [wiki page](https://github.com/microsoft/TypeScript/wiki/Performance). [Attest](https://github.com/arktypeio/arktype/tree/2.0/ark/attest#benches) can help you benchmark.

- [sentry](https://github.com/getsentry/sentry/pull/30847) - avoid large unions in favor of `interface`s
- [tRPC](https://twitter.com/s4chinraja/status/1570658634039984128) - avoid disabling the lazy evaluation of TypeScript types

## Contribute

Contributions welcome! Read the [contribution guidelines](contributing.md) first.
