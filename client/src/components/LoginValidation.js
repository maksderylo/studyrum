function validation(values) {
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,20}$/

    if (values.email ===""){
        error.email = "Name should not be empty"
    }
    else if(!email_pattern.test(values.email)){
        error.email = "Write email in a correct formula"
    }
    else{
        error.email = ""
    }

    if (values.password ===""){
        error.password= "Password should not be empty"
    }
    else if(!password_pattern.test(values.password)){
        error.password = "Write password in a corrent formula"
    }
    else{
        error.password = ""
    }
    return error;
}

export default validation