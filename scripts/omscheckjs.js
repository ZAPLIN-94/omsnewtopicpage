$(document).ready(function(id){
    var id=4411;
    $.ajax({
        type: 'GET',
        url: 'http://dev.jihelife.com:8180/oms/topic/getTopicBaseInfoById.json?id='+id,
        //dataType: 'json',
        async:false,
        success : function(data) {
            $("#h5body").append(data.topicBaseInfo.h5body);
            $("[name='picked']").removeAttr("style");
            for(var i=0;i<data.topicItemsList.length;i++) {
                $("table.gridtable").append("<tr><td class=\"number\"></td><td class=\"idtd\"></td><td class=\"nametd\"></td></tr>");
                $("td.number:last").append(i);
                $("td.idtd:last").append(data.topicItemsList[i].itemId);
                //$("td.nametd:last").append(data.topicItemsList[i].productName);
            }
        },
        error : function() {}

    });
})

