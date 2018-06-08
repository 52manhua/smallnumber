
$("#layout").append("<table id='tbl' class='table table-striped'></table>");
//6、在底端实施输出目前的公式
$("#layout").append("<div id='result' style='height:100px;overflow-y:scroll'></div>");
var totalcount = 10;
var oldcount = totalcount;
var r = 0;
//对计算的历史进行判断，　对　＋＋＋－不做处理
//对于　－＋ 需要进行处理 
//cacuhis 用来存储上次的计算状态
var cacuhis = "";

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

//3.6 减法和减法合并为一个的最终结算
//3.6。1 实时生成公式
$("#plus").bind("click",function(){

    cacuall();

});

//### cacu total all
function cacuall() {
        //改变 totalcount 的值
        totalcount += psel;
        totalcount -= dsel;
    
        resetbl(totalcount);
    
        $("#result").append("<p style='text-align:left'>"+ oldcount + (psel>0?"+"+psel:"") + (dsel>0?"-"+dsel:"") +" = " + totalcount + "</p>") ; 
        $("#result").scrollTop(500);
        //将 sel 清零
        restsel();
    
        debuginfo();
        //将计算状态重置
        cacuhis = "";
}


//实时获得计算公式， 最下面的结果
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
        //事实上就是做减法
        $("#td" +i).bind("click",function(){
            //alert(this.innerHTML);
            //点击后进行减少的选择，也就是减去的选择

            //a 获得最后一个 obj
            ////3.3.3 改为减少最后一个..
            ////3.3.4 如果有加法，那么就减少加法最后一个
            var lastobj = document.getElementById("td" + (totalcount + psel));
            var lastid = "#td" + (totalcount - dsel + psel);

            console.log("lastid:" + lastid);

            ////3.2.2 没有内容的情况
            if(lastobj.innerHTML == ""){
                ////3.2.2.1 增加数值（在中间和两边不一样。。。不过，需要考虑两种？）
                //只考虑 最后一个 
                //不从按钮添加，其实无法添加
            }

            ////3.2.3 禁止重复点击
            console.log($(lastid).text());
            if($(this).text().indexOf("-") != -1){

            }else{
                //增加减法的样式
                //$(lastid).html("-" + (dsel+1));
                //修改为 append 模式
                $(lastid).append("<br>-" + (dsel+1));
                $(lastid).css("color","red");
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
        //7. 增加减法按钮， 和 pdel 绑定？
        $("#tbl").append("<tr><td id='idsel' style='border:solid 1px;text-align:center;'> + </td>" + "<td id='iddec' style='border:solid 1px;text-align:center;'> － </td></tr>");
        //$("#tbl").append();   

        //临时增加的值，不添加背景
        var tempcount = oldcount;
        //设置 td 的值
        var tdid = 0;
        //必须设立初始值和新值
        $("#idsel").bind("click",function(){
            //加法遇到减法就进行结算
            if(cacuhis == "-"){
                //调用结算的程序
                cacuall();
                return;
            }
            cacuhis = "+";

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

            //追加加法的元素
            //psel 为累加的序列
            //tdid 是新的结果，另一线的 totalcount
            $("#tr"+ (r-1)).append("<td id='td" + tdid + "' style='font-size:2px'>" + tdid +"<br><font size= 1px> +"+ psel +  "</font></td>");
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


        $("#iddec").bind("click",function(){
            //a 获得最后一个 obj
            ////3.3.3 改为减少最后一个..
            ////3.3.4 如果有加法，那么就减少加法最后一个
            var lastobj = document.getElementById("td" + (totalcount + psel));
            var lastid = "#td" + (totalcount - dsel + psel);

            cacuhis = "-";

            console.log("lastid:" + lastid);

            ////3.2.2 没有内容的情况
            if(lastobj.innerHTML == ""){
                ////3.2.2.1 增加数值（在中间和两边不一样。。。不过，需要考虑两种？）
                //只考虑 最后一个 
                //不从按钮添加，其实无法添加
            }

            ////3.2.3 禁止重复点击
            console.log($(lastid).text());
            if($(this).text().indexOf("-") != -1){

            }else{
                //增加减法的样式
                //$(lastid).html("-" + (dsel+1));
                //修改为 append 模式
                $(lastid).append("<br>-" + (dsel+1));
                $(lastid).css("color","red");
                selcount ++;
                dsel ++;
                $("#x").html(finalget()); 
            }
        })
             
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
