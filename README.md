newhaven.io
===========

This is the code for the [newhaven.io](http://www.newhaven.io) website.  
It's just a placeholder right now. If you'd like to help build the
site (and the New Haven hacker community) please get in touch.  You can
find fellow New Haven hackers via

* the [newhaven.io Google group](https://groups.google.com/forum/?fromgroups#!forum/newhavenio);
* the [newhaven.io Twitter account](http://twitter.com/newhavenio)
* the #newhavenio IRC channel on Freenode.

## Requirements

The newhavenio.io website is statically generated and hosted on AWS's S3
service.  To make changes to the website, you'll need a few
[Ruby](http://www.ruby-lang.org/) tools in your environment.  The following
instructions will help you install those tools.  (These instructions are
a tad pedantic for the benefit of those who would like to contribute
but perhaps have less development experience.)

### Setting up your Ruby environment

...todo.  Deps are in the `.rvmrc` file.

## About thew newhaven.io site

newhaven.io is powered in part by [Gumby 2](http://gumbyframework.com/), a
front-end toolkit created by New Haven's own
[Digital Surgeons](http://www.digitalsurgeons.com/).  The design
was created by [Adam Soffer](http://github.com/ads1018).

Gumby 2 uses Sass and Compass which you'll need to install to get your environment
set up correctly.  (See the section above on setting up your environment.)
Gumby 2 has a nice set of docs you can check out [here](http://gumbyframework.com/docs/sass/).

## Running locally

[Usage · mojombo/jekyll Wiki](https://github.com/mojombo/jekyll/wiki/usage#running-jekyll)

    jekyll --server
    open localhost:4000

## Building and deploying

To build the .css assets, run

    compass compile

To deploy the site you'll need [s3cmd](http://s3tools.org/s3cmd), which you can install
via homebrew, e.g.

    brew install s3cmd

or, via bundle/gem.  You'll also need a `.s3cfg` file containing at least
the following lines

    [default]
    access_key=YOUR-ACCESS-KEY-GOES-HERE-YO
    secret_key=YOUR-SECRET-KEY-GOES-HERE-YO

You can get deployment keys from Kyle.  To run a deployment, do 

    sh ./deploy.sh

## Contributors

* [Adam Soffer](http://github.com/ads1018)
* [Joel Nimety](https://github.com/jnimety)
* [Dan Bernier](https://github.com/danbernier)
* [Zach Morek](https://github.com/ZachBeta)
* [Krishna R. Sampath](https://github.com/KrishnaRSampath)
* [Kyle Jensen](http://github.com/kljensen)

Your name could be here!  
