const apiUrl = 'http://media.mw.metropolia.fi/wbma/media/';

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

export {getAllMedia};
export {getSingleMedia};