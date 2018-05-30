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
var oldcount = totalcount;
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

//3.3 增加 运算 按钮
$("#layout").append("<button id='plus' style='float:left;' class='btn btn-primary'>计算</button>");
//3.3.1 增加计数的 span
var selcount=0;
//3.3.1.1 加法计数
var psel = 0;
//3.3.1.2 减法计数
var dsel = 0;
//3.3.2 重置 sel
function restsel(){
    selcount = 0;
    psel = 0;
    dsel = 0;
    //$("#x").html(selcount + "");
    $("#x").html("");
    //写入新值
    oldcount = totalcount;
}


$("#layout").append("<span id='x' style='text-align:center;font-size:20px;'>0</span>");
//[主输出]结果输出以及运算
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

    //获得结果 action

    //不以 selcount 作为计算依据
    //totalcount += selcount;

    //改变 totalcount 的值
    totalcount += psel;
    totalcount -= dsel;

    resetbl(totalcount);



    $("#result").append("<p style='text-align:left'>"+ oldcount + (psel>0?"+"+psel:"") + (dsel>0?"-"+dsel:"") +" = " + totalcount + "</p>") ; 
    $("#result").scrollTop(500);
    //将 sel 清零
    restsel();

    debuginfo();
});

//实时获得计算公式
//不改变 totalcount
function finalget(){

    var gcount = totalcount;
    //可以进行混合运算 增加 psel 减少 dsel
    var finalf = gcount +"";
    if(psel >0){
        gcount += psel;
        finalf = finalf + " + " + psel;
    }
    if(dsel >0){
        gcount -= dsel;
        finalf = finalf + " - " +dsel;
    }

    return finalf;
}

//统和后只保留 计算的 按钮
//3.4 增加 - 按钮
// $("#layout").append("<button id='des' style='float:right;' class='btn btn-primary'>- (减去)</button>");
// $("#des").bind("click",function(){
//     //从 #tbl 减少元素,事实上。。。
//     //不如重置
//     totalcount -= selcount;
//     resetbl(totalcount);
//     $("#result").append("<p style='text-align:right'>" + (totalcount + selcount ) + "<b>- "+ selcount +"</b> = " + totalcount + "</p>"); 
//     $("#result").scrollTop(500);
//     //将 sel 清零
//     restsel();
// });


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

            ////3.2.2 没有内容的情况
            if(this.innerHTML == ""){
                ////3.2.2.1 增加数值（在中间和两边不一样。。。不过，需要考虑两种？）
                //只考虑 最后一个 
                //不从按钮添加，其实无法添加
            }
            ////3.2.3 禁止重复点击
            console.log($(this).text());
            if($(this).text().indexOf("-") != -1){

            }else{
                $(this).html("-" + (dsel+1));
                $(this).css("color","red");
                selcount ++;
                dsel ++;
                $("#x").html(finalget()); 
            }
        });
        $("#td"+i).css("background-image","url(img/smallnumber.gif)");
        $("#td"+i).css({'background-image':'url(img/smallnumber.gif','background-repeat':'no-repeat'});
        $("#td"+i).css("text-align","left");
        $("#td"+i).css("font-size","16px");


    }
        //6、*** 在元素的最后一个增加增加元素的按钮，这个按钮和 psel 绑定
        $("#tbl").append("<tr><td id='idsel' style='border:solid 1px;text-align:center;'> + </td></tr>");
        //临时增加的值，不添加背景
        var tempcount = oldcount;
        //设置 td 的值
        var tdid = 0;
        //必须设立初始值和新值
        $("#idsel").bind("click",function(){
            //增加一个元素到 #tbl
            //尚未完全增加，但是显示计数
            tempcount ++;
            psel ++;
            selcount ++;

            tdid = oldcount + psel
            if(tdid % 10 == 1){
                $("#tbl").append("<tr id='tr"+ r +"' style='text-align:center;'></tr>");
                r++;
            }
            $("#tr"+ (r-1)).append("<td id='td" + tdid + "'> +" + psel +"<br><font size= 1px><"+ tdid +  "></font></td>");
            //增加数字的总和
            //"("+ tdid  + ")"+

            //设置背景
            //$("#td"+tempcount).css({'background-image':'url(img/smallnumber.gif','background-repeat':'no-repeat'});
            $("#td"+tdid).css("text-align","left");
            $("#td"+tdid).css("font-size","16px");
            $("#td"+tdid).css("color","blue");


            //实时显示计算公式
            $("#x").html(finalget());

            debuginfo();
        });
    totalcount = i - 1;


}

//输出调试信息
function debuginfo(){
    console.log("totalcount:" + totalcount);
    console.log("dsel:" + dsel);
    console.log("psel:" + psel);
    console.log("oldcount:" + oldcount);
    console.log("finalget -> " + finalget());
}
//3.6 减法和减法合并为一个，最终结算
//3.6。1 实时生成公式

//4、制作小兰布的动画，作为背景，数字作为前景
//4.1 绑定事件,显示对钩的图片.
//5、增加添加或减少的按钮，固定在页面底端
//7\针对 加和减的分离
////7.1 加 psel, 减  dsel
////7.2 改变显示 sel 为显示公式
////7.4 计算公式的显示

//动画效果甚至可能需要考虑  phaser.js ，比如打乱，列队，重新整队。。