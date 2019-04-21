const apiUrl = 'http://media.mw.metropolia.fi/wbma/media/';
const loginUrl = 'http://media.mw.metropolia.fi/wbma/login/';
const registerUrl = 'http://media.mw.metropolia.fi/wbma/users/';
const rootUrl = 'http://media.mw.metropolia.fi/wbma';

const getAllMedia = () => {
  return fetch(apiUrl).then(response => {
    return response.json();
  }).then(json => {
    return Promise.all(json.map(pic => {
      return fetch(apiUrl + pic.file_id).then(response => {
        return response.json();
      });
    })).then(pics => {
      return pics;
    });
  });
};

const getUserMedia = (token) => {
  const settings = {
    headers: {
      'x-access-token': token,
    },
  };
  return fetch(apiUrl + 'user', settings).then(response => {
    return response.json();
  }).then(json => {
    return Promise.all(json.map(pic => {
      return fetch(apiUrl + pic.file_id).then(response => {
        return response.json();
      });
    })).then(pics => {
      return pics;
    });
  });
};

const getSingleMedia = (id) => {
  return fetch(apiUrl + id).then(response => {
    return response.json();
  });
};

const doUpdate = (title, description, id, loginToken) => {
  return fetch(apiUrl + id, {
    method: 'PUT',
    headers: {
      'x-access-token': loginToken,
      'Content-Type': 'application/json',
    },
    Params: {
      'id': id
    },
    body: JSON.stringify({title, description}),
  }).then((response) => {
    return response.json();
  }).then((result) => {
  });
};

const login = (username, password) => {
  return fetch(loginUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({username, password}),
  }).then(response => response.json()).then(json => {
    return json;
  });
};

const checkIfUserNameExists = (username) => {
  return fetch(registerUrl + 'username/' + username).then(response => {
    return response.json();
  }).then(data => {
    return data;
  });
};

const registerUser = (username, password, full_name, email) => {
  return fetch(registerUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({username, password, full_name, email}),
  }).then(response => response.json()).then(json => {
    return json;
  });
};

const tokenCheck = (token) => {
  return fetch(registerUrl + '/user/', {
    headers: {
      'x-access-token': token,
    },
  }).then(response => response.json()).then(json => {
    return json;
  });
};

const getAvatar = (uID) => {
  return fetch(rootUrl + '/tags/profile')
      .then(response => response.json())
      .then(json => {
        return json.find(o => o.user_id === uID);
      });
};

const changeForm = () => {
  if (document.querySelector("#logincontainer").style.display === 'block') {
    document.querySelector("#logincontainer").style.display = 'none';
    document.querySelector('#regcontainer').style.display = 'block';
    document.querySelector('#changeButton').innerHTML = 'Take me back to login!';
  } else {
    document.querySelector("#logincontainer").style.display = 'block';
    document.querySelector('#regcontainer').style.display = 'none';
    document.querySelector('#changeButton').innerHTML = 'New user? Register instead!';
  }
};

const deleteMedia = (id, token) => {
  return fetch(apiUrl + id, {
    method: 'DELETE',
    headers: {
      'x-access-token': token,
    },
  }).then(response => response.json()).then(json => {
    return json;
  });
};


const fetchUser = (id) => {
  fetch(registerUrl + id, {
    headers: {
      'x-access-token': localStorage.getItem('Login-token'),
    },
    Params: {
      'id': id
    },
  }).then(response => response.json()).then(json => {
    //console.log(json);
    return json;
  });
};

export {fetchUser};
export {doUpdate};
export {getUserMedia};
export {getAvatar};
export {tokenCheck};
export {checkIfUserNameExists};
export {registerUser};
export {login};
export {getAllMedia};
export {getSingleMedia};
export {changeForm};
export {deleteMedia};