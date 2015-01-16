// JavaScript Document
window.onload = function(){
	var btn = document.getElementById("btn");
	var decreaseHeight = 50;
	var oneScrenHeight = document.documentElement.clientHeight;//用户的可视高度，一个屏幕的高度
	var isStop = true;
	//alert(oneScrenHeight);
	window.onscroll = function(){//滚动时持续触发
		var screenTop = document.documentElement.scrollTop|| document.body.scrollTop;
		if(screenTop>=oneScrenHeight){
			btn.style.display = 'block';
		}
		else{
			btn.style.display = 'none';
		}
		/*if(!isStop){
			clearInterval(timer);
			}
		isStop = false;*/
		}
	
	var scroll=function(){
		var screenTop = document.documentElement.scrollTop|| document.body.scrollTop;//因为chrome浏览器不支持documentElemt，只支持body。 而IE只有documentelement
		var speed = Math.floor(-screenTop/10);//向下舍入取整
		document.documentElement.scrollTop = screenTop+speed; 
		document.body.scrollTop = screenTop+speed;
		//isStop = true;//让stop是true 不让他停止，除非用户有其他的操作。
		if(screenTop <= 0){//如果高度是0，取消定时器
				clearInterval(timer);
			}
		}
	btn.onclick = function(){
		timer = setInterval(scroll,20)
		}
		
	}