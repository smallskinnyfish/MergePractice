var player; //Youtube player
var currentPlay=0; //record now playing song

//on youtube API ready
function onYouTubeIframeAPIReady(){
    player = new YT.Player("player",
        {
            height:"390",
            width:"640",
            videoId:playList[currentPlay],
            playerVars:{
                "autoplay":0, // no auto play
                "controls":0, // no control item
                "start":playTime[currentPlay][0], //the second begin
                "end":playTime[currentPlay][1], //the second end
                "showinfo":0, //2018/9/25 abolished , cant close the title up there
                "rel":0, //after 2018/9/25 , cant block
                "iv_load_policy":3 //dont display comment
            },
            events:{
                "onReady":onPlayerReady,
                "onStateChange":onPlayerStateChange
            }   
        }
    );
}
//on youtube player ready
function onPlayerReady(event){

    $("#playButton").click(function(){
        $("h2").text(player.getVideoData().title);
        player.playVideo();
    });
}
//on player state change
function onPlayerStateChange(event){
    //Play next song
    if(Math.floor(player.getCurrentTime())==playTime[currentPlay][1]){
        if(currentPlay < playList.length-1){
            currentPlay++;
            player.loadVideoById({
                "videoId":playList[currentPlay],
                "startSeconds":playTime[currentPlay][0],
                "endSeconds":playTime[currentPlay][1],
                "suggestedQuality":"large"
            });
        }else{
            currentPlay=0;
            player.cueVideoById({
                "videoId":playList[currentPlay],
                "startSeconds":playTime[currentPlay][0],
                "endSeconds":playTime[currentPlay][1],
                "suggestedQuality":"large"
            });
        }
    }//catch title to display when the video begins
    if(player.getVideoLoadedFraction()>0){
        $("h2").text(player.getVideoData().title);
    }
}
