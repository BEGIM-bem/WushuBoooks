export const validateForm = (form, callback) => {
    if (form.name === '') return callback('Заполните имя и фамилия');
    if (form.email === '') return callback('Заполните почту');
    if (form.password === '') return callback('Заполните пароль');
    if (form.password.length < 8) return callback('Пароль должен содержать не менее 8 символов');
    const regExp = /(?=.*[A-Z])/
    if (!regExp.test(form.password)) return callback('Пароль должен состоять хотя бы из 1 заглавной буквы');
    if (form.confirmPassword === '') return callback('Подтвердите пароль')
    if (form.confirmPassword !== form.password) return callback('Пароли не совпадают');
}

export const isValidated = (form) => {
    if (form.name === '') return false;
    if (form.email === '') return false;
    if (form.password === '') return false;
    if (form.password.length < 8) return false;
    if (form.name === '') return false;
    const regExp = /(?=.*[A-Z])/
    if (!regExp.test(form.password)) return false;
    if (form.confirmPassword === '') return false;
    if (form.confirmPassword !== form.password) return false;
    return true;
}