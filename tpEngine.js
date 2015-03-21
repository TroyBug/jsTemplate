/**
 * @param {string} tpl 需要解析的html模板 
 */
var TempLate = function(tpl) {
	var re = /\{(\s*[a-zA-Z0-9\.\_\[\]]+\s*)(\s*\|\s*safe)?\}/m,	//{field}
		fnBody = ['var t = [];'],	//动态生成函数体
		match,	
		fn,
		index,
		escape = function(text) {
			return text
					.replace(/&/g,'&amp;')
					.replace(/'/,"&#39")
					.replace(/"/g,'&quot;')
					.replace(/</g,'&lt;')
					.replace(/>/g,'&gt;');
		},
		trim = function(text) {	//处理函数体
			return text
					.replace(/^\s*|\s*$/mg,'')	//处理空格
					.replace(/\n|\r|\t/mg,'')	//处理回车、换行、制表符
					.replace(/'/mg,"\\\'")		//处理单引号
					.replace(/<%/g,'\');')		//处理<%
					.replace(/%>/g,'t.push(\'');//处理%>
		}
	
	while(match = re.exec(tpl)) {
		index = match.index;
		if(index > 0) {
			fnBody.push('t.push(\''+trim(tpl.slice(0,index))+'\');');
			fnBody.push('t.push(this.'+trim(match[1])+');');
			tpl = tpl.substring(index + match[0].length);
		}
	}
	fnBody.push('t.push(\''+trim(tpl)+'\');');
	fnBody.push('return t.join("");');

	fn = new Function(fnBody.join('\n'));	//生成新函数
	//console.log(fn);
	this.render = function(model) {	//调用模板
		return fn.call(model);
	};
};