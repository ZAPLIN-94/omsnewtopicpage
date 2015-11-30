
 a=null;

var pageData =null;
 pageData = new Array();
 pa=new Array();
 var url =  "/content/client/brand/detail";
 var param = '{"id":"' + id + '","pagecnt":"5","pageno":"1"}';


$.post(url,
    {
        data:param
         },
    function (result) {
        console.debug(result);
        document.title= JSON.stringify(result.data.shareInfo.title);
        $("img").attr("src",result.data.brandBaseInfo.brandIcon);
        if(result.data.brandBaseInfo.brandId==0){
            $(".itemHeader").css("display","none");
        }
        $(".brandIntroduce h1").html(result.data.brandBaseInfo.brandName);
        /*$(".itemHeader").css('background', 'url('+img+') center center no-repeat');*/
        $(".brandIntroduce div").html(result.data.brandBaseInfo.brandDesc);
        $(".itemHeaderImg").css({
            'background': 'url('+result.data.brandBaseInfo.brandImgs+'?imageView2/1/w/'+aaa+'/h/600) 0 center no-repeat',
            '-webkit-background-size': 'cover',
            'background-size': 'cover'
        });
        //近期活动
        if (result.data.promotionList.length==0) {
            $(".itemActive").css('display', 'none');
        }
        else{
          $.each(result.data.promotionList, function (i) {
            $(".itemActive .itemActiveHeader").append('<div class="header"><div id="focus" class="focus"><span class="noPlusPrice">几何PLUS用户享受更低价</span><span class="plusPrice"><b>几何PLUS价</b>2200起/晚</span><span class="promPrice">2200起/晚</span><img src="'+result.data.promotionList[i].brandIcon+'" alt=""></div><div class="dist">'+result.data.promotionList[i].distanceDesc+'</div><p>'+result.data.promotionList[i].productName+'</p><div class="activeWrap"><span class="grade"></span><span class="time">活动进行中</span></div>')
          }) 
          for(var i=0;i<result.data.promotionList.length;i++) {
            $(".itemActive .itemActiveHeader .header").eq(i).children('#focus').css({
                'background': 'url('+result.data.promotionList[i].imageUrl+'?imageView2/1/w/'+aaa+'/h/600) 0 0 no-repeat',
                '-webkit-background-size': 'cover',
                'background-size': 'cover'
            });
            //price
            if (result.data.promotionList[i].plusPrice==-1) {
                if(result.data.promotionList[i].price==undefined){
                  $(".itemActive .itemActiveHeader .header").eq(i).css("display","none");  
                }
                else{
                   if(result.data.promotionList[i].pieces==1){
                     $(".itemActive .itemActiveHeader .header").eq(i).children('#focus').children('.promPrice').html(result.data.promotionList[i].price+'起/晚');
                      $(".itemActive .itemActiveHeader .header").eq(i).children('#focus').children('.noPlusPrice').css("display","block");
                   }
                   else{
                     $(".itemActive .itemActiveHeader .header").eq(i).children('#focus').children('.promPrice').html(result.data.promotionList[i].price+'起/'+result.data.promotionList[i].pieces+'晚'); 
                     $(".itemActive .itemActiveHeader .header").eq(i).children('#focus').children('.noPlusPrice').css("display","block"); 
                   }
                }
               
            }
            else if(result.data.promotionList[i].plusPrice ==undefined){
                if(result.data.promotionList[i].pieces==1){
                    $(".itemActive .itemActiveHeader .header").eq(i).children('#focus').children('.promPrice').html(result.data.promotionList[i].price+'起/晚');
                }
                else{
                    $(".itemActive .itemActiveHeader .header").eq(i).children('#focus').children('.promPrice').html(result.data.promotionList[i].price+'起/'+result.data.promotionList[i].pieces+'晚'); 
                }
            }
            else{
               if(result.data.promotionList[i].price==undefined){
                   if(result.data.promotionList[i].pieces==1){
                     $(".itemActive .itemActiveHeader .header").eq(i).children('#focus').children('.plusPrice').html(result.data.promotionList[i].plusPrice+'起/晚').css("display","block");

                   }
                   else{
                     $(".itemActive .itemActiveHeader .header").eq(i).children('#focus').children('.plusPrice').html(result.data.promotionList[i].plusPrice+'起/'+result.data.promotionList[i].pieces+'晚').css("display","block"); 
                   }
                   $(".itemActive .itemActiveHeader .header").eq(i).children('#focus').children('.promPrice').css("display","none");
                }
                else{
                   if(result.data.promotionList[i].pieces==1){
                    $(".itemActive .itemActiveHeader .header").eq(i).children('#focus').children('.plusPrice').html(result.data.promotionList[i].plusPrice+'起/晚').css("display","block");
                    $(".itemActive .itemActiveHeader .header").eq(i).children('#focus').children('.promPrice').html(result.data.promotionList[i].price+'起/晚');
                   }
                   else{
                    $(".itemActive .itemActiveHeader .header").eq(i).children('#focus').children('.plusPrice').html(result.data.promotionList[i].plusPrice+'起/'+result.data.promotionList[i].pieces+'晚').css("display","block"); 
                     $(".itemActive .itemActiveHeader .header").eq(i).children('#focus').children('.promPrice').html(result.data.promotionList[i].price+'起/'+result.data.promotionList[i].pieces+'晚'); 
                   }
                } 
            }
            
            //time
            var end=new Date(parseInt(result.data.promotionList[i].saleEndtime));
            var year=end.getFullYear();
            var month=end.getMonth() + 1;
            var day=end.getDate();
            var hour=end.getHours();
            var minute=end.getMinutes();
            var second=end.getSeconds();
            time(year,month,day,hour,minute,second)
            if(days>0&&days<=30){
                $(".itemActive .itemActiveHeader .header").eq(i).children('.activeWrap').children('.time').html('倒计时'+days+'天结束');
            }
            else if(days>30){
                $(".itemActive .itemActiveHeader .header").eq(i).children('.activeWrap').children('.time').html('活动进行中');
            }
            else{
               $(".itemActive .itemActiveHeader .header").eq(i).children('.activeWrap').children('.time').css("display","none");  
            }







            //grade
            if(result.data.promotionList[i].grade==1){
              $(".itemActive .itemActiveHeader .header").eq(i).children('.activeWrap').children('.grade').addClass('huaSuan');
            }
            else if(result.data.promotionList[i].grade==2){
              $(".itemActive .itemActiveHeader .header").eq(i).children('.activeWrap').children('.grade').addClass('chaoZhi');
            }
             else if(result.data.promotionList[i].grade==3){
              $(".itemActive .itemActiveHeader .header").eq(i).children('.activeWrap').children('.grade').addClass('zhenHan');
            }



          }
            //跳转
            $(".itemActive .itemActiveHeader .header").click(function(event) {
                window.location=result.data.promotionList[$(this).index()].h5url
            });
        }
        
//旗下酒店需要优化


        $.each(result.data.hotelList, function (i) {
            
            $(".itemHotel .itemHotelHeader").append('<div class="header"><div id="focus" class="focus"><span class="noPlusPrice">几何PLUS用户享受更低价</span><span class="plusPrice"><b>几何PLUS价</b>2200起/晚</span><span class="promPrice">2200起/晚</span><img src="'+result.data.hotelList[i].brandIcon+'" alt=""></div><div class="dist">'+result.data.hotelList[i].distanceDesc+'</div><p>'+result.data.hotelList[i].productName+'</p><div class="hotelWrap">'+result.data.hotelList[i].productDesc+'</div></div>')
            
        });
        for(var i=0;i<result.data.hotelList.length;i++){
            $(".itemHotel .itemHotelHeader .header").eq(i).children('#focus').css({
                'background': 'url('+result.data.hotelList[i].imageUrl+'?imageView2/1/w/'+aaa+'/h/600) 0 0 no-repeat',
                '-webkit-background-size': 'cover',
                'background-size': 'cover'
            });

        if(result.data.hotelList[i].price==-1){
            $(".itemHotel .itemHotelHeader .header").eq(i).children('#focus').children('.promPrice').html("可能有房")
        }
        else{
            $(".itemHotel .itemHotelHeader .header").eq(i).children('#focus').children('.promPrice').html(result.data.hotelList[i].price+"起/晚")
        }
        //price
        if(result.data.hotelList[i].plusPrice==-1){
             $(".itemHotel .itemHotelHeader .header").eq(i).children('#focus').children('.noPromPrice').css("display","block");
        }


        }
        if(result.data.hotelList.length<5){
            $(".last .proFooterEnd").css("display","block")
        }
        //跳转
        $(".itemHotel .itemHotelHeader .header").click(function(event) {
            window.location=result.data.hotelList[$(this).index()].h5url
        });
        a=1;
        var v=5;
        var z=1;
        $(window).scroll(function(){
          var scrollTop = $(this).scrollTop();
          var scrollHeight = $(document).height();
          var windowHeight = $(this).height();

          if(scrollTop + windowHeight == scrollHeight) {
            a++;
            var paramPage = '{"id":"' + id + '","pagecnt":"5","pageno":"'+a+'"}';
            $.post(url,
             {
               data: paramPage
              },
            function (result) {
                console.debug(result);
              var searchHotel = result.data.hotelList;
              if (searchHotel.length == 0) {
                $("#footer").css("display","block");
                $("#more").css("display","none");
                return;
              }
              else{
                $("#more").css("display","block");
                $("#footer").css("display","none");
              }
              var c = a - 1;
              $.each(result.data.hotelList, function (i) {
                $(".itemHotel .itemHotelHeader").append('<div class="header"><div id="focus" class="focus"><span class="noPlusPrice">几何PLUS用户享受更低价</span><span class="plusPrice"><b>几何PLUS价</b>2200起/晚</span><span class="promPrice">2200起/晚</span><img src="'+result.data.hotelList[i].brandIcon+'" alt=""></div><div class="dist">'+result.data.hotelList[i].distanceDesc+'</div><p>'+result.data.hotelList[i].productName+'</p><div class="hotelWrap">'+result.data.hotelList[i].productDesc+'</div></div>')
              });
              for(var i=c*5;i<result.data.hotelList.length+c*5;i++){
                $(".itemHotel .itemHotelHeader .header").eq(i).children('#focus').css({
                'background': 'url('+result.data.hotelList[i-c*5].imageUrl+'?imageView2/1/w/'+aaa+'/h/600) 0 0 no-repeat',
                '-webkit-background-size': 'cover',
                'background-size': 'cover'
            });

            if(result.data.hotelList[i-c*5].price==-1){
                $(".itemHotel .itemHotelHeader .header").eq(i).children('#focus').children('.promPrice').html("可能有房")
             }
            else{
                $(".itemHotel .itemHotelHeader .header").eq(i).children('#focus').children('.promPrice').html(result.data.hotelList[i-c*5].price+"起/晚")
            }
            //price
            if(result.data.hotelList[i-c*5].plusPrice==-1){
             $(".itemHotel .itemHotelHeader .header").eq(i).children('#focus').children('.noPromPrice').css("display","block");
             }


        }
                //跳转
                $(".itemHotel .itemHotelHeader .header").click(function(event) {
                    window.location=result.data.hotelList[$(this).index()-c*5].h5url
                });
                })
            }
            });




})





