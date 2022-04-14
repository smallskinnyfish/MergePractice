window.onload=function(){
};


$(document).ready(function(){
    $("input").click(function(){
        let numberOfListItem = $("#choices li").length;
        let randomChildNumber = Math.floor(Math.random()*numberOfListItem);

        $("#random-result").text($("#choices li").eq(randomChildNumber).text());
        $("#imgg").attr("src", "RandomSelector/" + randomChildNumber + ".jpg");
    });
});