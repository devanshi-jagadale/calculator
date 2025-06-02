let a="",b="",operator="";
let isSecondOperand=false;
let result=0;
let justEvaluated=false;

const display = document.querySelector(".display");

const numbers = document.querySelectorAll(".button");
numbers.forEach(btn=>{
    btn.addEventListener("click",()=>{
        if (justEvaluated) {
      // Start new calculation
            a = "";
            b = "";
            operator = null;
            isSecondOperand = false;
            result = 0;
            justEvaluated = false;
            display.textContent = "";
        }

        if(isSecondOperand==false)
        {
            a=a+btn.id;
            console.log(a);
            display.textContent=a;
        }
        else
        {
            b=b+btn.id;
            console.log(b);
            display.textContent=a +" " + operator +" " + b;
        }
    });
});

const operators = document.querySelectorAll(".op");
operators.forEach(op=>{
    op.addEventListener("click",()=>{
        operator=op.id;
        console.log(operator);
        isSecondOperand=true;
        display.textContent=a +" " + operator;
    })
});

const equal = document.querySelector(".equals");
equal.addEventListener("click",()=>{
    if (operator=="") {
        result = a;
        display.textContent = result;
        console.log(result);
        return;
    }

    let num1 = parseFloat(a);
    let num2 = parseFloat(b);

    if (b === "") {
        result = num1;
        display.textContent = result;
        console.log(result);
        return;
    }

        if (isNaN(num1) || isNaN(num2)) {
            display.textContent = "Invalid input";
            return;
        }

        if(operator=="+")
        {
            result=num1+num2;
        }
        else if(operator=="-")
        {
            result=num1-num2;
        }
        else if(operator=="x")
        {
            result=num1*num2;
        }
        else if(operator=="/")
        {
            result=(num1/num2).toFixed(6);
            if(num2==0)
            {
                result="You really thought that'd work?!";
            }
        }
        else
        {
            result=0;
        }
        console.log(result);
        display.textContent=a +" "+ operator +" " + b +" = "+ result;
        justEvaluated=true;
});

const clr = document.querySelector(".clear");
clr.addEventListener("click",()=>{
        console.log(result);
        a="";
        b="";
        operator = null;
        isSecondOperand = false;
        result = 0;
        display.textContent="";
});

const bs = document.querySelector(".backspace");
bs.addEventListener("click",()=>{
        console.log(result);

        if(b=="" && a!="")
        {
            if (operator=="")
            {
                a=a.slice(0,-1);
            }
            else
                operator="";

            display.textContent=a;
        }
        else if(b!="")
        {
            b=b.slice(0,-1);
            display.textContent=a +" "+ operator +" " + b;
        }
        
});

document.addEventListener("keydown", (e) => {
    const key = e.key;

    if (!isNaN(key) || key === ".") {
        if (!isSecondOperand) {
            a += key;
            display.textContent = a;
        } else {
            b += key;
            display.textContent = a + " " + operator + " " + b;
        }
    }

    else if (["+", "-", "*", "/"].includes(key)) {
        if (a !== "") {
            operator = key === "*" ? "x" : key; // If using "x" as multiplication symbol
            isSecondOperand = true;
            display.textContent = a + " " + operator;
        }
    }

    else if (key === "=" || key === "Enter") {
        let num1 = parseFloat(a);
        let num2 = parseFloat(b);

        if (operator === "+") result = num1 + num2;
        else if (operator === "-") result = num1 - num2;
        else if (operator === "x") result = num1 * num2;
        else if (operator === "/") result = num1 / num2;
        else result = a;

        result = Math.round(result * 10000) / 10000; // round to 4 decimals

        if (operator) {
            display.textContent = a + " " + operator + " " + b + " = " + result;
        } else {
            display.textContent = result;
        }
    }

    else if (key === "Backspace") {
        if (b !== "") {
            b = b.slice(0, -1);
            display.textContent = a + " " + operator + " " + b;
        } else if (operator) {
            operator = "";
            isSecondOperand = false;
            display.textContent = a;
        } else if (a !== "") {
            a = a.slice(0, -1);
            display.textContent = a;
        }
    }

    else if (key === "Escape" || key.toLowerCase() === "c") {
        a = "";
        b = "";
        operator = null;
        result = 0;
        isSecondOperand = false;
        display.textContent = "";
    }
});
