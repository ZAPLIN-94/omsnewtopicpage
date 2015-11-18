//左边展示框获取主题名称
$(document).ready(function(){
    $("#titleOfTopic").blur(function(){
        $("#topicTitle").empty();
        var topicTitle = $("input#titleOfTopic").val();
        $("#topicTitle").append(topicTitle);
    })
});
//左边展示框获取作者
$(document).ready(function(){
    $("#authorOfTopic").blur(function(){
         $("#topicAuthor").empty();
            var topicAuthor = $("#authorOfTopic").val();
            $("#topicAuthor").append(topicAuthor);
        }
    )
});
//左边展示框获取副标题
$(document).ready(function(){
    $("#subtitleOfTopic").blur(function(){
            $("#topicSubtitle").empty();
            var topicSubtitle = $("#subtitleOfTopic").val();
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
            var $pAdd = $("<p name='all' class='text'></p>");
            $(".leftblock").append($pAdd);
            $("div.leftblock :last-child").click(pickp).append(textSubmit);
            $("#textAdd").val("");
        }else{
            var textSubmit = $("#textAdd").val();
            var $pAdd = $("<p name='all' class='text'></p>");
            $("*[name=picked]").after($pAdd);
            $("*[name=picked]+p").click(pickp).append(textSubmit);
            $("#textAdd").val("");
        }
    })
    $("#topicAuthor").click(pickp);
});

//点击插入图片
var widthofblock = parseInt($(".leftblock").css("width"));
$(document).ready(function(){
    $("#imageAdd").click(function(){
        if($("*[name=picked]").length===0) {
            var $imgAdd = $("<img name='all' />");
            $(".leftblock").append($imgAdd);
            $("div.leftblock :last-child").attr({src:imgurl,class:'image'}).click(pickimg);
            $("div.leftblock :last-child").attr("width",widthofblock);
        }else{
            var $imgAdd = $("<img name='all' />");
            $("*[name=picked]").after($imgAdd);
            $("*[name=picked]+img").attr({src:imgurl,class:'image'}).click(pickimg);
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
        if($("p[name=picked]").length!==0&&$("p[name=picked]").attr("id")!=="topicAuthor"){
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
        topDoUpload();
    })
});
var topimgurl;
var topImgId;
function topDoUpload(){
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
            topImgId = data.id;
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
    $('#topic_searchlist').datagrid({url:'http://dev.jihelife.com:8180/oms/hotel/gethotelbyname.json?',queryParams:{name:hotelname,status:1}});
}
//优惠搜索
function discount_searchhotel(discountname){
    if( discountname.length<=0){
        return;
    }
    $('#discount_searchlist').datagrid({url:'http://dev.jihelife.com:8180/oms/prom/promlist.json?',queryParams:{productName:discountname,status:1}});
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

//保存主题 上传字段
var topicContent = new Array();
var topicMark = new Array();
$(document).ready(function(){
    $("button#topicSave").click(function() {
        //console.log($("div.leftblock").html());
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
        var listItemProductId="";
        for(var i=0;i<$('#topic_items').datagrid('getData').rows.length;i++){
            listItemProductId += ($('#topic_items').datagrid('getData').rows[i].productId)+",";
        };


        var newtopicjson = {
            "title":$("#titleOfTopic").val(),
            "desc":$("#subtitleOfTopic").val(),
            "author":$("#authorOfTopic").val(),
            //"imgs":$("#topimagePreview").attr("src"),
            "imgs":topImgId,
            "h5body":$("div.leftblock").html(),
            "listItems":listItemProductId
        };
        console.log(newtopicjson);

        if( checkTopicform() ==false)
            return;

        $.ajax({
            type: 'POST',
            url: 'http://dev.jihelife.com:8180/oms/topic/addnewtopic.json',
            data: newtopicjson,
            dataType: 'json',
            async:false,
            success: function(data,status){
                $.messager.confirm("提示", '提交成功,是否关闭当前窗口？', function (data) {
                    if (data) {
                        parent.$('#topic_window').window('close');
                    }
                    else {
                        //把新proID纪录下来，避免再次提交时重复新增
                        $('#topicId').val(result.topicId );
                    }
                });
            },
            error:function(){
                $.messager.show({
                    title:'提示',
                    msg:'提交失败.',
                    timeout:20000,
                    showType:'slide'
                })
            }
        });

    })
});

//检查内容是否都已经填写
function checkTopicform()
{
    if( $('#topicTitle').html().length <=0 )
    {
        $.messager.alert('提示','亲，标题不能为空！','error');
        return false;
    }
    //if( $('#topicSubtitle').html().trim().length <=0 )
    //{
    //    $.messager.alert('提示','亲，副标题不能为空！','error');
    //    return false;
    //}
    //if( $('#topicAuthor').html().length <=0 )
    //{
    //    $.messager.alert('提示','亲，作者不能为空！','error');
    //    return false;
    //}
    if( $('#topimagePreview').attr("src").length <=0  )
    {
        $.messager.alert('提示','亲，请至少上传一张图片！','error');
        return false;
    }
    var rows = $('#topic_items').datagrid('getRows');
    if( rows.length<=0 ) {
        $.messager.alert('提示','亲，请至少加入一家酒店！','error');
        return false;
    }
    return true;
}

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

};

//修改主题
$(function(){
    var	topicId=GetRequest("id");
    if( !topicId ){  //新增
        $('#topicId').val('');
    }
    else{
        $.ajax({
            method : 'GET',
            url : 'http://dev.jihelife.com:8180/oms/topic/getTopicBaseInfoById.json?id='+id,
            async : false,
            dataType : 'json',
            success : function(data) {
                $('#topicTitle').remove();
                $('#topicSubtitle').remove();
                $('#topicAuthor').remove();
                $('#titleOfTopic').textbox('setValue',data.productBaseInfo.productName);
                $('#subtitleOfTopic').textbox('setValue',data.topicBaseInfo.productDesc);
                $('#authorOfTopic').textbox('setValue',data.topicBaseInfo.author);
                $('div.leftblock').append(data.topicBaseInfo.h5body);
            },
            error : function() {
                $('#topicId').val('');
                $('#newtopic_baseinfo').form('clear');
                $.messager.alert('修改主题','未能找到主题信息!','error');
            }

        });
        //加载hotel list细项
        $('#topic_items').datagrid({
            url : "getTopicItemsById.json?id="+id,
            method:'get'
        });
    }
})
