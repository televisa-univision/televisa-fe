# univision-fe-utilities
Shared and agnostics Utilities for Univision.

Features
=========

* Frameworks free
* Agnostic of environment (works on sever, client, mobile apps) 
* Few external dependencies
* Auto-documented
* CommonsJS and ESM support

Quick Start
===========

Install node [active LTS][noderelease] version
```sh
$ yarn
$ yarn start
```
* Go to `http://localhost:6007/` for the Storybook
* And `http://localhost:6008/` for the Documentation
* `Ctrl + C` to stop services

The [storybook][storybook] in this library is mostly for documentation, check also the [docs][docs].

Structure
==========
**Helpers:**
All the `lodash` like helpers to perform validation or actions around JavaScript types/primitives, the helpers are organize per categories:
  - `commons` for helpers required for many other types/categories.
  - `array` for collections or specific for arrays.
  - `object` for all around objects such as `getKey`/`hasKey`.
  - `date` for time/date helpers such convert locale date/time.
  - `string` for performance conversion/formatting on strings.
  - `url` for all related with URL validation or transforms.
  - `content` for specific UVN feed/data validations/actions.

**Styled:**
All `sass` like utilities/mixins/constants for `styled-components` with the follow structure:
  - `mixins` for all the sass like mixins around css propertie.s
  - `constants` for colors, breakpoints and theme definitions or global values.

**Localization:**
UVN localization utility with support of en/es languages and values/keys substitutions with different localization per site:
  - `tudn` all the localization specific for TUDN.
  - `common` all the main localization strings.

**Storage:**
Abstraction of storage APIs that allow extend it to different kind of APIs like indexedDB, WebSQL or SQlite on mobile.

**Util:**
Generic utilities that not touch any JavaScript type/primitive or UVN content, like JavaScript API abstractions. 

Naming Convention 
=================
**Helpers:** All the helper must start with a *verb* or *preposition* such as `convert`, `to`, `from` etc, e.g. `fromArray`, 
all must be [camelCase][camelcase] and should be descriptive.

**Styled/Mixins:** Like the sass mixins, the styled mixins must have the name of the main css scope/properly that are 
changing/affecting, e.g `boxShadow`, in this case **avoid** *verb* such as `get|has|convert`.

**General rule:** In case of the utility is an abstraction or wrapper of an API should have the same or similar name, 
classes must be [StartCase][startcase] (file and declaration) and other modules/functions must be [camelCase][camelcase].

Guidelines
==========

* Keep the helpers/utilities agnostic and free of frameworks.
* Each utility must have you own file and test, avoid many helpers/utilities in a single file to keep the library modular.
* Must have properly documented using [JSdoc][jsdoc] tags such as `@module`, `@private`, `@public`
* Export only the necessary functions, functions not exported should have `@private` to avoid expose it on the docs.
* Avoid use explicit dependencies of Server/Node.js like `fs` even with dynamic import to avoid to break React Native projects.
* Avoid use explicit dependencies of Native.
* Try to not add external dependencies, if you need some special dependency please [check][bundlephobia] the final bundle size before.
* Keep this library tiny.

 [camelcase]: https://en.wikipedia.org/wiki/Camel_case
 [startcase]: https://en.wikipedia.org/wiki/Letter_case#Stylistic_or_specialised_usag
 [jsdoc]: https://framagit.org/dystopia-project/simple-email/merge_requests
 [bundlephobia]: https://bundlephobia.com/
 [noderelease]: https://github.com/nodejs/Release#release-schedule
 [docs]: https://webapp-static-dev.univision.com/docs/utilities/index.html
 [storybook]: https://webapp-static-dev.univision.com/story/utilities/index.html
