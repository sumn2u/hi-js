
# [hi JS](http://sumn2u.github.io/hi-js)
### Human Assist AI  Admin Code. [![Build Status](https://travis-ci.org/sumn2u/hi-js.svg?branch=master)](https://travis-ci.org/sumn2u/hi-js) [![GitHub issues](https://img.shields.io/github/issues/sumn2u/hi-js.svg)](https://github.com/sumn2u/hi-js/issues) [![GitHub forks](https://img.shields.io/github/forks/sumn2u/hi-js.svg)](https://github.com/sumn2u/hi-js/network) [![GitHub stars](https://img.shields.io/github/stars/sumn2u/hi-js.svg)](https://github.com/sumn2u/hi-js/stargazers) [![GitHub license](https://img.shields.io/github/license/sumn2u/hi-js.svg)](https://github.com/sumn2u/hi-js/blob/develop/LICENSE) [![Twitter](https://img.shields.io/twitter/url/https/github.com/sumn2u/hi-js.svg?style=social)](https://twitter.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fgithub.com%2Fsumn2u%2Fhi-js)

>Try to be a rainbow in someone's cloud. - Maya Angelou


## Admin Panel
- schedule an upcoming meetup,
- add speakers, sponsors and organizations info
- add post-meetup documents, presentations and images (for contribution)

#### How do i start project?
```
fork our hijs repository.

$ git clone git@github.com:[your-github-id]/hijs.git
$ npm install
$ node run start
```


## Contributing
Please refer issues (marked as community responsibility) for contribution.
#### How do I contribute?

- fork our hijs repository.
- run the admin interface
```
$ git@github.com:[your-github-id]/hijs.git
$ npm install
$ npm start
```
- develop / code / fix the issues
- make a Pull Request

## Publishing a changes
Follow these steps to publish a changes.

```
1. fork our hijs repository

2. run admin panel
	$ git clone git@github.com:[your-github-id]/hijs.git
	$ npm install
	$ npm start

	/* it opens a browser, you can also open it in any browser on http://localhost:3000/meetups */

2. add meetup information
	- start adding people and organizations info
	- add episodes info
	- click on publish button

3. commit your changes
	- git add  
	- git commit
	- git push origin develop

4. get peer reviewed and merge to master

```

## Admin directory structure
```
/assets
  /admin/images/people 			: people images which are refrenced in website
  /admin/images/companies 		: organization images which are refrenced in website
  /admin/css					: css for admin interface
  /admin/js						: js for admin interface

  /site/css						: css for site
  /site/images					: images for site
/db 							: database location
/routes 						: express js routes for meetups, people ...
/server
  /templates
    /admin 						: admin templates
/client
  /templates
db.js 							: has database instance
utils.js 						: has utility functions
hi.js 							: has express js configurations and server instance (main file)
package.json 					: npm file
```
## Maintainers

- [@sumn2u](https://github.com/sumn2u)

