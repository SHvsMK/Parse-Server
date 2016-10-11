Student:
    //Get the info of a student
    GET: /student
    params: {username, sessionToken}
    return: {username, lastname, firstname, phone, email, school, type, paid, finished}

    //change the info of a student
    POST: /student
    params: {username, phone, email, type}
    return: {username, phone, email, type}

Coach:
    //Get the info of a coach
    GET: /coach

