var getUser = (id, callback) => {
    let user = { id, name: 'Godofredo' };
    setTimeout(() => {
        callback(user);
    }, 2000);
};

getUser(12, user => console.log(user));
