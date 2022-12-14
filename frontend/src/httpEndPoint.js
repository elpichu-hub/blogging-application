const productionURL = 'https://blogging-applications.herokuapp.com';
const developmentURL = 'http://127.0.0.1:8001';

const createUrlForWebSocket = () => {
    const splitString = endPoint.url.split('//')
    return splitString.shift()
};

const endPoint = {
    'url': productionURL,
    'urlForWebSocket': createUrlForWebSocket()
};



export default endPoint;