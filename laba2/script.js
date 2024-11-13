window.onload = function(){ 
    let a = ''
    let b = ''
    let expressionResult = ''
    let selectedOperation = null
    
    const btn_tem = document.getElementById('btn_tem');
    const btn_tem2 = document.getElementById('btn_tem2');
    
    // окно вывода результата
    outputElement = document.getElementById("result")
    
    // список объектов кнопок циферблата (id которых начинается с btn_digit_)
    digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')
    
    function onDigitButtonClicked(digit) {
        if (!selectedOperation) {
            if ((digit != '.') || (digit == '.' && !a.includes(digit))) { 
                a += digit
            }
            outputElement.innerHTML = a
        } else {
            if ((digit != '.') || (digit == '.' && !b.includes(digit))) { 
                b += digit
                outputElement.innerHTML += digit     
            }
        }
    }

    // устанавка колбек-функций на кнопки циферблата по событию нажатия
    digitButtons.forEach(button => {
        button.onclick = function() {
            if (outputElement.innerHTML.length <= 16)
            {
                const digitValue = button.innerHTML
                onDigitButtonClicked(digitValue)
            }


        }
    });
    
    // установка колбек-функций для кнопок операций
    document.getElementById("btn_op_mult").onclick = function() { 
        if (a === '') return
        if (outputElement.innerHTML.length <= 16){
            selectedOperation = '*'
            outputElement.innerHTML += '*'
        }
    }

    document.getElementById("btn_op_plus").onclick = function() { 
        if (a === '') return
        if (outputElement.innerHTML.length <= 16){
            if (selectedOperation === '+' && b !== ''){
                expressionResult = (+a) + (+b)
                a = expressionResult
                b = ''
                selectedOperation = '+'
                outputElement.innerHTML += '+'
            }
            else{
                selectedOperation = '+'
                outputElement.innerHTML += '+'
            }
        }
    }
    document.getElementById("btn_op_minus").onclick = function() { 
        if (a === '') return
        if (outputElement.innerHTML.length <= 16){
            if (selectedOperation === '-' && b !== ''){
                expressionResult = (+a) - (+b)
                a = expressionResult
                b = ''
                selectedOperation = '-'
                outputElement.innerHTML += '-'
            }
            else{
                selectedOperation = '-'
                outputElement.innerHTML += '-'
            }
        }
    }
    document.getElementById("btn_op_div").onclick = function() { 
        if (a === '') return
        if (outputElement.innerHTML.length <= 16){
            selectedOperation = '/'
            outputElement.innerHTML += '/'
        }
    }
    
    document.getElementById("btn_op_percent").onclick = function() { 
        if (a === '') return
        if (outputElement.innerHTML.length <= 16){
            selectedOperation = '%'
            outputElement.innerHTML += '%'
        }
    }

    // кнопка очищения
    document.getElementById("btn_op_clear").onclick = function() { 
        a = ''
        b = ''
        selectedOperation = null
        expressionResult = ''
        outputElement.innerHTML = 0
    }

    // кнопка расчёта результата
    document.getElementById("btn_op_equal").onclick = function() { 

        if (a === '' || b === '' || !selectedOperation)
            return
            
        switch(selectedOperation) { 
            case '*':
                expressionResult = (+a) * (+b)
                break;
            case '+':
                expressionResult = (+a) + (+b)
                break;
            case '-':
                expressionResult = (+a) - (+b)
                break;
            case '/':
                expressionResult = (+a) / (+b)
                break;
            case '%':
                expressionResult = (+b) * (+a) / 100
                break;
        }
        
        a = expressionResult.toString()
        b = ''
        selectedOperation = null
    
        outputElement.innerHTML = a
    }

    document.getElementById('btn_root').onclick = function() {
        if (a !== '') {
            expressionResult = Math.sqrt(+a)
            a = expressionResult.toString()
            outputElement.innerHTML = a
        }
    }

    document.getElementById('btn_square').onclick = function() {
        if (a !== '') {
            expressionResult = (a**2)
            a = expressionResult.toString()
            outputElement.innerHTML = a
        }
    }

    document.getElementById('btn_factorial').onclick = function() {
        if (a !== '')
        {
            if (a <= 9999999){
                    expressionResult = 1;
                for (var i = 2; i <= a; i++) {
                    expressionResult *= i
                }
                if (expressionResult === Infinity)
                {
                    outputElement.innerHTML = expressionResult
                    a = ''
                }
                else {
                    a = expressionResult
                    outputElement.innerHTML = a
                }
            }
            else {
                outputElement.innerHTML = "Infinity"
                a = ''
            }
        }
    }

    document.getElementById('btn_op_sign').onclick = function() {
        if (outputElement.innerHTML.length <= 16){
            if (selectedOperation === null) {
                a *= -1
                outputElement.innerHTML = a
            } else {
                if(selectedOperation === '+'){
                    selectedOperation = '-'
                    outputElement.innerHTML = a+selectedOperation+b
                }
                else if(selectedOperation === '-'){
                    selectedOperation = '+'
                    outputElement.innerHTML = a+selectedOperation+b
                }
            }
        }
    }

    document.getElementById('btn_backspace').onclick = function() {
        if (a !== '' && !selectedOperation && b === ''){
            expressionResult = a.toString().substring(0, a.toString().length - 1);
            if (expressionResult === ''){
                a = ''
                outputElement.innerHTML = 0
            }
            else {
                a = expressionResult
                outputElement.innerHTML = a
            }
        }
        else if (a !== '' && selectedOperation && b === ''){
            selectedOperation = null
            outputElement.innerHTML = a
        }
        else if (a !== '' && selectedOperation && b !== ''){
            expressionResult = b.toString().substring(0, b.toString().length - 1);
            b = expressionResult
            outputElement.innerHTML = a+selectedOperation+b
        }
    }

    btn_tem.addEventListener('click', () => {
            document.body.classList.toggle('dark');
        });
    
    btn_tem2.addEventListener('click', () => {
        document.body.classList.toggle('dark1');
    });

};