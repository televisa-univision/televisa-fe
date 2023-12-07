# univision-fe-e2e

###### Automated E2E Testing for the Univision Web App, Powered by [Cypress](http://cypress.io/).

Quick Start

- Rename `.env.example` to `.env`.
- Configure your `.env` file (web app domain, etc)
- Install dependencies

```sh
$ yarn
```

#### To run on your local machine

```sh
# All test cases for Desktop env
$ yarn cypress:run:desktop
```

```sh
# All test cases for Mobile env
$ yarn cypress:run:mobile
```

```sh
# All tests
$ yarn cypress:run:all
```

#### To run on your local machine through the Cypress dashboard

```sh
# Desktop env
$ yarn cypress:open:desktop
```

```sh
# Mobile env
$ yarn cypress:open:mobile
```

# Main directories

- `cypress/cypress/config`: main config object
- `cypress/cypress/fixtures`: config files with reusables values for each test
- `cypress/cypress/plugins`: Cypress plugins are added here
- `cypress/cypress/support`: custom Cypress commands are added here
- `cypress/src/tests`: all test files grouped by folders depending on content type

# Documentation

- [Cypress API](https://docs.cypress.io/api/api/table-of-contents.html)
  - [Core Concepts](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html)
  - [Best Practices](https://docs.cypress.io/guides/references/best-practices.html)

# Guidelines

- First off, read the core concepts and best practices before writing any tests.
- Tests are implemented based on content types. Then, inside each test suite the assertions are organized in three categories: user interface, ads, and tracking.
- Each content type folder has a README.md that has more details about what needs to be tested in its test suites. If a new folder is added, a new README.md should also be added with it.
- Understand that Cypress works with a command queue. This means that sometimes values that have been obtained will not be available in the following lines unless a `.then` chainable is used. Please read more about this in the docs.
- Each test (anything wrapped in a `it() {}`) should be independent from all other tests. This means that if a test is run by using `it.only` it should still pass.
- Avoid using arrow functions when writing tests, as this causes issues with Cypress context. Please read more about how this works in the docs.
- Use fixtures to reuse code.
- Cypress is JS, so we can still reuse shared variables. Let's keep tests DRY.
- Before writing a test, think if the use case is already being tested in a unit test. If it is, then we don't need it.
- If a mobile feature behaves exactly the same as a desktop feature, then we only need to add one test. Favor mobile since most of our users are there.
