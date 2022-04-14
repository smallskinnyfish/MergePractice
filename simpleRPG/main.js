let mapArray, ctx, currentImgMainX, currentImgMainY;
let imgMountain, imgMain, imgEnemy;

$(document).ready(function(){

    //遊戲地圖
    //0可走 1障礙 2終點 3敵人
    mapArray = [0,1,1,0,0,0,3,1,2];
    ctx = $("#myCanvas")[0].getContext("2d");

    imgMain = new Image();
    imgMain.src = "simpleRPG/images/spriteSheet.png";
    currentImgMainX = 0;
    currentImgMainY = 0;
    imgMain.onload = function(){
        ctx.drawImage(imgMain,0,0,80,130,currentImgMainX, currentImgMainY,200,200);
    };

    imgMountain = new Image();
    imgMountain.src = "simpleRPG/images/material.png";

    imgEnemy = new Image();
    imgEnemy.src = "simpleRPG/images/Enemy.png";

    imgMountain.onload = function(){
        imgEnemy.onload = function(){
            for(let x in mapArray){
                if(mapArray[x]==1){
                    ctx.drawImage(imgMountain,32,65,32,32,x%3*200,Math.floor(x/3)*200,200,200);
                }else if(mapArray[x]==3){
                    ctx.drawImage(imgEnemy,7,40,104,135,x%3*200,Math.floor(x/3)*200,200,200)
                }
            }
        };
    };

    
   

});

$(document).keydown(function(event){
    let targetImgMainX, targetImgMainY, targetBlock, cutImagePositionX;
    event.preventDefault();
    //console.log(event.code);
    switch(event.code){
        case "ArrowLeft":
            targetImgMainX = currentImgMainX - 200;
            targetImgMainY = currentImgMainY;
            cutImagePositionX = 175;
            break;
        case "ArrowRight":
            targetImgMainX = currentImgMainX + 200;
            targetImgMainY = currentImgMainY;
            cutImagePositionX = 540;
            break;
        case "ArrowUp":
            targetImgMainX = currentImgMainX;
            targetImgMainY = currentImgMainY - 200;
            cutImagePositionX = 355;
            break;
        case "ArrowDown":
            targetImgMainX = currentImgMainX;
            targetImgMainY = currentImgMainY + 200;
            cutImagePositionX = 0;
            break;
        default:
            return;
    }

    // in border
    if(targetImgMainX <= 400 && targetImgMainX >=0 &&
        targetImgMainY <= 400 && targetImgMainY >=0){
            targetBlock = targetImgMainX/200 + targetImgMainY/200*3;
        }else{
            //out border
            targetBlock = -1;
            
        }

    ctx.clearRect(currentImgMainX, currentImgMainY,200,200);
    if(targetBlock == -1 || mapArray[targetBlock]==1 || mapArray[targetBlock]==3){
    }else{
        $("#talkBox").empty();
        currentImgMainX = targetImgMainX;
        currentImgMainY = targetImgMainY;
    }

    //新位置畫上主角
    ctx.drawImage(imgMain,cutImagePositionX,0,80,130,currentImgMainX,currentImgMainY,200,200);

    switch(mapArray[targetBlock]){
        case undefined:
            $("#talkBox").text("邊界");
            break;
        case 1:
            $("#talkBox").text("撞山");
            break;   
        case 2:
            $("#talkBox").text("抵達終點");
            break; 
        case 3:
            $("#talkBox").text("開打");
            break;            
    }
});