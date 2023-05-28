function validation(values) {
    let errors = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,20}$/

    if (values.name ===""){
        errors.name = "Username should not be empty!"
    }
    else{
        errors.name = ""
    }

    if (values.email ===""){
        errors.email = "Email should not be empty!"
    }
    else if(!email_pattern.test(values.email)){
        errors.email = "Write email in a correct formula!"
    }
    else{
        errors.email = ""
    }

    if (values.password === ""){
        errors.password= "Password should not be empty!"
    }
    else if(!password_pattern.test(values.password)){
        errors.password = "Write password in a corrent formula!"
    }
    else{
        errors.password = ""
    }


    return errors;
}

export default validation