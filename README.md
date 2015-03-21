# 一个简单的js模板引擎
```javascript
<script src="tpEngine.js"></script>

<script id="tpl" type="text/plain">
 		<h1>{title}</h1>
 		<ul>
 			<% if (this.title) {%>
	 			<% for(var i = 0; i < this.list.length; i++) { %>
	 				<li>{list[i]}</li>
	 			<% } %>
	 		<% } else {%>
	 			{title}
	 		<%} %>
 		</ul>
</script>

<script>
	var txt = document.getElementById('txt'),	//容器ID
		tpl = document.getElementById('tpl'),	//模板ID
		tplTxt = tpl.innerHTML,					//模板内部文本
		t = new TempLate(tplTxt),				//实例化
		model = {
 			title:'欢迎使用jsTemplate',
		    list:[
		        'test1:1',
		        'test2:2',
		        'test3:3',
		        'test4:4'
		    ]
 		},
		html = t.render(model);	//生成html文本

	txt.innerHTML = html;	//放入目标容器
</script>
```

```html
欢迎使用jsTemplate
    test1:1
    test2:2
    test3:3
    test4:4
```
