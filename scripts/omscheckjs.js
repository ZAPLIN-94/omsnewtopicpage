$(document).ready(function(id){
    var id=4417;
    $.ajax({
        type: 'POST',
        url: 'http://dev.jihelife.com/content/client/topic/detail?',
        data: {data:'{"id":'+id+'}'},
        dataType: 'json',
        async:false,
        success : function(data) {
            $("#h5body").append(data.data.topicBaseInfo.h5body);
            $("[name='picked']").removeAttr("style");
            for(var i=0;i<data.data.topicList.length;i++) {
                $("table.gridtable").append("<tr><td class=\"number\"></td><td class=\"idtd\"></td><td class=\"nametd\"></td></tr>");
                $("td.number:last").append(i);
                $("td.idtd:last").append(data.data.topicList[i].productId);
                $("td.nametd:last").append(data.data.topicList[i].productName);
            }
        },
        error : function() {}

    });
})
