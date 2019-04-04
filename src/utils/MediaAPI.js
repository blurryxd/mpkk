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

const getSingleMedia = (id) => {
  return fetch(apiUrl + id).then(response => {
    return response.json();
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

export {getAvatar};
export {tokenCheck};
export {checkIfUserNameExists};
export {registerUser};
export {login};
export {getAllMedia};
export {getSingleMedia};
