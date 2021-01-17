const button = document.querySelector('button.submit')
const phone = document.querySelector("input[name ='phone']")
button.addEventListener('click', validate)

function validate(e){
    const perfectPhone= /^\+234[\d]{10}$/gi
    if( !perfectPhone.test(phone.value)) {
        console.log('INVALID')
        console.log(phone.value)
        e.preventDefault();
    }

    return true;
}
