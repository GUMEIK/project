# 难点
这个demo还算初级，主要的难点在于合并过滤函数，如果再增加过滤条件不可能在每一处都在增加若干条代码，不利于维护。

此处的做法是利用一个全局状态对象 来记录过滤条件

通过一个合并过滤函数，来合并所有的过滤函数，

当项目产生变化增添新的过滤条件时，我们需要增加或更改更改的仅是 全局状态 和 过滤函数

```js
// 定义全局状态
let state = {
    text: '',
    sex: ''
}
// 定义全部过滤函数对象，要与状态的属性名一致(为了方便合并函数的过滤)
// 根据性别过滤
function filterDataBySex(data, sex) {
    if (sex == 'a') {
        return data;
    } else {
        return data.filter(el => el.sex == sex);
    }
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
// 定义过滤函数对象
let filterFuncObj = {
    text: filterArrByText,
    sex: filterDataBySex
}
// 定义合并过滤函数的函数
function combineFilter(obj, data) {
    // 不改变原数据
    let tempArr = [...data];
    for (let prop in obj) {
        tempArr = obj[prop](tempArr, state[prop])
    }
    return tempArr;
}
```