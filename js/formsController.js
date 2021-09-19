const register = document.getElementById('form-register');
const login = document.getElementById('form-login');
let httpClient = new HttpClient();

if(register) {
    register.addEventListener('submit',(event) => {
        event.preventDefault();
        let name = document.getElementById('name').value;
        let pass = document.getElementById('passUno').value;
        let reqpass = document.getElementById('passDos').value;
        if(pass === reqpass){
            httpClient.post('/player/', {name, pass, max_score: 0})
            .then(({state, data: {message}}) => {
                if(state) {
                    openDialog({title: 'Exito', text: message, icon: 'success'}).then(() => {
                        handleDetail('/');
                    });
                } else {
                    throw message;
                }
            })
            .catch((error) => {
                openDialog({title: 'Error', text: error, icon: 'error'});
            });
        } else {
            openDialog('Las contraseñas no coinciden');
        }
    });
}

if(login) {
    login.addEventListener('submit',(event) => {
        event.preventDefault();
        let username = document.getElementById('name').value;
        let password = document.getElementById('pass').value;
        httpClient.post('/auth/', {username, password})
        .then(({state, data: {token, message}}) => {
            if(state) {
                localStorage.setItem('token', token);
                handleDetail('main.html');
            } else {
                throw message;
            }
        })
        .catch((error) => {
            openDialog({title: 'Error', text: error, icon: 'error'});
        });
    });
}