class RequestError {
  constructor(statusCode, message, data) {
    this.statusCode = statusCode; // Статус-код не равный 200 (404, 500 и тд)
    this.message = message; // Сообщение об ошибке (расшифровка статус-кода ошибки)
    this.data = data; // Данные, переданные вместе с ошибкой
  }
}

// =================================================================================

export default class HTTPClient {
  constructor(url) {
    this.baseUrl = url;
  }

  endpoint(method, path, options) {
    // const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const newUrl = this.baseUrl + path;

    return async (data) => {
      try {
        const response = await fetch(newUrl, {
          method
        });
        if (response.ok) {
          const json = await response.json();
          console.log(json);
          return json;
        } else {
          throw new RequestError(response.status(), `: ошибка ${response.status()}`, response)
        }
      } catch (error) {
        console.log(error);
      }
    };
  }
}