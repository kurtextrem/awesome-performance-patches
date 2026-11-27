# Performance course

A quick, self-paced intro to the findings in this list: 28 short lessons (about 10 minutes each), grouped the way the list is grouped. Each lesson teaches 2 or 3 ideas with a small worked example, a diagram, the fix, and one real measured result from a linked PR or post.

## How to read it

GitHub shows `.html` files as source code, so open the pages in a browser:

- **Everything in one file:** download or clone the repo and open [`course-all-in-one.html`](course-all-in-one.html). It works offline, shows one lesson at a time, and remembers which lessons you marked as complete.
- **One page per lesson:** start at [`00-start-here.html`](00-start-here.html).

Every page is self-contained: CSS, JavaScript and diagrams are inline, and nothing is loaded from the network.

## Lessons

**Measure first**

- 01. [Is it computing or waiting?](01-computing-or-waiting.html)
- 02. [Read a flame graph](02-read-a-flame-graph.html)
- 03. [Benchmarks you can trust](03-benchmarks-you-can-trust.html)

**Do less work**

- 04. [Skip it or put it off](04-skip-or-defer.html)
- 05. [Do it once, reuse the result](05-do-it-once.html)
- 06. [Calls that look cheap but are not](06-calls-that-look-cheap.html)

**Data structures**

- 07. [Index your lookups](07-index-your-lookups.html)
- 08. [Growing and draining lists](08-grow-and-drain-lists.html)
- 09. [Pack data tightly](09-compact-data.html)

**Async**

- 10. [Stop waiting in line](10-stop-waiting-in-line.html)
- 11. [Fewer awaits, bigger writes](11-fewer-awaits-bigger-writes.html)

**Memory**

- 12. [Garbage in hot loops](12-garbage-in-hot-loops.html)
- 13. [Leaks: follow the references](13-leaks-follow-the-references.html)
- 14. [Peak memory: do not hold it all](14-peak-memory.html)

**Strings and parsing**

- 15. [Strings: slices and scanning](15-strings-and-slices.html)
- 16. [Regex and parsing](16-regex-and-parsing.html)

**Rendering and CSS**

- 17. [One frame, and layout thrashing](17-layout-thrashing.html)
- 18. [Keep style changes small](18-style-and-layers.html)
- 19. [Do not render what nobody sees](19-dont-render-the-unseen.html)
- 20. [React re-renders](20-react-re-renders.html)

**Animations**

- 21. [Smooth animations](21-smooth-animations.html)
- 22. [Effects that cost a lot](22-expensive-effects.html)

**Page load and Core Web Vitals**

- 23. [Respond to clicks fast (INP)](23-respond-to-clicks.html)
- 24. [Show the first screen sooner](24-show-the-first-screen-sooner.html)

**TypeScript and tooling**

- 25. [Faster scripts and tests](25-faster-scripts-and-tests.html)
- 26. [Faster type checking](26-faster-type-checking.html)

**Engine internals**

- 27. [Object shapes and inline caches](27-object-shapes.html)
- 28. [Deopts and what your build emits](28-deopts-and-build-output.html)

## Demos

Small Node scripts in [`demos/`](demos/), no packages needed. Run them from this folder, for example `node demos/lookup.js`. Lessons say which demo goes with them.

## Source and updates

The course reflects the list at commit [`cfaa56c`](https://github.com/kurtextrem/awesome-performance-patches/commit/cfaa56c4f994d9348a33761d3b0f8be7e972f702) (27 September 2026). Last updated 22 November 2026. When new links are added to the list, the course can be updated and this commit bumped.

Researched and drafted with AI assistance from the linked sources, then reviewed by a human. Engine details change between versions, so re-check anything engine-specific on your own Node or browser version.
