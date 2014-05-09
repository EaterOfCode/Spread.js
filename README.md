# Spread.js

Spread your data on arrays as you spread nutella on your bread. pretty even.

## So what does it do?

Spread your data. for example inputting ["a","a","b"] will output ["a","b","a"].<br>
So that if you need to bash things you do it controlled. no more nutella rests on one side!<br>
And since it uses a odd-in-the-middle technique all the "unique" items get pushed into the middle ("aaaabc" becomes "aabcaa" f.x.).<br>

## How do I use it?

Install via NPM (`npm i spread.js`) or include `spread.min.js` to your webpage

in NodeJS use `var Spread = require('spread.js')`

## Function reference

### Async

`Spread([ARRAY<number|string>],function(err,result))`:

    Spread([1,2,3,3,2,3,3],function(err,res){ console.log(res) });
    > ["3", "2", "3", "1", "3", "2", "3"]

`Spread([ARRAY<object|array>],KEY_IN_OBJECT,function(err,result))`:

    Spread([{"value":1,"index":0},{"value":2,"index":1},{"value":3,"index":2},{"value":3,"index":3},{"value":2,"index":4},{"value":3,"index":5},{"value":3,"index":6}],'value',function(err,res){ console.log(res) })
    > [{"value":3,"index":2},{"value":2,"index":1},{"value":3,"index":3},{"value":1,"index":0},{"value":3,"index":5},{"value":2,"index":4},{"value":3,"index":6}]

### Sync

`Spread.async([ARRAY<number|string>])`

`Spread.async([ARRAY<object|array>],KEY_IN_OBJECT)`

## License

This all is licensed by the MIT license
