# paat-ui


-----

我们通常需要在react,antd的基础上封装一些通用的ui组件，现在我们可以把它们抽离出来，才有了我们现在的项目.

> * 通用ui大组件
> * hook集合
> * todo

## 使用example

```
npm install paat-ui

```

```
import { Login } from 'paat-ui'

```

## 注意

因为项目使用hook，如果你看到
![报错](https://fileserver.paat.com/1e6/1e6dca427dbf3b84af4c087ee55f5540.png)

[原因可参考](https://reactjs.org/warnings/invalid-hook-call-warning.html)

当然我们也给出了方案

#### 请检查webpack配置文件或者等同文件加入

```
import { resolve } from 'path'

```

``` 
alias: {
    React: resolve(__dirname, './node_modules/react'),
    'react-dom': resolve(__dirname, './node_modules/react-dom'),
},

```

如果还不行，尝试下删除node_modules包 重新装下依赖


### theme相关

可参考antd的theme配置,但是由于为了迎合公司图标的问题，针对图标可能需要特殊处理一下

你需要再全局样式加上less文件然后放下如下代码

```
@import "~antd/lib/style/themes/default.less";
@icon-prefix: ~'nm-icon';
.@{icon-prefix} {
color: @primary-color;
}
```


#### 当然我们也在寻求更优方案也欢迎give me a idea


## todo

- [x] 优化login组件
- [ ] 优化工作流
- [ ] 增加更多组件
- [ ] 增加通用hook
- [ ] 增加通用方法




