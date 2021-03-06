class RequestError {
  constructor(statusCode, message, data) {
    this.statusCode = statusCode; // Статус-код не равный 200 (404, 500 и тд)
    this.message = message; // Сообщение об ошибке (расшифровка статус-кода ошибки)
    this.data = data; // Данные, переданные вместе с ошибкой
  }
}

// =================================================================================

class HTTPClient {
  constructor(url) {
    this.baseUrl = url;
  }

  endpoint(method, path, options) {
    // const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const newUrl = this.baseUrl + path;
    return async (data) => {
      fetch(newUrl, {
        method
      });
    };
}

// const client = new HTTPClient('http://localhost:3000');

// const endpointGetToDos = client.endpoint('GET', '/todos', {normalizer: (data) => {}});
// const endpointCreateToDo = client.endpoint('POST', '/todos');

// const toDos = await endpointGetToDos();

// try {
  
// } catch (error) {
//   console.log(error);
// }