# @Shinpi/Stuff API

The base URL is:
```
https://shinpitekita.repl.co/api/{enpoint}
```

As of writing, there only 4 endpoints that have been added!

Most of the current endpoints just require you to fetch;
```js
const axios = require('axios'); // You can use any other package for this

(async () => {
const url = 'https://shinpitekita.repl.co/api/{enpoint}'
const fetched = await axios.get(url);
console.log(fetched.data.text)
})();
```
## Owoify
Modifies Your Text To A Funny OWO Text<br>
[Example](https://shinpitekita.repl.co/api/owoify?text=this+is+example)
EndPoint: **/api/owoify?text={your text}**
## Reverse
Reverse Your Text<br>
[Example](https://shinpitekita.repl.co/api/reverse?text=this+is+example)
EndPoint: **/api/reverse?text={your text}**
## Random Hex
Get A Random Hex Code<br>
[Example](https://shinpitekita.repl.co/api/hex)
EndPoint: **/api/hex**
## Replace Word
Looks For A Word And Replaces It With Another Word
[Example](https://shinpitekita.repl.co/api/replaceword?text=hello&replace=hi&sentence=hello%20i%20like%20cookies)
EndPoint: **/api/replaceword?text={word to find}&replace={replace with}&sentence={your sentence}**
