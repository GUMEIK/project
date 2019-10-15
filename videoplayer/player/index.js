// 获取dom 元素
// 获取视频容器
let videoContainer = document.getElementsByClassName('videoContainer')[0];
// 获取视频标签
let video = document.getElementById('video');
// 获取视频界面播放按钮
let playVideo = document.getElementsByClassName('iconbofang')[0];
// 获取底部播放按钮
let playVideoBottom = document.getElementsByClassName('playVideoBottom')[0];
// 获取遮罩层
let modal = document.getElementsByClassName('modal')[0];
// 获取功能按键区域
let toobar = document.getElementsByClassName('toobar')[0];
// 获取时间进度条的当前时间和总时长
let curTime = document.getElementById('curTime');
let totalTime = document.getElementById('totalTime');
// 获得进度条
let progressbar = document.getElementsByClassName('progressbar')[0];
// 获得滑块
let slider = document.getElementsByClassName('controlBtn')[0];
// 获得当前进度
let curProgressBar = document.getElementsByClassName('curentTime')[0];
// 获得进度条遮罩
let progressbarModal = document.getElementsByClassName('progressbarModal')[0];
// 获得滑动块
let volume = document.getElementById('volume');
// 获得倍速区域
let speedList = document.getElementById('speedList');
let playspeed = document.getElementsByClassName('playspeed')[0];
let iconspeed = document.getElementsByClassName('iconspeed')[0];
// 获取全屏按钮
let fullScreen = document.getElementsByClassName('fullScreen')[0];

// 事件绑定
function bindEvent() {
    toobar.onclick = function (e) {
        // 阻止捕获和冒泡
        e.stopPropagation();
    }
    // 遮罩区域点击事件(控制视频播放与暂停)
    modal.onclick = playVideoBottom.onclick = function () {
        // paused 开视频是否是暂停状态
        if (video.paused) {
            video.play();
            modal.classList.remove('pause');
            playVideo.classList.add('play');
            playVideoBottom.classList.remove('iconbofang1');
            playVideoBottom.classList.add('iconbofang_')
        } else {
            playVideo.classList.remove('play');
            modal.classList.add('pause');
            video.pause();
            playVideoBottom.classList.add('iconbofang1');
            playVideoBottom.classList.remove('iconbofang_')
        }
    }
    // 视频总时长发生变化时触发的事件
    // 不能直接获取总时长，因为js代码运行时，视频还没有加载完成
    video.ondurationchange = function () {
        setTime();
    }
    // 当视频当前播放时间发生变化时触发
    // 但是这个频率有所限制，所以在拖动的时候不能靠着这个事件来进行进度条 的更改
    // 应该手动进行更改
    video.ontimeupdate = function () {
        setTime();
        setProgressBar();
    }


    // 进度条事件
    progressbar.onmousedown = function (e) {
        setCurrentTime(e);
        // 当鼠标按下的时候，给整个蒙层注册移动事件
        modal.onmousemove = function (e) {
            setCurrentTime(e);
        }
        modal.onmouseup = function () {
            modal.onmousemove = null;
        }
    }
    progressbar.onmouseup = function () {
        // 鼠标在进度条上抬起继续播放
        // 为什么是这个样子，有待探究
        video.pause();
    }
    // 音量改变事件
    volume.onchange = function () {
        setVolume();
    }
    // 弹出或隐藏 倍速区域
    iconspeed.onclick = function () {
        if (playspeed.classList.contains('active')) {
            playspeed.classList.remove('active');
        } else {
            playspeed.classList.add('active');
        }
    }
    // 设置倍速
    speedList.onclick = function (e) {
        let target = e.target;
        let text = target.innerText;
        let arr = speedList.children;
        // 其他速度没有颜色
        for (let i = 0; i < arr.length; i++) {
            arr[i].classList.remove('choose');
        }
        // 把当前速度加上颜色
        target.classList.add('choose');
        if (target.tagName == 'LI') {
            if (text == '0.5倍') {
                setRate(0.5);
            } else if (text == '2倍') {
                setRate(2);
            } else if (text == '1.25倍') {
                setRate(1.25);
            } else if (text == '1.5倍') {
                setRate(1.5);
            } else {
                setRate(1);
            }
        }
    }
    // 设置全屏
    fullScreen.onclick = function () {
        setFullScreen();
    }
    // 监听屏幕全屏和非全屏状态改变
    videoContainer.onfullscreenchange = function () {
        if (document.fullscreen) {
            hideBar();
        } else {
            // 清空定时器，让工具条出现
            if (timer) {
                clearTimeout(timer);
                hideBar();
            }
        }
    }
    videoContainer.onmousemove = function () {
        if (document.fullscreen) {
            toobar.style.opacity = 1;
            progressbar.style.opacity = 1;
            modal.style.cursor = 'pointer';
            hideBar();
        } else {
            hideBar();
        }
    }
}

bindEvent();


// 其他
// 工具函数
// 得到友好格式字符串
function getTime(s) {
    s = parseInt(s);
    let min = Math.floor(s / 60).toString().padStart('2', '0');
    let seconds = (s % 60).toString().padStart('2', '0');
    return min + ':' + seconds;
}
// 设置时间
function setTime() {
    // 得到当前时间
    let cur = getTime(video.currentTime)
    // 得到总时长
    let total = getTime(video.duration);
    curTime.innerText = cur;
    totalTime.innerText = total;
}
// 设置进度条进度
function setProgressBar() {
    let parcent = (video.currentTime / video.duration) * 100;
    curProgressBar.style.width = parcent + '%';
    slider.style.left = parcent + '%';
}
// 设置当前时间(鼠标按下，调整进度)
function setCurrentTime(e) {
    // 得到一个元素的矩形区域
    let rect = modal.getBoundingClientRect();
    let offsetX = e.pageX - rect.left;
    // 视频的当前时间 = 便宜的x/总宽度 * 总时长
    video.currentTime = offsetX / modal.clientWidth * video.duration;
    setProgressBar();
}
// 设置音量
function setVolume() {
    // 音量的值实际上是从0 到1 
    video.volume = volume.value / 100;
}

function setRate(val) {
    video.playbackRate = val;
}
// 设置全屏

function setFullScreen() {
    if (document.fullscreen) {
        // 如果是全屏就退出全屏
        document.exitFullscreen();
    } else {
        // 如果不是全屏状态，让这个dom对象铺满整个屏幕；
        videoContainer.requestFullscreen();
    }
}
var timer;
// 全屏状态下，一段时间过后隐藏工具条
function hideBar() {
    toobar.style.opacity = 1;
    progressbar.style.opacity = 1;
    modal.style.cursor = 'pointer';
    if (timer) {
        clearTimeout(timer);
    }
    timer = setTimeout(function () {
        toobar.style.opacity = '0';
        progressbar.style.opacity = 0;
        modal.style.cursor = 'none';
    }, 2000)
}


function changeVideo(path) {
    video.src = path;
    modal.click();
}


let treeDemo = [{
    name: ' 1.Vue',
    children: [{
            name: ' 1.1Vue的双向数据绑定',
            children: [{
                name: ' 1.1.1课程一',
                type:'video',
                path:'./player/jj.mp4'
            }]
        }, {
            name: '2.Vue的数据通信'
        }
    ]
}, {
    name: '2. Node',
    children:[
        {
            name:'2.1 建立服务器',
            type:'github',
            url:'github/GUMEIK'
        },
        {name:'2.2 处理跨域请求'}
    ]
}]

// let temp = [];
function linkVideo(arr,temp = []){
    if(arr == null || arr.length == 0) return [];
    for(let i = 0;i < arr.length;i++){
        if(arr[i]['type'] != undefined){
            if(arr[i].path != undefined){
                temp.push(arr[i].path);
            }
        }
        console.log(arr[i])
        temp.concat(linkVideo(arr[i].children));
    }
    return temp;
}


function render(data) {
    if (data == null || data.length == 0) return;
    let str = '';
    for (let i = 0; i < data.length; i++) {
        // 如果存在孩子节点，就再次进行拼接
        if (data[i].children && data[i].children != undefined) {
            let temp = render(data[i].children);
            let type = '';
            var path = '';
            if(data[i]['type'] != undefined){
                if(data[i].path != undefined){
                    path = data[i].path;
                    str += `<ul><li><a href="#" data-type=${type} data-path=${path}>${data[i].name}</a>${temp}</li></ul>`;
                }
            }else{
                str += `<ul><li><a href="#" data-type=${type} >${data[i].name}</a>${temp}</li></ul>`;
            }
        } else {
            // 如果不存在孩子节点，就不拼接temp了
            if(data[i]['type'] != undefined){
                if(data[i].path != undefined){
                    path = data[i].path;
                    str += `<ul><li><a href="#" data-path=${path}>${data[i].name}</a></li></ul>`;
                }
            }else{
                str += `<ul><li><a href="#" >${data[i].name}</a></li></ul>`
            }
        }
    }
    return str;
}
let videoList = document.getElementsByClassName('videoList')[0];
videoList.innerHTML = render(treeDemo);
// 传入放置属性组件的容器
function setMenuList(container) {
    let oUl = container.getElementsByTagName('ul');
    for (let i = 0; i < oUl.length; i++) {
        let oA = oUl[i].getElementsByTagName('a')[0];
        let childUl = oUl[i].getElementsByTagName('ul');
        oA.onclick = function () {
            for (let i = 0; i < childUl.length; i++) {
                let show = childUl[i].style.display == 'none' ? true : false;
                if (show) {
                    childUl[i].style.display = 'block';
                } else {
                    childUl[i].style.display = 'none';
                }
                // 点击带有视频的，就跳转           
            }
            if(oA.dataset.path && oA.dataset.path != undefined){
                // changeVideo为一个函数，改变要video的src属性
                changeVideo(oA.dataset.path);
            }

        }
    }
}

setMenuList(videoList)