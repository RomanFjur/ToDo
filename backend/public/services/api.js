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
    const newUrl = this.baseUrl + path;

    return async (data) => {
      try {
        const response = await fetch(newUrl, {
          method,
          headers: {
			      'Content-Type': 'application/json'
		      },
          body: JSON.stringify(data)
        });
        // описать логику по ошибкам после try/catch
        if (response.ok) {
          const json = await response.json();
          return json;
        } else {
          if (response.status === 404) {
            // переписать выброс ошибки отдельно внизу
            throw new RequestError(response.status, `Error: ${response.status} Not found`, response.body); 
            // проверить response.body приходящий от сервера
          } else if (response.status === 500) {
            throw new RequestError(response.status, `Error: ${response.status} Internal Server Error`, response);
          } else {
            throw new RequestError(response.status, `Error: ${response.status} Request Error`, response);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
  }
}