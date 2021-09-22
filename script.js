let formValidator = {
    handleSubmit:(event)=>{
        event.preventDefault();
        let send = true;

        let inputs = form.querySelectorAll('input');

        formValidator.clearErrors();

        for(let i=0;i<inputs.length;i++) {
            let input = inputs[i];
            let check = formValidator.checkInput(input);
            formValidator.checkInput(input);
            if(check !== true) {
                send = false;
                formValidator.showError(input, check);
            }
        }

       
        if(send) {
            form.submit();
        }
    },
    checkInput:(input) => {
        let rules = input.getAttribute('data-rules');
        
        if(rules !== null) {
            rules = rules.split('|');
            for(let k in rules) {
                let rDetails = rules[k].split('=');

                switch(rDetails[0]) {
                    case 'required':
                        if(input.value == '') {
                            return 'Este campo é obrigatório'
                        }
                    break;

                    case 'min':
                        if(input.value.length < rDetails[1]) {
                            return 'É obrigatório pelo menos '+rDetails[1]+' caracteres';
                        }
                    break;

                    case 'email':
                        if(input.value != '') {
                            let regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]/i;
                            if(!regex.test(input.value.toLowerCase())) {
                                return 'E-mail digitado não é valido!'
                            }
                        }
                    break;    
                }
            }
        }

        return true;
    },
    showError:(input, error) => {
        input.style.borderColor = 'rgb(179, 47, 47)'

        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;

        input.parentElement.insertBefore(errorElement, input.ElementSibling);
    },
    clearErrors:() => {
        let inputs = form.querySelectorAll('input');
        for(let i=0;i<inputs.length;i++) {
            inputs[i].style = '';
        }

        let errorElements = document.querySelectorAll('.error');
        for(let i=0;i<errorElements.length;i++) {
            errorElements[i].remove();
        }
    }
};

let form = document.querySelector('.form-validator');
form.addEventListener('submit', formValidator.handleSubmit);