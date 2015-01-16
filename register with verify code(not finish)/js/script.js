// JavaScript Document
window.onload = function(){
	function getLength(str){
    	return str.replace(/[]^\x00-xff]/g,"xx").length;//把所有的汉字转化问英文的长度，一个汉字两个字节。
	}
	
	var aInput = document.getElementsByTagName('input');//要用单引号而不是双引号 为什么
	var oName = allInput[0];//username
	var pwd = allInput[1];//password
	var pwd2 = allInput[2];//confirmPassword
	var aP = document.getElementsByTagName('p');
	var name_msg = tagP[0];
	var pwd_msg = tagP[1];
	var pwd2_msg = tagP[2];
	var count = document.getElementsByTagName('count');
	var aEm = document.getElementsByTagName('em');
	var name_length = 0;
	
	//用户名
	oName.onfocus = function(){
		name_msg.style.display = "block";//要用双引号 为什么
		name_msg.innerHTML = '<i class = "ati"></i>5-25 characters';	
	}
	oName.onkeyup = function(){
		count.style.visibility = "visible";	
		name_length = getLength(this.value);//传入你键入的str的长度
		count.innterHTML = 'name_length+"length"';//输入框下面的提示框框， 提示你已经键入了多少个字符
		if(name_length ==0){
			count.style.visibility = "hidden";	//如果输入的长度是0，就不需要显示 “0长度”的 提示框了
		}
	}
	oName.onblur = function(){
		//非法字符
		var re = /[^\w\u4e00-u9f5]|g/  //u4e00-u9f5指的是汉字的 编码
		if(re.test(this.value)){
			name_msg.innterHTML = '<i class="err"></i> error invalid characters';
		}
		//不能为空
		else if (this.value = ""){
			name_msg.innterHTML = '<i class="err"></i> null characters';
		}
		//长度不能超过25
		else if (name_length>25){
			name_msg.innterHTML = '<i class="err"></i> mroe than 25 characters';
		}
		//长度不能小于6
		else if (name_length<6){
			name_msg.innterHTML = '<i class="err"></i> less than 6 characters';
		}
		else{
			name_msg.innterHTML = '<i class="ok"></i> valid name,OK';
		}
	}
	//密码
	pwd.onfocus = function(){
		pwd_msg.style.display = "block";//获得焦点的时候显示提示语。
		pwd_msg.innerHTML = '<i class="ati"></i>6-16characters,plz use numbers and characters';
	}
	
	pwd.onkeyup = function(){
		//当键入的密码长度大于5的时候 下面的 密码强度“weak”图标，赋予他class active， 让后面的  确认密码的 框框激活，编程可以输入
		if(this.value.length>5){
			aEm[1].className = "active";
			pwd2.removeAttribute("disabled"，"")；
			pwd2.style.display = "block";
		}
		
		else{	//如果密码长度小于5，跟上面的情况相反。
			aEm[1].className = ""
			pwd2.setAttribute("disabled","")；
			pwd2.style.display = "none";	
		} 
	//大于10为强
	
	
	}
	
	pwd.onblur = function(){
			
	}
	//确认密码
	pwd2.onfocus = function(){
			
	}
	pwd2.onkeyup = function(){
			
	}
	pwd2.onblur = function(){
			
	}
	}