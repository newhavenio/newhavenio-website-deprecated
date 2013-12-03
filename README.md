newhaven.io
===========

This is the code for the
[newhaven.io](http://www.newhaven.io) website. It's just a
placeholder right now. If you'd like to help build the
site (and the New Haven hacker community) please get in touch.  You can
find fellow New Haven hackers via

* the [newhaven.io Google group](https://groups.google.com/forum/?fromgroups#!forum/newhavenio);
* the [newhaven.io Twitter account](http://twitter.com/newhavenio)
* the #newhavenio IRC channel on Freenode.

## WARNING

These are completely out of date now.  Somebody will update
them within the next few days.

## Quickstart (OS X)

```
git clone https://github.com/newhavenio/newhavenio-website
cd newhavenio-website

brew install node
brew install mongodb
brew install phantomjs

gem install bundler
bundle

foreman start -f Procfile.dev
```

## Requirements

The newhaven.io website is a single-page
[Angular.js](http://angularjs.org/) application
that is hosted on [S3](http://aws.amazon.com/s3/)
as a set of static assets.  Those static
assets are built locally using
[Yeoman](http://yeoman.io/),
[Bower](http://bower.io/), and
[Grunt](http://gruntjs.com/) as described in the
[Yeoman documentation](https://github.com/yeoman/yeoman/wiki/Getting-Started).

To make changes to the website, you'll need a few
tools in your environment, mostly Yeoman, Bower, Grunt
and their dependencies, all of which are based on the
[node.js](http://nodejs.org/) stack.  The following
instructions will help you install those tools.  (These instructions are
a tad pedantic for the benefit of those who would like to contribute
but perhaps have less development experience.)

### Installing node and npm

If you're on a mac, it's likely easiest to install node via
[homebrew](http://brew.sh/).  If you're on another *nix machine,
you can likely figure this out for yourself.  If you're on windows,
you're on your own.

    brew install node

Then, you'll need to install [npm](https://npmjs.org/),
the node package manager.

    curl https://npmjs.org/install.sh | sh

### Checking out this repo

First, you'll need to check out this repository.

    git clone https://github.com/newhavenio/newhavenio-website
    cd newhavenio-website

### Installing the dependencies

The server-side dependencies for the newhaven.io website (those
things we need to build the site) are enumerated in `package.json`.
To install the dependencies do

    npm install

from the copy of the repo that you checked out.  That will create
a directory called `node_modules`, which is ignored via our `.gitignore`
file.  The `node_modules` directory contains a subdirectory called
`.bin` into which a number of executable scripts are placed.  We
need to run some of these during
our build process, so we want to make sure they're in our path.
If you're using a Bourne-decended shell (bash, zsh, etc.) you can
add the `.bin` directory to your path like

    export PATH="./node_modules/.bin:$PATH"

*Note:* you'll probably want to do that every time you work on the site.

Now we want to install our client-side dependencies, like
[jQuery](http://jquery.com/), Angular, etc.  These are enumerated in
`bower.json`. You can install those dependencies via

    bower install

which populates the directory `app/bower_components`.  Now you've
got everything you need to test, build, and deploy the site.

## Developing

### Working on the site

You can preview any changes you're making live by running

    grunt server

This will open up a browser window and automatically refresh
as you make changes to different files.

### Testing the site

There are a handful of tests, just for grins.  To run these,
you'll need [PhantomJS](http://phantomjs.org/), which you can
install by running

    brew install phantomjs

Then, you can run the tests like

    grunt test

### Building the site

To build the site, run

    grunt build

This will compile, concatenate, minify, and version all our
assets, placing them into the `dist` directory.

### Deploying the site

To deploy the site, you'll need to set two environment variables:
`AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`.  These are the
credentials that allow you to write to the www.newhaven.io bucket
on S3.  If you're on of these people that has these credentials,
you can deploy using

    grunt deploy

It is likely most convenient to keep your credentials in a `.env`
file, which is ignored in `.gitignore`, and to run the grunt deployment
task using [foreman](https://github.com/ddollar/foreman) or one of
its variants.  E.g.

    foreman run grunt deploy

## Contributors

The following people generously donated their time to building
the newhaven.io website.  You should generously donate yours too!

* [Devin Weaver](https://github.com/sukima)
* [Chris Fidao](https://github.com/fideloper)
* [Adam Soffer](http://github.com/ads1018)
* [Joel Nimety](https://github.com/jnimety)
* [Dan Bernier](https://github.com/danbernier)
* [Zach Morek](https://github.com/ZachBeta)
* [Krishna R. Sampath](https://github.com/KrishnaRSampath)
* [Kyle Jensen](http://github.com/kljensen)

## License

Copyright (c) 2013 the Contributors (see above)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
