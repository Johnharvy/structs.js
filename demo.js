var struct = require("./struct.js");
var s = new struct.Stack([1,2,3,4]);
s.pressIn(5).pressIn(6).pressIn(7);
s.pop(function(item){
     console.log(item)
}).pop(function(item){
    console.log(item);
});