var struct = require("./struct.js");
var grade = new struct.List();
grade.append(90).append(80).append(70).append(60).print();
grade.getAv = function(){
    var _score = 0;
    (function(){
    while(grade.hasNext()){
            _score = _score +  grade.getCurElement();
            grade.next();
        }
        _score = _score + grade.getCurElement();
        
        
      })();
     return  _score/grade.listSize;
}

console.log(grade.getAv()); //75