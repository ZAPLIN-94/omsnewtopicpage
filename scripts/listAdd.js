var hotelContent = "<a href=\"#\"><img class=\"listImage\" src=\"\" /></a><img class=\"tips\" src=\"images/酒店.png\" /><a href=\"#\"><img class=\"brand\" src=\"\"></a><img class=\"priceBackground\" src=\"\"><p class=\"price\"><span class=\"unit\">&nbsp;&nbsp;元/晚</span></p><p class=\"distant\"> </p><p class=\"hotelName\"></p><div class=\"introHotel\"><p></p></div>"
var productContent = "<a href=\"#\"><img class=\"listImage\" src=\"\" /></a><img class=\"tips\" src=\"images/优惠.png\" /><a href=\"#\"><img class=\"brand\" src=\"\"></a><img class=\"priceBackground\" src=\"images/Rectangle%20237.png\"><p class=\"price\"><span class=\"unit\">&nbsp;&nbsp;元/晚</span></p><p class=\"distant\"> </p><p class=\"introDiscount\"></p><img class=\"rank\" src=\"\" /><p class=\"discountStatus\"></p>"
console.log(hotelContent);
console.log(productContent);

var $lineAdd = $("<img id='line' src='http://7s1sju.com2.z0.glb.qiniucdn.com/grey.png' />");
$(".leftblock").append($lineAdd);

if(hotelContent){
    var $listAdd = $("<div class='list'></div>");
    $(".leftblock").append($listAdd);
    $("div.leftblock :last-child").append(hotelContent);
}else if(productContent){
    var $listAdd = $("<div class='list'></div>");
    $(".leftblock").append($listAdd);
    $("div.leftblock :last-child").append(productContent);
}

var $endLineAdd = $("<img id='endLine' src='http://7s1sju.com2.z0.glb.qiniucdn.com/The%20End.png' />");
$(".leftblock").append($endLineAdd);
