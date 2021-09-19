const handleDetail = (resource) => {
    window.location.href = resource;
}

const openDialog = (content) => {
    return Swal.fire(content);
}

const verifyUserStatus = () => {
    const token = localStorage.getItem('token');
    const redirectPage = token? 'pages/main.html' : 'pages/login.html';
    handleDetail(redirectPage);
};