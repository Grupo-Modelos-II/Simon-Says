const handleDetail = (resource) => {
    window.location.href = resource;
}

const openDialog = (content) => {
    return Swal.fire(content);
}

const verifyUserStatus = async () => {
    const token = localStorage.getItem('token');
    httpClient.addHeader({name: 'Authorization', value: `Bearer ${token}`});
    let redirectPage;
    if(token) {
        const {data: {isAuthorized}} = await httpClient.get('/auth');
        if(!isAuthorized) {
            localStorage.clear();
            redirectPage = 'pages/login.html';
        } else {
            redirectPage = 'pages/main.html';
        }
    } else {
        redirectPage = 'pages/login.html';
    }
    handleDetail(redirectPage);
};

const closeSession = () => {
    localStorage.removeItem('token');
    handleDetail('/');
};