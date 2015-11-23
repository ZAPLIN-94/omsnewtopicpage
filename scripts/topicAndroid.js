//使用: 
//var device = new Device(); 
//device.requestCommit(url, andrData);

function Device() {
    var requestData = "";
    this.setRequestData = function (_requestData) {
        requestData = _requestData;
    };
    this.getRequestData = function () {
        return requestData;
    }

    //酒店/优惠内容骨架
    var hotelContent = "<a class=\"hotelh5url\" href=\"#\"><img class=\"listImage\" src=\"\" /></a><img class=\"tips\" src=\"../h5_2.0/images/酒店.png\" /><a class=\"brandh5url\" href=\"#\"><img class=\"brand\" src=\"\"></a><img class=\"priceBackground\" src=\"../h5_2.0/images/Rectangle%20237.png\"><p class=\"price\"><span class=\"unit\"></span></p><p class=\"distant\"> </p><p class=\"hotelName\"></p><div class=\"introHotel\"><p></p></div>"
    var productContent = "<img class=\"statusMark\" src=\"\" /><a class=\"discounth5url\" href=\"#\"><img class=\"listImage\" src=\"\" /></a><img class=\"tips\" src=\"../h5_2.0/images/优惠.png\" /><a class=\"brandh5url\" href=\"#\"><img class=\"brand\" src=\"\"></a><img class=\"nojihePlus\" src=\"\"/><img class=\"jihePlus\" src=\"\"/><p class=\"pricePlus\"><span class=\"unit\"></span></p><img class=\"priceBackground\" src=\"../h5_2.0/images/Rectangle%20237.png\"><p class=\"price\"><span class=\"unit\"> </span></p><p class=\"distant\"> </p><p class=\"introDiscount\"> </p><img class=\"rank\" src=\"\" /><p class=\"discountStatus\"></p>"

    this.requestCommit = function (allUrl, allData) {
        //var yon = window.hasOwnProperty("AndroidObj");
        var yon = jihe.hasOwnProperty("getHeaderData");
        // if START--------
        if(yon == false) {//若为false 则不在APP中...

            //-------------操作逻辑-------------

        }else {
        //若为true 在APP中...
            // var testHeader = jihe.getHeaderData(allData);
            //var testHeader = window.AndroidObj.getHeaderData(allData);
            var testHeader = jihe.getHeaderData(allData);
            var testHeaderdecoded = decodeURIComponent(testHeader);
            var obj = eval("(" + testHeaderdecoded + ")");
            $.ajax({
                type: 'POST',
                url: allUrl,
                async: false,
                data: {data:allData},
                beforeSend: function (XMLHttpRequest) {
                    XMLHttpRequest.setRequestHeader('apiversion', ''+obj.apiversion )
                    XMLHttpRequest.setRequestHeader('channel', ''+obj.channel)
                    XMLHttpRequest.setRequestHeader('location', ''+obj.location)
                    XMLHttpRequest.setRequestHeader('userid', ''+obj.userid)
                    XMLHttpRequest.setRequestHeader('uuid', ''+obj.uuid)
                    XMLHttpRequest.setRequestHeader('sign', ''+obj.sign)
                },
                success: function (data) {
                    requestData = (data);
                    //alert(data.sc);
                    //alert(data.data.topicBaseInfo.h5body);
                    var str1 = JSON.stringify(data);
                    //alert(str1);
                    //alert(data.data.topicBaseInfo.author);
                    //-------------操作逻辑-------------
                    $("#imgsAndText").prepend(data.data.topicBaseInfo.h5body);
                    $("[name='picked']").removeAttr("style");
                    for(var i=0;i<data.data.topicList.length;i++){
                        //判断为酒店
                        if(data.data.topicList[i].objectType == 1){
                            //插入酒店盒子
                            var $listAdd = $("<div class='list'></div>");
                            $("#listPlace").append($listAdd);
                            $("div.list:last").append(hotelContent);
                            //插入各项内容
                            $("div.list:last").find(".hotelh5url").attr("href",""+data.data.topicList[i].h5url);
                            $("div.list:last").find(".listImage").attr("src",""+data.data.topicList[i].imageUrl);
                            //$("div.list:last").find(".brandh5url").attr("href",""+data.data.topicList[i].)
                            $("div.list:last").find(".brand").attr("src",""+data.data.topicList[i].brandIcon);
                            $("div.list:last").find(".price").prepend(data.data.topicList[i].price);
                            if(data.data.topicList[i].pieces == 1){
                                $("div.list:last").find("span.unit").prepend("&nbsp;&nbsp;"+"起"+"/"+"晚");
                            }else{
                                $("div.list:last").find("span.unit").prepend("&nbsp;&nbsp;"+"起"+"/"+data.data.topicList[i].pieces+"晚");
                            }
                            $("div.list:last").find(".distant").append(data.data.topicList[i].distanceDesc);
                            $("div.list:last").find(".hotelName").append(data.data.topicList[i].productName);
                            $("div.list:last").find(".introHotel").append(data.data.topicList[i].productDesc);
                        }
                        //判断为优惠
                        else if(data.data.topicList[i].objectType == 2){
                            //插入优惠盒子
                            var $listAdd = $("<div class='list'></div>");
                            $("#listPlace").append($listAdd);
                            $("div.list:last").append(productContent);
                            //插入各项内容
                            $("div.list:last").find(".discounth5url").attr("href",""+data.data.topicList[i].h5url);
                            $("div.list:last").find(".listImage").attr("src",""+data.data.topicList[i].imageUrl);
                            //$("div.list:last").find(".brandh5url").attr("href",data.data.topicList[i].);
                            $("div.list:last").find(".brand").attr("src",""+data.data.topicList[i].brandIcon);
                            //判断几何PLUS状态
                            if(!data.data.topicList[i].plusPrice){
                                $("div.list:last").find(".nojihePlus").remove();
                                $("div.list:last").find(".jihePlus").remove();
                                $("div.list:last").find(".pricePlus").remove();
                            }else if(data.data.topicList[i].plusPrice == -1){
                                $("div.list:last").find(".jihePlus").remove();
                                $("div.list:last").find(".pricePlus").remove();
                                $("div.list:last").find(".nojihePlus").attr("src","../h5_2.0/images/几何PLUS用户享受更低价.png");
                            }else{
                                $("div.list:last").find(".nojihePlus").remove();
                                $("div.list:last").find(".jihePlus").attr("src","../h5_2.0/images/几何PLUS价%20.png");
                                $("div.list:last").find(".pricePlus").prepend(data.data.topicList[i].plusPrice);
                                if(data.data.topicList[i].pieces == 1){
                                    $("div.list:last").find("span.unit").prepend("&nbsp;&nbsp;"+"起"+"/"+data.data.topicList[i].piecesUnit);
                                }else{
                                    $("div.list:last").find("span.unit").prepend("&nbsp;&nbsp;"+"起"+"/"+data.data.topicList[i].pieces+data.data.topicList[i].piecesUnit);
                                }
                            }
                            //普通优惠价格
                            $("div.list:last").find(".price").prepend(data.data.topicList[i].price);
                            if(data.data.topicList[i].pieces == 1){
                                $("div.list:last").find("span.unit").prepend("&nbsp;&nbsp;"+"起"+"/"+data.data.topicList[i].piecesUnit);
                            }else{
                                $("div.list:last").find("span.unit").prepend("&nbsp;&nbsp;"+"起"+"/"+data.data.topicList[i].pieces+data.data.topicList[i].piecesUnit);
                            }
                            $("div.list:last").find(".distant").append(data.data.topicList[i].distanceDesc);
                            $("div.list:last").find(".introDiscount").append(data.data.topicList[i].productName);
                            //判断优惠等级
                            if(data.data.topicList[i].grade == 1){
                                $("div.list:last").find(".rank").attr("src","../h5_2.0/images/1.png");
                            }else if(data.data.topicList[i].grade == 2){
                                $("div.list:last").find(".rank").attr("src","../h5_2.0/images/2.png");
                            }else{
                                $("div.list:last").find(".rank").attr("src","../h5_2.0/images/3.png");
                            }
                            if(data.data.topicList[i].status == 1){
                                $("div.list:last").find(".statusMark").remove();
                                $("div.list:last").find(".discountStatus").append("活动进行中");
                            }else if(data.data.topicList[i].status == 2){
                                $("div.list:last").find(".statusMark").attr("src","../h5_2.0/images/优惠已结束.png");
                                $("div.list:last").find(".discountStatus").append("优惠已结束");
                            }else {
                                $("div.list:last").find(".statusMark").attr("src","../h5_2.0/images/优惠已售罄.png");
                                $("div.list:last").find(".discountStatus").append("优惠已售罄");
                            }

                        };

                    };
                  },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log(XMLHttpRequest.status+"/"+XMLHttpRequest.readyState);
                    alert("网络有点儿问题~~");
                    alert(allUrl);
                }

            })

        }
        // if END--------

    }
    //this.setRequestData  END-------

}
