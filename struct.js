/**
  *version : 0.5
  *注重简化处理对象及结构常规性问题
  *author: JohnHarvy
*/
var struct = (function(){

  this.dataPocket = {}; //保存strut对象收纳的值

//对未知数量具有相同属性的对象数组按照属性分组
this.getTeamsBy = function(arr,pro){  
    var temp = [];
    var i = 0;
    function do1(arr){
       var stand = arr[0][pro];
        temp[i] = []; 
       var indexs =[]; 
       for (var k = 0;k < arr.length; k++ ){
           if( arr[k][pro] === stand){
            temp[i].push(arr[k]);
            indexs.push(arr[k]);
         }
       }
   (function(){
       for( var j = 0; j< indexs.length; j++){
              arr.pull(indexs[j]);
          }
       })();
    }
   while(arr.length > 0){
        do1(arr);
        i++;
    }
     return temp;
}

// pull can relize delete any element of  an array and Maintain element order
Array.prototype.pull = pull;
function pull(item){
    var a = [];
    a = this;
    var that = this;
    var temp;
    var index;
     (function(){
        for( var z = 0; z < that.length;z++ ){
           if(that[z] === item){
                a[z] = temp;
                a[z] = a[0];
                a[0] = temp;
                index = z;
                z = that.length;
             }
        }
     })();
     a.shift();       
     (function(){
        if(index == 0) return;
        temp = a[index-1];
        for( var y = index-1;y > 0; y--){
              a[y] = a[y -1];
        }
        a[0] = temp;
     })();
     return a; 
}

   /*可以吃掉其他对象成长自己，并支持链式调用*/
   this.contact = function(ob){
            for(var x in ob){
                this.dataPocket[x] = ob[x];
            }
            return this;
        } 

    return this;
    }).call({});

if (typeof module != "undefined" && module !== null && module.exports) module.exports = struct;
else if (typeof define === "function" && define.amd) define(function() {return struct});

