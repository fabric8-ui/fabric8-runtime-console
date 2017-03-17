# Fabric8 Runtime Console 

This is the new angular 2 based console for building and running applications on kubernetes and openshift

Included in this stack are the following technologies:

* Language: [TypeScript](http://www.typescriptlang.org) (JavaScript with @Types)
* Framework: [Angular 2](https://angular.io/)
* Module Bundler: [Angular CLI](https://cli.angular.io)
* Design Patterns: [PatternFly](https://www.patternfly.org/)
* Data Visualization: [C3](http://c3js.org/)
* Testing: [Jasmine](http://jasmine.github.io/) (BDD Unit Test Framework), [Karma](https://karma-runner.github.io/1.0/index.html) (Unit Test Runner), [Protractor](http://www.protractortest.org/#/) (E2E Framework), [Istanbul](https://github.com/gotwarlost/istanbul) (Code Coverage)
* Linting: [TsLint](https://github.com/palantir/tslint) (Linting for TypeScript)
* Logging: [js-Logger](https://github.com/jonnyreeves/js-logger) (JavaScript Logger)
* Code Analysis: [Codelyzer](https://github.com/mgechev/codelyzer) (TsLint rules for static code analysis of Angular 2 TypeScript projects)

## Quick Start

**Make sure you have node version >= 6.x.x and Yarn version >= 0.18.1**

Clone/download the repo start editing `app.component.ts` inside [`/src/app/`](/src/app/app.component.ts)

```bash
# clone our repo
git clone https://github.com/fabric8-ui/fabric8-runtime-console.git
cd fabric8-runtime-console

# install the dependencies
npm install

# start the server
npm start
```

Then to be able to use the kubernetes / openshift back end for builds and runtime resources you will need to run a proxy in another shell:

### Check you can connect to some OpenShift cluster

To run this console you need an OpenShift cluster to play with. If you have used `oc login` to connect to something and can run something like:

```
oc get node
oc get pod
```

Then you're good to go. If not consider installing and starting [minishift](https://github.com/minishift/minishift#installation) and then running the `oc login` command it tells you on startup so that you can run the above commands.

### Proxying

We also have built in support for proxying your requests to the OpenShift cluster - this is particularly
useful if your OpenShift cluster doesn't support CORS. By default the console will access the proxy on the
same protocl, host and port as the app is running. You can adjust this using environment variables, and the
sample environments provide good examples of doing this.

#### Sample environments

We provide various sample environments out of the box which make it easier to get started.
The environments are provided as bash scripts in `environments`. To use them run:

```bash
source environments/<environment-name>.sh
```

For example, to connect to devshift:

```bash
source environments/devshift-cluster.sh
```

### Open the console in your browser

Now go to [http://0.0.0.0:4200](http://0.0.0.0:4200) or [http://localhost:4200](http://localhost:4200) in your browser.

**NOTE** often openshift clusters don't have valid certs so when you go to the web console in the cluster your browser shows you a warning about the cert not being valid and asks you if you are sure.

If you don't get a login page your browser may be hiding the login page for this reason.

If so try open the console for the cluster you are trying to access. e.g. https://int.rdu2c.fabric8.io:8443/console/ then going through the browser windows to get to the login page so that you accept the cert. 

Then try reload your tab on [http://0.0.0.0:4200](http://0.0.0.0:4200) and you hopefully will get the login page!

### If you don't have a kubernetes or openshift cluster

To setup your own local kubernetes or openshift cluster the [fabric8 getting started guide](https://fabric8.io/guide/getStarted/gofabric8.html)

Or you can setup `kubectl` or `oc` to point to a known cluster. 


## Table of Contents

* [File Structure](#file-structure)
* [Getting Started](#getting-started)
  * [Dependencies](#dependencies)
  * [Installing](#installing)
  * [Running](#running)
  * [Testing](#testing)
  * [Configuring](#configuring)
* [Contributing](#contributing)
* [Resources](#resources)


### File Structure

We use the component approach in our starter. This is the new standard for developing Angular apps and a great way to ensure maintainable code by encapsulation of our behavior logic. A component is basically a self contained app, usually in a single file or a folder with each concern as a file: style, template, specs, e2e, and component class.

```plain
ipaas-client/
 │
 ├──docs/                         * our documentation
 |   ├──commands.md               * additional cli commands available to us
 |   ├──contributing.md           * contribution guidelines
 |   ├──entities.md               * entities/models and their relationships for reference
 │   ├──faq.md                    * frequently asked questions about using ipaas
 │   ├──overview.md               * a technical overview for understanding the project
 │   └──typescript.md             * some typescript tips and resources
 │
 ├──src/                          * our source files that will be compiled to javascript
 │   │
 │   ├──app/                      * our Angular 2 application
 │   │   │
 │   │   ├──user/                 * an example 'user' component, based on an entity/model. can be nested further.
 │   │   │   ├──user.component.ts * the primary Angular component file; essentially a controller + directive combined
 │   │   │   ├──user.e2e.ts       * our e2e test for the user component
 │   │   │   ├──user.html         * our HTML user template for the user component
 │   │   │   └──user.spec.ts      * our unit test for the user component
 │   │   │
 │   │   ├──app.component.ts      * a simple version of our App component components
 │   │   ├──app.e2e.ts            * a simple end-to-end test for /
 │   │   └──app.spec.ts           * a simple test of components in app.ts
 │   │
 │   ├──assets/                   * static assets are served here
 │   │   ├──robots.txt            * for search engines to crawl your website
 │   │   └──service-worker.js     * ignore this. Web App service worker that's not complete yet
 │   │
 │   ├──polyfills.ts      * our polyfills file
 │   └--index.html                * our primary layout that contains subviews
 │
 ├──.gitignore                    * let git know which files to ignore and not stage for commit
 ├──karma.conf.js                 * karma, our test runner, config file
 ├──LICENSE                       * iPaaS is available for use under the Apache 2.0 license
 ├──npm-shrinkwrap.json           * npm's way of allowing us to control exact versions of dependencies
 ├──package.json                  * what npm uses to manage it's dependencies
 ├──protractor.conf.js            * protractor, our e2e testing framework, config file
 ├──README.md                     * this exact file :)
 ├──tsconfig.json                 * typescript compiler config
 ├──tslint.json                   * typescript lint config
```

## Getting Started

### Dependencies

What you need to run this app:

* `node` (`brew install node` for OS X users)
* `yarn` (see [https://yarnpkg.com/en/docs/install](https://yarnpkg.com/en/docs/install))
* Ensure you're running the latest versions Node `v6.x.x`+ and Yarn

### Installing

* `fork` the ipaas repo
* `clone` your fork
* `yarn` to install all dependencies
* `npm start` to start the dev server

### Running

After you have installed all dependencies you can now run the app. Run `ng serve` to start a local server which will watch, build (in-memory), and reload for you. The port will be displayed to you as `http://0.0.0.0:4200` (or if you prefer IPv6, then it's `http://[::1]:4200/`).

#### Development

# in one shell to expose your kubernetes cluster:
```bash
kubectl proxy
```

```bash
npm start
```

#### Production

```bash
ng serve --prod -aot
```

For a list of common commands, see [here](/docs/commands.md).

## Testing

### Watch and Run Tests

```bash
ng test
```

### Run Tests

```bash
ng test --watch=false
```

For a list of common commands, see [here](/docs/commands.md).

## Configuring

Configuration files live in `/config`. Configuration files are currently available for Webpack, Karma, and Protractor.

## Contributing

Pull requests are always welcome. Please read through our [Contribution](/docs/contributing.md) guidelines in the `/docs` directory.
