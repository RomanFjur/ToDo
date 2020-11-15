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
    let newUrl = this.baseUrl + path;

    return async (data = undefined) => {
      try {

        const regToDoId = /:toDoId/gi;
        const regId = /toDoId/gi;
        const regName = /name/gi;
        const regTags = /tags/gi;

        if (newUrl.match(regToDoId)) {
          
          const arrFromDataObject = Object.entries(data);

          const idEntriesFromData = arrFromDataObject.find(arr => arr[0].match(regId));
          const idIndex = arrFromDataObject.findIndex(arr => arr[0].match(regId));
          const toDoId = idEntriesFromData[1].toString();
          newUrl = newUrl.replace(regToDoId, toDoId);


          arrFromDataObject.splice(idIndex, 1);
          data = Object.fromEntries(arrFromDataObject);

          // Check for empty 'data'-object
          if (Object.keys(data).length == 0) {
            data = undefined;
          }
        }

        const response = await fetch(newUrl, {
          method,
          headers: {
			      'Content-Type': 'application/json'
		      },
          body: JSON.stringify(data)
        });
        if (response.ok) {
          const json = await response.json(); // при put и delete будет возвращать ошибку (не может привести в json)
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