// 获取dom 元素
// 获取视频标签
let video = document.getElementById('video');
// 获取视频界面播放按钮
let playVideo = document.getElementsByClassName('iconbofang')[0];
// 获取底部播放按钮
let playVideoBottom = document.getElementsByClassName('iconbofang1')[0];
// 获取遮罩层
let modal = document.getElementsByClassName('modal')[0];
// 获取功能按键区域
let toobar = document.getElementsByClassName('toobar')[0];
console.log(toobar)
// 事件绑定
function bindEvent(){
    // 视频区域播放按钮点击事件
    // playVideo.onclick = function(e){
    //     e.stopPropagation();
    //     let target = e.target;
    //     // // 当被点击的时候
    //     // // 如果是播放状态，就暂停播放
    //     // // 并显示播放按钮
    //     if(target.classList.contains('play')){
    //         video.pause();
    //         modal.classList.add('pause')
    //         playVideo.classList.remove('play');
    //     }else {
    //         modal.classList.remove('pause');
    //         playVideo.classList.add('play');
    //         video.play();
    //     }
    // }
    // 底部播放按钮事件
    playVideoBottom.onclick = function(e){
    //    阻止捕获和冒泡
        e.stopPropagation();

        // if(){

        // }        
    }
    toobar.onclick = function(e){
        // 阻止捕获和冒泡
        e.stopPropagation(); 
    }
    // 遮罩区域点击事件(控制视频播放与暂停)
    modal.onclick = function(){
        // if(playVideo.classList.contains('play')){
        //     video.pause();
        //     modal.classList.add('pause')
            // playVideo.classList.remove('play');
        // }else {
        //     modal.classList.remove('pause');
            // playVideo.classList.add('play');
        //     video.play();
        // }
        if(video.paused){
            video.play();
            modal.classList.remove('pause');
            playVideo.classList.add('play');
        }else{
            playVideo.classList.remove('play');
            modal.classList.add('pause');
            video.pause();
        }
    }
    // 

}

bindEvent();


// 其他