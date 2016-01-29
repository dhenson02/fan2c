# fan2c

### My FFL app using 
 - [Express JS](http://expressjs.com/) 4.x (eventually 5.x)
 - [React](https://facebook.github.io/react/) >= 0.14.6
 - [Babel](http://babeljs.io/) >= 6
 - [Kube CSS Framework](https://imperavi.com/kube/)

and plenty more (see `package.json` for details).

## Requirements

 - screen - `sudo apt-get install screen`
 - [node](https://nodejs.org) ( I'm using **>= 5.5.0**, so I suggest using that )
     - npm ( **3.3.12** works well )
 
## Setup

```bash
npm install
cp config.json.blank config.json 
# ^...edit the config.json to match your league's settings
npm run build 
# ^ or build-dist, watch, or watch-dist
npm start
```

## Who this is for

Players and commissioners of [My Fantasy League](http://www.myfantasyleague.com/) teams/leagues.

## Credits

Please give credit to any of the authors of the attributed packages in the package.json file appropriately.  They all work very hard and deserve some extra traffic :)
