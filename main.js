//alert("小兰布数学,开始生长~");

//1、自动生成一组按钮。。其实是为了测试
//2、限定每行按钮的数目
//2.1 使用 <br> 换行，不过貌似对不齐

// for(var i=1;i<=199;i++){
//     $("#layout").append("<span style='margin: 3px' width='30px'><button id='b"+i+"'>" + i + "</button></span>");
//     if(i % 10 == 0 )$("#layout").append("<br>");
//     $("#b" + i).bind("click",function(){
//         alert(this.innerHTML);
//     });
// }

//3、将按钮转变成 div 排布
////3.1 变成了 td  排布
////3.2 添加事件，空白则加，有则减
//////3.2.1 序列编号的重新生成 td de count ?类似 check box 的遍历检查功能

$("#layout").append("<table id='tbl' class='table table-striped'></table>");
//6、在底端实施输出目前的公式
$("#layout").append("<div id='result' style='height:100px;overflow-y:scroll'></div>");
var totalcount = 10;
var r = 0;
// for(var i=1 ;i<=199 ; i++){
//     if(i % 10 == 1){
//         $("#tbl").append("<tr id='tr"+ r +"' style='text-align:center;'></tr>");
//         r++;
//     }
//     //没有 tr0 
//     $("#tr"+ (r-1)).append("<td id='td" + i + "'>" + i +"</td>");

//     //绑定 td 的点击事件
//     $("#td" +i).bind("click",function(){
//         alert(this.innerHTML);
//         ////3.2.2 没有内容的情况
//         if(this.innerHTML == ""){
//             ////3.2.2.1 增加数值（在中间和两边不一样。。。不过，需要考虑两种？）
//             //只考虑 最后一个 
//             //不从按钮添加，其实无法添加
//         }
//     });
//     //if(i % 10 == 0)$("#tbl").append("</tr>");
// }
// totalcount = i - 1;

resetbl(totalcount);

//3.3 增加 + 按钮
$("#layout").append("<button id='plus' style='float:left;' class='btn btn-primary'>+ (加上)</button>");
//3.3.1 增加计数的 span
var selcount=0;

$("#layout").append("<span id='x' style='text-align:center;font-size:20px;'>0</span>");
$("#plus").bind("click",function(){
    // //增加一个元素到 #tbl
    // totalcount ++;
    // if(totalcount % 10 == 1){
    //     $("#tbl").append("<tr id='tr"+ r +"' style='text-align:center;'></tr>");
    //     r++;
    // }
    // $("#tr"+ (r-1)).append("<td id='td" + totalcount + "'>" + totalcount +"</td>");
    // //设置背景
    // $("#td"+totalcount).css({'background-image':'url(img/smallnumber.gif','background-repeat':'no-repeat'});
    // $("#td"+totalcount).css("text-align","left");
    // $("#td"+totalcount).css("font-size","16px");

    
    //换成 增加
    totalcount += selcount;

    resetbl(totalcount);
    //获得结果
    $("#result").append("<p style='text-align:left'>"+ (totalcount - selcount ) + "<b>+ "+ selcount +"</b> = " + totalcount + "</p>") ; 
    $("#result").scrollTop(500);
    //将 sel 清零
    selcount = 0;
    $("#x").html(selcount + "");
});

//3.4 增加 - 按钮
$("#layout").append("<button id='des' style='float:right;' class='btn btn-primary'>- (减去)</button>");
$("#des").bind("click",function(){
    //从 #tbl 减少元素,事实上。。。
    //不如重置
    totalcount -= selcount;
    resetbl(totalcount);
    $("#result").append("<p style='text-align:right'>" + (totalcount + selcount ) + "<b>- "+ selcount +"</b> = " + totalcount + "</p>"); 
    $("#result").scrollTop(500);
    //将 sel 清零
    selcount = 0;
    $("#x").html(selcount + "");
});


//3.5 根据 count 重置 table
function resetbl(tblcount){
    //3.5.1 清空元素
    //$("#tbl").innerHTML="";
    $("#tbl").empty();
    //3.5.2 重新建立
    for(var i=1 ;i<=tblcount ; i++){
        if(i % 10 == 1){
            $("#tbl").append("<tr id='tr"+ r +"' style='text-align:center;'></tr>");
            r++;
        }
        //没有 tr0 
        $("#tr"+ (r-1)).append("<td id='td" + i + "' class='shapetext'>" + i +"</td>");
    
        //绑定 td 的点击事件
        $("#td" +i).bind("click",function(){
            //alert(this.innerHTML);
            //点击后进行减少的选择，也就是减去的选择
            $(this).html("-" + (selcount+1));
            $(this).css("color","red");
            selcount ++;
            $("#x").html(selcount + "");
            ////3.2.2 没有内容的情况
            if(this.innerHTML == ""){
                ////3.2.2.1 增加数值（在中间和两边不一样。。。不过，需要考虑两种？）
                //只考虑 最后一个 
                //不从按钮添加，其实无法添加
            }
        });
        $("#td"+i).css("background-image","url(img/smallnumber.gif)");
        $("#td"+i).css({'background-image':'url(img/smallnumber.gif','background-repeat':'no-repeat'});
        $("#td"+i).css("text-align","left");
        $("#td"+i).css("font-size","16px");


    }
        //6、在元素的最后一个增加增加元素的按钮，这个按钮和 selcount 绑定
        $("#tbl").append("<tr><td id='idsel' style='border:solid 1px;text-align:center;'>+</td></tr>");

        //临时增加的值，不添加背景
        var tempcount = totalcount;
        $("#idsel").bind("click",function(){
            //增加一个元素到 #tbl
            //尚未完全增加，但是显示计数
            tempcount ++;
            if(tempcount % 10 == 1){
                $("#tbl").append("<tr id='tr"+ r +"' style='text-align:center;'></tr>");
                r++;
            }
            $("#tr"+ (r-1)).append("<td id='td" + tempcount + "'>" + (tempcount - totalcount) +"</td>");
            //设置背景
            //$("#td"+tempcount).css({'background-image':'url(img/smallnumber.gif','background-repeat':'no-repeat'});
            $("#td"+tempcount).css("text-align","left");
            $("#td"+tempcount).css("font-size","16px");
            $("#td"+tempcount).css("color","blue");

            selcount ++;
            $("#x").html(selcount + "");
        });
    totalcount = i - 1;
}

//4、制作小兰布的动画，作为背景，数字作为前景
//4.1 绑定事件,显示对钩的图片.
//5、增加添加或减少的按钮，固定在页面底端

//动画效果甚至可能需要考虑  phaser.js ，比如打乱，列队，重新整队。。