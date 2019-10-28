// 得到数据并渲染
let personArr = [{
    name: '楠谷',
    src: './img/3.png',
    des: '迫不及待，我要改变现有结局',
    sex: 'm'
}, {
    name: '刘聪',
    src: './img/5.png',
    des: 'KEY.L，如货币般流通',
    sex: 'f'
}, {
    name: '大傻',
    src: './img/4.png',
    des: '人生的长河，我对酒当歌',
    sex: 'f'
}, {
    name: '杨和苏',
    src: './img/1.png',
    des: '我不管你的流派你的由来，你们人多还是少',
    sex: 'm'
}, {
    name: '谷美',
    src: './img/2.png',
    des: '我只愿生活在蓬勃的此时此刻',
    sex: 'm'
}];
// 获取ul
let oUl = document.getElementsByTagName('ul')[0];
// 定义全局状态
let state = {
    text: '',
    sex: ''
}
// 数据渲染函数
function renderData(arr) {
    let len = arr.length;
    let str = '';
    for (let i = 0; i < len; i++) {
        str +=
            `
        <li>
            <img src=${arr[i].src} alt="">
            <div class="info">
                <h4>${arr[i].name}</h4>
                <p>${arr[i].des}</p>
            </div>
        </li>
        `
    }
    oUl.innerHTML = str;
}
// 渲染数据
renderData(personArr);


// 输入框事件
let oInput = document.getElementsByTagName('input')[0];
oInput.oninput = function () {
    // let filterText = this.value;
    state.text = this.value;
    // let resultData = filterArrByText(personArr,filterText);
    // renderData(resultData);
    renderData(combineFilter(filterFuncObj, personArr))
}

// 根据文本来过滤函数
function filterArrByText(data, text) {
    var newData = [];
    if (!text) {
        return data;
    } else {
        newData = data.filter(el => el.name.indexOf(text) > -1)
    }
    return newData;
}

// 切换按钮样式
let oBtn = document.getElementsByTagName('span');
let btnArr = Array.from(oBtn);
let lastBtn = btnArr[0];
lastBtn.classList.add('active')
let filterFuncObj = {
    text: filterArrByText,
    sex: filterDataBySex
}

btnArr.forEach(el => {
    el.onclick = function () {
        let sex = el.getAttribute('sex')
        state.sex = sex;
        changeActive(this);
        // renderData(filterDataBySex(personArr,sex))
        renderData(combineFilter(filterFuncObj, personArr))
    }
})
// 让穿进来的btn激活
// 让上一个btn失效
// 让当前btn 变为上一个btn
function changeActive(dom) {
    dom.classList.add('active');
    lastBtn.classList.remove('active');
    lastBtn = dom;
}

// 根据性别过滤
function filterDataBySex(data, sex) {
    if (sex == 'a') {
        return data;
    } else {
        return data.filter(el => el.sex == sex);
    }
}

// 合并过滤函数
// 传入一个对象，对象里面是过滤函数
// 并且要有全局状态
// state = {
//     text:'',
//     sex:''
// }
function combineFilter(obj, data) {
    // 不改变原数据
    let tempArr = [...data];
    for (let prop in obj) {
        tempArr = obj[prop](tempArr, state[prop])
    }
    return tempArr;
}


// 防抖函数
function debounce(fn, delay) {
    let timer = null;
    return function () {
        let self = this;
        let args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(self, args)
        }, delay)
    }
}