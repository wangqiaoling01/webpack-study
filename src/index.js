// 引入 css
import '@/styles/style1.css'
import '@/styles/style2.less'
console.log('window.ENV', ENV)

import { sum } from './math'
const sumRes = sum(10, 20)
console.log('sumRes', sumRes)

// 引入图片
function insertImgElem(imgFile) {
    const img = new Image()
    img.src = imgFile
    document.body.appendChild(img)
}
import imgFile1 from '@/assets/img/1.png'
insertImgElem(imgFile1)
import imgFile2 from '@/assets/img/2.jpeg'
insertImgElem(imgFile2)

import _ from 'loadsh'
console.log(_.get);

// 假设这个文件很大 需要懒加载
setTimeout(() => {
    // 定义chunk
    import('./dynamic-data').then(res => {
        // 注意这里有个 default
        console.log(res.default.msg);
    })
}, 2000);
import reactMsg from './react-demo.jsx'

console.log(reactMsg.msg);