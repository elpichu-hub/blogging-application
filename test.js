const productionURL = 'https://blogging-applications.herokuapp.com';
const developmentURL = 'http://127.0.0.1:8001';



const endPoint = {
    'url': productionURL,
    'urlForWebSocket': createUrlForWebSocket()
};

const createUrlForWebSocket = () => {
    const splitString = endPoint.url.split('//')
    return splitString[1];
};


console.log(createUrlForWebSocket)