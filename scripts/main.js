//左边展示框获取主题名称
$(document).ready(function(){
    $("#titleOfTopic").blur(function(){
        $("#topicTitle").empty();
        var topicTitle = $("input#titleOfTopic").val();
        //console.log(topicTitle);
        $("#topicTitle").append(topicTitle);
    })
});
//左边展示框获取副标题
$(document).ready(function(){
    $("#subtitleOfTopic").blur(function(){
         $("#topicSubtitle").empty();
            var topicSubtitle = $("#subtitleOfTopic").val();
            //console.log(topicSubtitle);
            $("#topicSubtitle").append(topicSubtitle);
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
    $("#topicSubtitle").click(pickp);
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
        if($("p[name=picked]").length!==0&&$("p[name=picked]").attr("id")!=="topicSubtitle"){
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

////首图上传
$(document).ready(function(){
    $("#topimagePush").click(function(){
        doUpload();
    })
});
var topimgurl;
function doUpload(){
    $.ajaxFileUpload({
        url : 'http://oms.jihelife.com:8080/oms/prom/newimgfile.json',
        secureuri : false,
        fileElementId : "topfileimg",// 上传控件的id
        dataType : 'json',
        data : {fileID:"topfileimg"}, // 其它请求参数
        success:function(data, status){
            //图片上传成功，保存纪录
            topimgurl = "http://7xio74.com2.z0.glb.clouddn.com/"+data.id;
            $("#topimagePreview").attr("src",topimgurl);
        },
        error:function(data, status, e){
            //服务器响应失败时的处理函
            alert('提示','亲，图片上传失败了，赶紧去找程序猿！','error');
        }
    })
};

//搜索酒店
function topic_searchhotel(hotelname){

    //var searchhotel = $.trim($('#topic_searchvalue').searchbox('getValue'))


    if( hotelname.length<=0){
        return;
    }
    $('#topic_searchlist').datagrid({url:'http://oms.jihelife.com:8080/oms/prom/gethotelbyname.json?',queryParams:{hname:hotelname} });
}

//上移 下移
function topic_items_moveup(){
    var row = $("#topic_items").datagrid('getSelected');
    var index = $("#topic_items").datagrid('getRowIndex', row);
    topicdgsort(index, 'up', 'topic_items');
}
function topic_items_movedown(){
    var row = $("#topic_items").datagrid('getSelected');
    var index = $("#topic_items").datagrid('getRowIndex', row);
    topicdgsort(index, 'down', 'topic_items');
}

//easyui datagrid 排序，index当前行号，type：up、down
function topicdgsort(index, type, gridname) {
    if ("up" == type) {
        if (index != 0) {
            var toup = $('#' + gridname).datagrid('getData').rows[index];
            var todown = $('#' + gridname).datagrid('getData').rows[index - 1];
            $('#' + gridname).datagrid('getData').rows[index] = todown;
            $('#' + gridname).datagrid('getData').rows[index - 1] = toup;
            $('#' + gridname).datagrid('refreshRow', index);
            $('#' + gridname).datagrid('refreshRow', index - 1);
            $('#' + gridname).datagrid('selectRow', index - 1);
        }
    } else if ("down" == type) {
        var rows = $('#' + gridname).datagrid('getRows').length;
        if (index != rows - 1) {
            var todown = $('#' + gridname).datagrid('getData').rows[index];
            var toup = $('#' + gridname).datagrid('getData').rows[index + 1];
            $('#' + gridname).datagrid('getData').rows[index + 1] = todown;
            $('#' + gridname).datagrid('getData').rows[index] = toup;
            $('#' + gridname).datagrid('refreshRow', index);
            $('#' + gridname).datagrid('refreshRow', index + 1);
            $('#' + gridname).datagrid('selectRow', index + 1);
        }
    }

}

//删除
function topic_items_removeit(){
    var row = $("#topic_items").datagrid('getSelected');
    var index = $("#topic_items").datagrid('getRowIndex', row);
    $('#topic_items').datagrid('deleteRow', index);
}

//遍历 div.leftblock 把数据存入数组
var topicContent = new Array();
var topicMark = new Array();
$(document).ready(function(){
    $("button#topicSave").click(function() {
        console.log($("div.leftblock").html());
        //for (var i = 0; i < $("div.leftblock").children().length; i++){
        //    console.log($("div.leftblock *").eq(i))
        //    if($("div.leftblock *").eq(i).text().length>0){
        //        topicContent.push($("div.leftblock *").eq(i).text());
        //        topicMark.push(0);
        //    }else{
        //        topicContent.push($("div.leftblock *").eq(i)[0].src);
        //        topicMark.push(1);
        //    }
        //};
    })
});

//提交主题
function submitNewTopic(){
    //提交基本信息
    if( checkTopicform() ==false)
        return;

    $('#newtopic_baseinfo').form('submit', {
        url:'addnewtopic.json',
        success:function(data){
            var result = eval('('+data+')');
            if( result.topicId > 0  ){

                submitTopicItems(result.topicId);

                parent.$("#topic_listdg").datagrid('reload');

                $.messager.confirm("提示", '提交成功,是否关闭当前窗口？', function (data) {
                    if (data) {
                        parent.$('#topic_window').window('close');
                    }
                    else {
                        //把新proID纪录下来，避免再次提交时重复新增
                        $('#topicId').val(result.topicId );
                    }
                });
            }
            else{
                $.messager.show({
                    title:'提示',
                    msg:'提交失败.',
                    timeout:20000,
                    showType:'slide'
                });
            }
        },
        error : function() {
            $.messager.show({
                title:'提示',
                msg:'提交失败.',
                timeout:20000,
                showType:'slide'
            });
        }
    });

}

//提交主题内酒店列表
function submitTopicItems(topicId){

    var alldata = $('#topic_items').datagrid('getData');

    if (alldata.rows.length > 0)
    {
        var effectRow = JSON.stringify(alldata.rows);
        $.ajax({
            method : 'POST',
            url : 'settopicitems.json?id='+topicId,
            async : false,
            dataType : 'json',
            data:{data:effectRow},
            success : function(data) {
                $.messager.show({
                    title:'提示',
                    msg:'主题内酒店列表提交成功.',
                    timeout:5000,
                    showType:'slide'
                });
            },
            error : function() {
                $.messager.show({
                    title:'提示',
                    msg:'主题内酒店列表提交失败.',
                    timeout:20000,
                    showType:'slide'
                });
            }
        });
    }
}