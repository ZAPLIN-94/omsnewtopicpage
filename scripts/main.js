//左边展示框获取主题名称
$(document).ready(function(){
    $("#titleOfTopic").blur(function(){
        $("#topicTitle").empty();
        var topicTitle = $("input#titleOfTopic").val();
        //console.log(topicTitle);
        $("#topicTitle").append(topicTitle);
    })
});
//左边展示框获取主题简介
$(document).ready(function(){
    $("#overviewOfTopic").blur(function(){
         $("#topicOverview").empty();
            var topicOverview = $("#overviewOfTopic").val();
            //console.log(topicOverview);
            $("#topicOverview").append(topicOverview);
        }
    )
});


//点击按钮插入文字 未选中情况下在div最后插入 选中情况下在所选元素后方插入
//赋予onclick事件 调用pick函数
$(document).ready(function(){
    $("#textSubmit").click(function(){
        if($("*[name=picked]").length===0) {
            var textSubmit = $("#textAdd").val();
            //console.log(textSubmit);
            var $pAdd = $("<p name='all'></p>");
            $(".leftblock").append($pAdd);
            $("div.leftblock :last-child").click(pickp).append(textSubmit);
            $("#textAdd").val("");
        }else{
            var textSubmit = $("#textAdd").val();
            var $pAdd = $("<p name='all'></p>");
            $("*[name=picked]").after($pAdd);
            $("*[name=picked]+p").click(pickp).append(textSubmit);
            $("#textAdd").val("");
        }
    })
    $("#topicOverview").click(pickp);
});

//点击插入图片
var widthofblock = parseInt($(".leftblock").css("width"));
$(document).ready(function(){
    $("#imageAdd").click(function(){
        if($("*[name=picked]").length===0) {
            var $imgAdd = $("<img name='all' />");
            $(".leftblock").append($imgAdd);
            $("div.leftblock :last-child").attr("src",imgurl).click(pickimg);
            $("div.leftblock :last-child").attr("width",widthofblock);
        }else{
            var $imgAdd = $("<img name='all' />");
            $("*[name=picked]").after($imgAdd);
            $("*[name=picked]+img").attr("src",imgurl).click(pickimg);
            $("*[name=picked]+img").attr("width",widthofblock);
        }
    })
});

//pick函数 点击获取所选元素 赋予name=picked
function pickp(){
    if($("p[name=picked]").length!==0){
        $("p[name=picked]").attr("name","all").css("background","white");
    };
    if($("img[name=picked]").length!==0){
        $("img[name=picked]").attr("name","all").css("border","");
    }
    $(this).css("background-color", "pink");
    $(this).attr("name","picked");
    var textchange = $("p[name=picked]").text();
    //$("#textAdd").empty();
    //$("#textAdd").append(textchange);
}
function pickimg(){
    if($("p[name=picked]").length!==0){
        $("p[name=picked]").attr("name","all").css("background","white");
    };
    if($("img[name=picked]").length!==0){
        $("img[name=picked]").attr("name","all").css("border","");
    };
    $(this).css("border","1px blue solid");
    $(this).attr("name","picked");
    //var imgchange = $("img[name=picked]").attr("src");
    //$("#imagePreview").attr("src",imgchange);
}


//删除选中项
$(document).ready(function(){
    $("#deleteNode").click(function(){
        if($("p[name=picked]").length!==0&&$("p[name=picked]").attr("id")!=="topicOverview"){
            $("p[name=picked]").remove();
        };
        if($("img[name=picked]").length!==0){
            $("img[name=picked]").remove();
        }
    });
});

//图片上传 并在预览框中显示
$(document).ready(function(){
    $("#imagePush").click(function(){
        doUpload();
    })
});
var imgurl;
function doUpload(){
    $.ajaxFileUpload({
        url : 'http://oms.jihelife.com:8080/oms/prom/newimgfile.json',
        secureuri : false,
        fileElementId : "fileimg",// 上传控件的id
        dataType : 'json',
        data : {fileID:"fileimg"}, // 其它请求参数
        success:function(data, status){
            //图片上传成功，保存纪录
            imgurl = "http://7xio74.com2.z0.glb.clouddn.com/"+data.id;
            $("#imagePreview").attr("src",imgurl);
        },
        error:function(data, status, e){
            //服务器响应失败时的处理函
            alert('提示','亲，图片上传失败了，赶紧去找程序猿！','error');
        }
    })
};

//遍历 div.leftblock 把数据存入数组
var topicContent = new Array();
var topicMark = new Array();

$(document).ready(function(){
    $("button#topicSave").click(function() {
        //console.log($("div.leftblock").children());
        for (var i = 0; i < $("div.leftblock").children().length; i++){
            console.log($("div.leftblock *").eq(i))
            if($("div.leftblock *").eq(i).text().length>0){
                topicContent.push($("div.leftblock *").eq(i).text());
                topicMark.push(0);
            }else{
                topicContent.push($("div.leftblock *").eq(i)[0].src);
                topicMark.push(1);
            }

        };
    })
});

