class RequestError {
  constructor(statusCode, message, data) {
    this.statusCode = statusCode; // Статус-код не равный 200 (404, 500 и тд)
    this.message = `Request Error: ${message}`; // Сообщение об ошибке (расшифровка статус-кода ошибки)
    this.data = data; // Данные, переданные вместе с ошибкой
  }
}

export default class HTTPClient {
  constructor(url) {
    this.baseUrl = url;
  }

  endpoint(method, path, options) {

    return async (data = undefined) => {
      let newUrl = this.baseUrl + path;

      try {
        const regToDoId = /:[a-z]{1,}/gi;

        if (newUrl.match(regToDoId)) {

          const findableKeys = newUrl.match(regToDoId);
          
          let rewriteKeys = findableKeys.map(str => str.split(''));
          rewriteKeys.map(str => str.splice(0, 1));
          rewriteKeys = rewriteKeys.map(str => str.join('').toLowerCase());

          if (typeof data != 'object') {
            newUrl = newUrl.replace(regToDoId, data);
            data = undefined;
          } else {
            for (let key in data) {
              for (let i = 0; i < rewriteKeys.length; i++) {
                if (rewriteKeys[i].indexOf(key) != -1) {
                  newUrl = newUrl.replace(findableKeys[i], data[key]);
                }
              }
            };
          }
          // полностью переписать по новой
        }

        const response = await fetch(newUrl, {
          method,
          headers: {
			      'Content-Type': 'application/json'
		      },
          body: JSON.stringify(data)
        });
        if (response.ok) {
          const json = await response.json();
          return json;
        } else {
          throw new RequestError(response.status, `${response.status}`, response.bodyUsed);
        }

      } catch (error) {
        console.log(error.message);
      }
    };
  }
}