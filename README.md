# fan2c

### My FFL app using 
 - [Express JS](http://expressjs.com/) 4.x (eventually 5.x)
 - [React](https://facebook.github.io/react/) >= 0.14.6
 - [Babel](http://babeljs.io/) >= 6
 - [Kube CSS Framework](https://imperavi.com/kube/) >= 5.0

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

## License

The MIT License (MIT)

Copyright (c) 2016 Deryck Henson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
