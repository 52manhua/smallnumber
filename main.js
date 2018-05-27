//alert("小兰布数学,开始生长~");

//1、自动生成一组按钮。。其实是为了测试
//2、限定每行按钮的数目
//2.1 使用 <br> 换行，不过貌似对不齐

for(var i=1;i<=199;i++){
    $("#layout").append("<span style='margin: 3px' width='30px'><button id='b"+i+"'>" + i + "</button></span>");
    if(i % 10 == 0 )$("#layout").append("<br>");
    $("#b" + i).bind("click",function(){
        alert(this.innerHTML);
    });
}

$("#layout").append("<table id='tbl' class='table table-striped'></table>");

var r = 0;
for(var i=1 ;i<=199 ; i++){
    if(i % 10 == 1){
        $("#tbl").append("<tr id='tr"+ r +"'></tr>");
        r++;
    }
    //tr0 时 
    $("#tr"+ (r-1)).append("<td>" + i +"</td>");
    //if(i % 10 == 0)$("#tbl").append("</tr>");
}
//3、将按钮转变成 div 排布
//4、制作小兰布的动画，作为背景，数字作为前景
//5、增加添加或减少的按钮，固定在页面底端
//6、在顶端实施输出目前的公式
//动画效果甚至可能需要考虑  phaser.js ，比如打乱，列队，重新整队。。