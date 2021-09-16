const form = document.getElementById('form-register');
let httpClient = new HttpClient();

form.addEventListener('submit',(event) => {
    event.preventDefault();
    let name = document.getElementById('name').value;
    let pass = document.getElementById('passUno').value;
    let reqpass = document.getElementById('passDos').value;
    if(pass === reqpass){
        httpClient.post('/player/create', {name, pass, max_score: 0})
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.error(error);
        });
    } else {
        openDialog('Las contraseñas no coinciden');
    }
});