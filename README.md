### "Blockify Text"

Type out some 3D text that looks like it was built out of Legos™! Marvel at that subtle rotation animation!

I made this as a banner for some Twitch live streaming I was doing. You can use it too! Just head to the link at the top of the repo and type out your text. Then you can mask the appropriate region using whatever streaming software you're using. Win!

#### Known Issues

As of this writing WebGL doesn't want to load on FireFox. Could be due to the version of Three.js I'm using but I'm not sure. For now just run it in Chrome.

### Building Yourself

Source code is client-side Typescript. After cloning:

- ```npm install```
- ```typings install```
- ```grunt```

Grunt will provide you with a temporary local web server.

### Credits

The pixel font is "04B-25" and was originally downloaded from (http://www.04.jp.org).

In order to use it in the code I wrote an image parser. It took an image of all the letters typed out and converted it into a JSON file that you can see [here](https://github.com/creativedrewy/blockifytext/blob/master/app/assets/04b25_font.json). That JSON file is loaded in at runtime and used to render the text blocks.
