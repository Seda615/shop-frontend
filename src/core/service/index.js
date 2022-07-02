const Service = {};

Service.request = (url, method, body) => {

    return fetch(url, {
        method,
        body: body ? body : null,
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
        }
    })
        .then(response => response.json())
};

export default Service;