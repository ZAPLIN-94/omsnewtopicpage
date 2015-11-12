var hotelContent = "<a class=\"hotelh5url\" href=\"#\"><img class=\"listImage\" src=\"\" /></a><img class=\"tips\" src=\"images/酒店.png\" /><a class=\"brandh5url\" href=\"#\"><img class=\"brand\" src=\"\"></a><img class=\"priceBackground\" src=\"\"><p class=\"price\"><span class=\"unit\"></span></p><p class=\"distant\"> </p><p class=\"hotelName\"></p><div class=\"introHotel\"><p></p></div>"
var productContent = "<img class=\"discountStatus\" src=\"\" /><a href=\"#\"><img class=\"listImage\" src=\"\" /></a><img class=\"tips\" src=\"images/优惠.png\" /><a href=\"#\"><img class=\"brand\" src=\"\"></a><img class=\"nojihePlus\" src=\"\"/><img class=\"jihePlus\" src=\"\"/><p class=\"pricePlus\"><span class=\"unit\"></span></p><img class=\"priceBackground\" src=\"images/Rectangle%20237.png\"><p class=\"price\"><span class=\"unit\"> </span></p><p class=\"distant\"> </p><p class=\"introDiscount\"> </p><img class=\"rank\" src=\"\" /><p class=\"discountStatus\"> </p>"
console.log(hotelContent);
console.log(productContent);

$(document).ready(function(id){
    var id=2323;
    $.ajax({
        type: 'POST',
        url: 'http://dev.jihelife.com/content/client/topic/detail?',
        data: {data:'{"id":'+id+'}'},
        dataType: 'json',
        async:false,

        success: function(data){
            console.log(data.data.topicBaseInfo.h5body);
            $("#imgsAndText").prepend(data.data.topicBaseInfo.h5body);

            for(var i=0;i<data.data.topicList.length;i++){
                //判断为酒店
                if(data.data.topicList[i].objectType == 1){
                    var h5url=data.data.topicList[i].h5url;

                    console.log(data.data.topicList[i].h5url);
                    console.log(data.data.topicList[i].referPrice);
                    var $listAdd = $("<div class='list'></div>");
                    $("#listPlace").append($listAdd);
                    $("div#listPlace :last-child").append(hotelContent);
                    $(".hotelh5url").attr("href",""+data.data.topicList[i].h5url);
                    $(".listImage").attr("src",""+data.data.topicList[i].imgurl);
                    //$(".brandh5url").attr("href",""+data.data.topicList[i].)
                    //$(".brand").attr("src",""+data.data.topicList[i].)
                    console.log(data.data.topicList[i].referPrice);
                    $("p.price").prepend(data.data.topicList[i].referPrice);
                    if(data.data.topicList[i].pieces == 1){
                        $("span.unit").prepend("&nbsp;&nbsp;"+"起"+"/"+data.data.topicList[i].piecesUnit)
                    }else{
                        $("span.unit").prepend("&nbsp;&nbsp;"+"起"+"/"+data.data.topicList[i].pieces+data.data.topicList[i].piecesUnit)
                    }
                    //$("p.distant").append("距离"+data.data.topicList[i].distant+"公里")
                    //$(div.introHotel).append()
                }
                //判断为优惠
                else if(data.data.topicList[i].objectType == 2){
                    console.log("!23")
                    var $listAdd = $("<div class='list'></div>");
                    $("#listPlace").append($listAdd);
                    $("div#listPlace :last-child").append(productContent);
                }
            }
        },
        error:function(){},
    });
})


//$(document).ready(function(){
//    if($("img.discountStatus").attr("src").length === 0){
//        $("img.discountStatus").remove();
//    }
//})

