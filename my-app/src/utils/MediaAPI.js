const apiUrl = 'http://media.mw.metropolia.fi/wbma/media/';
const loginUrl = 'http://media.mw.metropolia.fi/wbma/login/';


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
    body: JSON.stringify({username, password})
  }).then(response => response.json()).then(json=> {
    console.log(json);
    if (json.token){
      console.log(json.message);
    } else {
      console.log(json.message);
    }
  });
};




export {login};
export {getAllMedia};
export {getSingleMedia};
