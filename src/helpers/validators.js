const checkEmail = (email) => {
    const reg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    let test = reg.test(email);
    return test;
};

export { checkEmail };
