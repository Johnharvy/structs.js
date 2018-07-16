/**
  *version : 0.5
  *注重简化处理对象及结构常规性问题
  *author: JohnHarvy
*/
var struct = (function(){
    
// pull can relize delete any element of  an array and Maintain element order
Array.prototype.pull = function (item){

    var that = this;
    var temp; 
    var index;

     (function(){
        
        for( var z = 0; z < that.length; z++){

           if(typeof item === "object"? (struct.tools.compareJsOb(item,that[z])) : (that[z] === item)){
                that[z] = temp;
                that[z] = that[0];
                that[0] = temp;
                index = z;
                z = that.length;
             }
        }
     })();

     that.shift();   

     (function(){
        if(index === 0) return;
        temp = that[index-1];
        for( var y = index-1;y > 0; y--){
              that[y] = that[y -1];
        }
        that[0] = temp;
     })();
     return that; 
}

this.tools ={ 
      compareJsOb : function(o1,o2){  //比较两个对象是否键值对相等
                    var _1 = o1, _2 = o2, _3 = false;
                    _1 = JSON.parse(JSON.stringify(_1))
                    _2 = JSON.parse(JSON.stringify(_2))
                    __1 = Object.keys(_1)
                    __2 = Object.keys(_2)
                    if(__1.length != __2.length) return _3 
                    for(var p in __1){
                    if(_1[__1[p]] != _2[__2[p]]) return _3 
                    }
                    return !_3;
                },

}

           return this;
}).call(Object.create(null));

  /*List dataStruct,列表结构*/
  struct.List =  function List(list){
    this.listSize = 0;  //用来控制元素个数
    this.pos = 1; //当前位置
    this.dataStore = list? list : []; //存储元素的地方

    this.clear = function(){ //清空列表,链式
        this.listSize =  0;
        this.dataStore.length = 0;
        this.pos = 1;
        return this;
     }

    this.print= function(){ //打印列表内容,链式
       console.log (this.dataStore.toString().replace(/,/g,"\n"));
       return this;
    }

    this.getCurElement = function(){  //返回当前位置的元素
       return this.listSize === 0 ?   false : this.dataStore[this.pos-1];
    }


    this.length = function(){  //返回元素的个数
        return this.listSize;
    }

    this.append =function(ob){  //末尾添加元素，链式
        this.dataStore.push(ob);
        this.listSize++;
        return this;
    }

    this.insert = function(ob){  //插入元素,链式
        var that = this;
        (function(){
            for(var i = (that.listSize-1); i > (that.pos-1); i--){
               that.dataStore[i+1] = that.dataStore[i];
            }
        })();
        that.dataStore[that.pos] = ob;
        that.listSize++;
        that.pos++ ;
        return this;
    }

    this.find = function(ob){ //找到元素的序列位置
        var _index = 0;
        var that = this;
        (function(){
            for(var i = 0; i < that.listSize; i++){
                if(that.dataStore[i] === ob ){
                      _index = i+1;
                }
            }
        })();
        this.pos=_index;
        return _index;
    }

    this.remove = function(ob){  //删除某元素
        var _index = this.find(ob);
        var that = this;
        (function(){
             for(var i = _index - 1; i < that.listSize - 1; i++ ){
                that.dataStore[i] = that.dataStore[i+1];
             }
        })();
        this.dataStore.pop();
        this.listSize--;
        if(this.pos > 1)  this.pos--;
    }

    this.next = function(){  //下一个元素,链式
         if(this.pos < this.listSize) this.pos++;  
          return this;
       
    }

    this.last = function(){  //上一个元素，链式
         if(this.pos > 1) this.pos--; 
          return this;
        
    }

    this.moveTo = function(index){ //移动到指定位置,链式
         if(index > 0  && index <= this.listSize){
                this.pos = index;
                return this;
         }
         else return false;
    }

    this.hasNext = function(){  //判断是否有下个元素
        return this.pos < this.listSize? true : false;       
    }

    this.hasLast = function(){ //判断是否有上一个元素
        return this.pos > 1? true : false;
    }  

}

/**
 *  栈
 */
  
   struct.Stack = function(list){
         this.dataStore = list? list : [];
         this.top = top;
         this.pop = pop;
         this.push = push;
         this.pressIn = pressIn;
         this.peek = peek;
         this.clear = clear;
         this.length = length;

         

         //弹出顶部元素 
         function pop(callback){
             if(!this.length()) return; 
             var _p =  this.dataStore.pop();
             callback && callback(_p);
             return this;
         }

         //压入尾部
         function push(item){
               this.dataStore.push(item);
         }

         //压到底部
         function pressIn(item){
             this.dataStore.push(item);
             for(var i = this.dataStore.length - 1; i > 0; i-- ){
                 this.dataStore[i] = this.dataStore[i-1];
             }
             this.dataStore[0] = item;
              return this;
         }

         //查看栈底元素
         function peek(){
             if(!this.length()) return;
             return this.dataStore[0];
         }

         //查看栈顶元素
         function top(){
            if(!this.length()) return;
             return this.dataStore[this.length()-1];
         }

         //清空栈
         function clear(){
              this.dataStore = [];
              return this;
         }

         //查看栈的长度
         function length(){
             return this.dataStore.length;
         }

   }


 /**
  *   队列
  */  

  struct.Queue = function(list){
          this.dataStore = list? list : [];
          
  }



/**
 *  此下为struct补充部分
 */


//对未知数量具有相同属性的对象数组按照属性分组
struct.getTeamsBy = function(arr,pro){ 
    
       //如果arr不是对象组成的数组,属性不是共有属性
        for(var _x_y = 0 ; _x_y < arr.length; _x_y++){
          if(typeof(arr[_x_y]) != "object" ){
             console.error("数组参数格式错误！");
             return;
          } 
    
          if(arr[_x_y][pro] === undefined){
             console.error("该属性非公共属性！");
             return;
          }
        }
        var temp = [];
        var i = 0;
    
        function do1(arr){
           var stand = arr[0][pro]; //基数组第一个设为标准
           temp[i] = [];  //用来存放找到的一组数据
           var indexs =[]; //存放属性值相同的元素
           for (var k = 0;k < arr.length; k++ ){
               if( arr[k][pro] === stand){
                temp[i].push(arr[k]);
                indexs.push(arr[k]);
             }
           }
       (function(){
           for( var j = 0; j< indexs.length; j++){
                  arr.pull(indexs[j]); //基数组删除已排列好的元素
              }
           })();
        }
    
       while(arr.length > 0){ //数组不为空
            do1(arr);
            i++;
        }
         return temp;
    }
    
    
    /*叉树数据结构平面化查找处理,返回层次位置，所在层序列位置，值重复时的序列位置*/
        struct.deriveFind2D = function(ob,item){
            var Teams = [];
            var i = 0;
            Teams[i] =[];
    
            function examOb(obArr){ //检查某列数组中是否有下续对象
               for(var x in obArr){
                 if(typeof(obArr[x]) == "object"){
                    return true;
                   }
                }
               return false;
            }
               //第一列集合
            (function(){
              for( var x in ob){
               Teams[0].push(ob[x]);
              }
            })();  
    
            while(examOb(Teams[i])){
              var _a = i+1;
              Teams[_a] = [];
             
            (function(){
                 for(var x in Teams[i]){ //每层数组中检索
                  if(typeof(Teams[i][x]) == "object"){
                   for(var y in Teams[i][x]){  //每层数组中每个元素的属性
                    Teams[_a].push(Teams[i][x][y]);
                     }
                   }
                  }
              })();
    
              i++;
            }
            var totalIndexs = [];
            var _index = -1; //计数器
               //记录位置
               (function(){
                 for(var i = 0; i< Teams.length;i++){
                      for(var y = 0; y < Teams[i].length; y++){
                        if(JSON.stringify(Teams[i][y]) === JSON.stringify(item)){
                          _index++;
                          totalIndexs.push({level:i,levelIndex:y,order:_index});
                        }
                      }
                 }
               })();
    
             if(totalIndexs.length >0) return totalIndexs;
             else return _index;
     }
if (typeof module != "undefined" && module !== null && module.exports) module.exports = struct;
else if (typeof define === "function" && define.amd) define(function() {return struct});

