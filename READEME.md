> struct.js用来封装js语言实现的典型数据结构,例如列表，栈，队列等，使其处理数据可以凭借更方便合理的方式：

### 列表结构：
典型问题处理示例： 

1.创建一个记录学生成绩的对象，有添加学生成绩的方法，并且能显示学生平均成绩：

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

2. 在元素组成的集合中，希望在集合中找到某元素后并插入另一个新元素

        var struct = require("./struct.js");
        var list = new struct.List();
        list.append("apple").append("banana").append("orange").print();   

        /*  apple  
            banana  
            orange  */

        list.find("banana");
        list.append("strawbrarry").print();

        /*  apple  
            banana
            strawbrarry 
            orange  */

  #### struct.List的接口文档（标有链式即支持链式操作）:
    ·clear   清空列表,链式
    ·print   打印列表内容,链式
    ·getCurElement   返回当前位置的元素
    ·length  返回元素的个数 
    ·append  末尾添加元素，链式 
    ·insert  插入元素,链式
    ·find    找到元素的序列位置（并将指针移到该位置）
    ·remove  删除某元素
    ·next    下一个元素,链式
    ·last    上一个元素,链式
    ·moveTo  移动到指定位置,链式
    ·hasNext   判断是否有下一个元素
    ·hasLast   判断是否有上一个元素

  （未完待续.）
其他：此外，这里还添有两个方法用来解决两种复杂的常用的数据场景：

· getTeamsBy(arr,proStr) ： 对若干个有着相同属性名称的对象按照属性名进行分组,第一个参数为对象组成的数组，第二个参数为参照的属性名称，返回一个数组。(处理未知数量的对象分组优选);

· deriveFind2D(ob,item) :
用于对类似与像二叉树这种层层递进衍生数据的结构，将数据的层级设为横坐标，所在层级上的值的集合为纵坐标,根据你想要找的值返回一个对象报告目的数据的位置和存在重复数据时的出现序列。