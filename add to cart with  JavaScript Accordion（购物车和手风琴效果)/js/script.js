window.onload = function () {//为了解决IE6没有getElementByClass的方法，需要手写一个该方法。
    if (!document.getElementsByClassName) {//如果找不到该方法，说明是IE6
        document.getElementsByClassName = function (cls) {
            var ret = [];
            var els = document.getElementsByTagName('*');//*代表所有的，找到所有的标签
            for (var i = 0, len = els.length; i < len; i++) {
                if (els[i].className === cls//如果类名相同
                    || els[i].className.indexOf(cls + ' ') >= 0 //如果查找类名aaa。  class="aaa bbb"
                    || els[i].className.indexOf(' ' + cls + ' ') >= 0// class = "bbb aaa ccc"
                    || els[i].className.indexOf(' ' + cls) >= 0) {//class = "bbb ccc aaa"
                    ret.push(els[i]);//PUSH方法把元素添加进数组。
                }
            }
            return ret;//返回找到的数组  类名。
        }
    }

    var cartTable = document.getElementById('cartTable');
    var tr = cartTable.children[1].rows;//cartTable下面chiildre【0】就是thead，【1】是tbody。 tbody下面的所有tr
    var checkInputs = document.getElementsByClassName('check');
    var checkAllInputs = document.getElementsByClassName('check-all');
    var selectedTotal = document.getElementById('selectedTotal');
    var priceTotal = document.getElementById('priceTotal');
    var selected = document.getElementById('selected');
    var foot = document.getElementById('foot');
    var selectedViewList = document.getElementById('selectedViewList');
    var deleteAll = document.getElementById('deleteAll');
	

    //计算
    function getTotal() {
        var seleted = 0;
        var price = 0;
        var HTMLstr = '';
        for (var i = 0, len = tr.length; i < len; i++) {
            if (tr[i].getElementsByTagName('input')[0].checked) {//所有的tr遍历一遍，如果该第一个input，即checkbox被选中了。
                tr[i].className = 'on';//如果被选择了，就高亮，通过赋值一个class
                seleted += parseInt(tr[i].getElementsByTagName('input')[1].value);//input【1】，即第二个input框框（数量框），value是数值，parseInt转成int类型。
                price += parseFloat(tr[i].cells[4].innerHTML);//该tr下面的第五个小类（cell【4】），即价钱栏，interHTML里面的html
                HTMLstr += '<div><img src="' + tr[i].getElementsByTagName('img')[0].src + '"><span class="del" index="' + i + '">取消选择</span></div>'
            }
            else {
                tr[i].className = '';//如果取消了 选择，就取消高亮。
            }
        }

        selectedTotal.innerHTML = seleted;//更新该class里面的interHTML
        priceTotal.innerHTML = price.toFixed(2);//更新该class里面的interHTML。 tofix【2】 保留两位小数。
        selectedViewList.innerHTML = HTMLstr;

        if (seleted == 0) {
            foot.className = 'foot';
        }
    }

    //小计
    function getSubTotal(tr) {
        var tds = tr.cells;
        var price = parseFloat(tds[2].innerHTML);
        var count = parseInt(tr.getElementsByTagName('input')[1].value);
        var SubTotal = parseFloat(price * count);
        tds[4].innerHTML = SubTotal.toFixed(2);
    }

    for (var i = 0 , len = checkInputs.length; i < len; i++) {//遍历所有的勾选框框。
        checkInputs[i].onclick = function () {
            if (this.className === 'check-all check') {
                for (var j = 0; j < checkInputs.length; j++) {
                    checkInputs[j].checked = this.checked;
                }
            }
            if (this.checked == false) {
                for (var k = 0; k < checkAllInputs.length; k++) {
                    checkAllInputs[k].checked = false;
                }
            }
            getTotal();
        }
    }

    selected.onclick = function () {
        if (foot.className == 'foot') {
            if (selectedTotal.innerHTML != 0) {//如果结算是0，不能点出隐藏的框框。
                foot.className = 'foot show';
            }
        }
        else {
            foot.className = 'foot';
        }
    }

    selectedViewList.onclick = function (e) {//“取消选择”的功能实现
        e = e || window.event;//解决IE的兼容性，IE不一定识别e
        var el = e.srcElement;
        if (el.className == 'del') {
            var index = el.getAttribute('index');
            var input = tr[index].getElementsByTagName('input')[0];
            input.checked = false;
            input.onclick();
        }
    }

    for (var i = 0; i < tr.length; i++) {
        tr[i].onclick = function (e) {
            e = e || window.event;//解决IE兼容性
            var el = e.srcElement;//el是 事件的图片
            var cls = el.className;//cls是 el的class名字。
            var input = this.getElementsByTagName('input')[1];//第二个input的变量。
            var val = parseInt(input.value);//要做计算，所以转成int
            var reduce = this.getElementsByTagName('span')[1];//第二个saon标签，指的是减号的soan
            switch (cls) {
                case 'add':
                    input.value = val + 1;
                    reduce.innerHTML = '-';
                    getSubTotal(this);
                    break;
                case 'reduce':
                    if (val > 1) {
                        input.value = val - 1;
                    }
                    if (input.value <= 1) {
                        reduce.innerHTML = '';
                    }
                    getSubTotal(this);
                    break;
                case 'delete':
                    var conf = confirm('确定要删除吗？');
                    if (conf) {
                        this.parentNode.removeChild(this);;//JS没有直接remove（）； this指的是tr【i】， 先站到this的父级，再去掉他的child子集，也就是tr【i】。实现删除tr的方法
                    }
                    break
                default :
                    break;
            }
            getTotal();
        }
        tr[i].getElementsByTagName('input')[1].onkeyup = function () {//键盘输入购买件数
            var val = parseInt(this.value);
            var tr = this.parentNode.parentNode
            var reduce = tr.getElementsByTagName('span')[1];
            if (isNaN(val) || val < 1) {//如果value是空，或者为负数。 value定死为1
                val = 1;
            }
            this.value = val;
            if (val <= 1) {
                reduce.innerHTML = '';//如果件数小于一， 减号按钮就消失
            }
            else {
                reduce.innerHTML = '-';
            }
            getSubTotal(tr);
            getTotal();
        }
    }

    deleteAll.onclick = function () {
        if (selectedTotal.innerHTML != '0') {
            var conf = confirm('确定删除吗？');
            if (conf) {
                for (var i = 0; i < tr.length; i++) {
                    var input = tr[i].getElementsByTagName('input')[0];//第一个input框框
                    if (input.checked) {//如果checkbox被选中，删除这个节点。
                        tr[i].parentNode.removeChild(tr[i]);
                        i--;//每当删除一个节点，数组里面的值就往前移动了一个位置，相对应的下角表i就变小了，所以每次删除时都i--
                    }
                }
            }
        }
    }

    checkAllInputs[0].checked = true;
    checkAllInputs[0].onclick();
}
function showDl(obj){
	/*alert("s");
	console.log(obj);
	console.log(obj.getElementsByTagName('dl')[0]);*/
	var aDl = obj.getElementsByTagName('dl')[0];
	aDl.style.display = 'block';
	}
function hideDl(obj){
	/*alert("s");
	console.log(obj);
	console.log(obj.getElementsByTagName('dl')[0]);*/
	var aDl = obj.getElementsByTagName('dl')[0];
	aDl.style.display = 'none';
	}