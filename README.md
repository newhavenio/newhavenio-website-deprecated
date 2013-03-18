newhaven.io
======

This is the code for the [newhaven.io](http://www.newhaven.io) website.  Just a placeholder right now.
If you'd like to help build something, please get in touch.  There's a
[Google group](https://groups.google.com/forum/?fromgroups#!forum/newhavenio).

## Requirements

The placeholder site is just statically generated assets that are hosted on AWS's S3.

To deploy the site you'll need [s3cmd](http://s3tools.org/s3cmd), which you can install
via homebrew, e.g.

	brew install s3cmd

You'll also need a `.s3cfg` file containing at least the following lines

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
