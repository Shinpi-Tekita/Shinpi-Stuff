# @Shinpi/Stuff API

The base URL is:
```
https://shinpitekita.repl.co/{enpoint}
```

As of writing, there only 4 endpoints that have been added!

Most of the current endpoints just require you to fetch;
```js
const axios = require('axios'); // You can use any other package for this

(async () => {
const url = 'https://shinpitekita.repl.co/{enpoint}'
const fetched = await axios.get(url);
console.log(fetched)
})();
```
## Owoify
Modifies Your Text To A Funny OWO Text<br>
[Example](https://shinpitekita.repl.co/owoify?text=this+is+example)<br>
EndPoint: **/owoify?text={your text}**
## Meme
Get A Random Meme From Reddit<br>
[Example](https://shinpitekita.repl.co/meme?amount=1)<br>
EndPoint: **/meme?amount={any amount}**
## Reverse
Reverse Your Text<br>
[Example](https://shinpitekita.repl.co/api/reverse?text=this+is+example)<br>
EndPoint: **/reverse?text={your text}**
## Communism
Get A Random Hex Code<br>
[Example](https://shinpitekita.repl.co/communism?image=https://avatars.githubusercontent.com/u/82416698?v=4%22%20alt=%22Shinpi%22%20width=%2255%22%20height=%2255%22)<br>
EndPoint: **/communism?image={image url}**
