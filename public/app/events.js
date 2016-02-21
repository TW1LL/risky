(function() {
    "use strict"
    let socket = io();
    let divUsername = document.getElementById('username');
    let users = {};
    let games = {};
    let userData = JSON.parse(localStorage.getItem("user_data"));
    socket.on('connect', function() {
        let user_id = localStorage.getItem("user_id");
        socket.emit('user:identify', user_id);
    });
    socket.on('user:data', function(data) {
        localStorage.setItem("user_id", data.id);
        localStorage.setItem("user_data", JSON.stringify(data));
        divUsername.innerHTML = data.name;

    });
    socket.on('user:update', function(data) {
        users[data.id] = data;
        if (data.id == userData.id) {
            userData = data;
            localStorage.setItem("user_data", JSON.stringify(data));
        }
    });
    document.querySelector("form").addEventListener('submit', function(evt){
        evt.preventDefault();
        let inputNickname = document.getElementById('nicknameInput').value;
        socket.emit('user:set', ['nickname', inputNickname]);
        console.log(inputNickname);
        divUsername.innerHTML = inputNickname;
        return false;
    });
})();
