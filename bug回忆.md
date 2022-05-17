# vue3 在自定义hooks中使用axios请求时， 需要进行一层async/await的装饰，并且定义的数据类型需要注意如果返回的是对象或者数组，则必须使用reactive， 使用ref无法进行响应式更新，

# 处理页面的异步请求问题时，promise请求处理返回，但是这时浏览器还没有定义该对象， 读取不到该属性

# element-plus的dropdown组件 在最新版本会出现在v-for场景用dropdown点击事件会触发两次， 在Vue Tools里查看到 props里新增了一个onclick事件，导致出现这个bug， 目前还未修复，解决办法是在内部在嵌套上一层标签点击