var number = document.getElementsByClassName("number");
var inputValue = document.querySelector("#inputValue");
var clearValue = document.getElementById("clear");
var lastValue='';
var calc = 0;
var symbols=[]
var numbers =[]
var digit = 0;
var equal = document.getElementById("equal");
for(var i=0;i<number.length;i++){
	number[i].addEventListener("click",function(){
		if(this.innerText==='+'||this.innerText==='-'||this.innerText==='x'||this.innerText==='÷'){
			if(!(lastValue==='+'||lastValue==='-'||lastValue==='x'||lastValue==='÷'||lastValue==='')){
				inputValue.value+=" "+this.innerText+" ";
				lastValue = this.innerText;
			}
		}else{
			inputValue.value+=this.innerText;
			lastValue = this.innerText;
		}
	});
}
clearValue.addEventListener("click",function(){
	inputValue.value='';
	lastValue='';
	calc=0;
});
function calculate(num1,num2,name){
	var calc;
	if(name==='+'){
		calc=num1+num2;
	}else if(name==='-'){
		calc=num1-num2;
	}else if(name==='x'){
		calc=num1*num2;
	}else if(name==='÷'){
		calc=num1/num2;
	}
	return calc;
};
equal.addEventListener("click",function(){
	while(symbols.length!==0){
		symbols.pop();
	}
	while(numbers.length!==0){
		numbers.pop();
	}
	if(!(lastValue==='+'||lastValue==='-'||lastValue==='x'||lastValue==='÷'||lastValue==='')){
		var string = inputValue.value;
		var num =0;
		var i =0;
		while(i<string.length){
			var flag =0;
			while(i<string.length&&string[i]!==' '){
				
				if(flag===0){
					num=(num*10)+Number(string[i]);
				}else{
					num=num+(Number(string[i])*0.1);
				}
				i+=1;
				if(string[i]==='.'){
					flag=1;
					i+=1
					if(string[i]===' ' ||(!i<string.length)){
						break;
					}
				}
			}
			if(i+2<string.length&&string[i]==' '){
				numbers.push(num);
				num=0
				symbols.push(string[i+1]);
				i+=3;
			}

		}

		if(i!==0){
		numbers.push(num);
		}
		calc = numbers[0];
		for(var j=0;j<symbols.length;j++){
			calc = calculate(calc,numbers[j+1],symbols[j]);
		}
		inputValue.value=calc;
	}
});