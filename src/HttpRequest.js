class HttpRequest {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  static generateURL(urlString, baseURLString, parameters) {
    const url = new URL(urlString, baseURLString);

    for (const key in parameters) {
      url.searchParams.set(key, parameters[key]);
    }
    return url;
  }

  __request(url, method, config) {
    const xml = new XMLHttpRequest();
    const { headers, downloadLine, params, responseType = 'json', data } = config;
    const finishURL = HttpRequest.generateURL(url, this.baseUrl, params);
    const headersObj = { ...headers, ...this.headers };

    return new Promise((resolve, reject) => {
      xml.open(method, finishURL);
      xml.responseType = responseType;

      Object.entries(headersObj).forEach(([key, value]) => {
        xml.setRequestHeader(key, value);
      });

      xml.onprogress = downloadLine;

      xml.onreadystatechange = () => {
        if (xml.readyState === 4 && xml.status === 200) {
          resolve(xml.response);
        } else if (xml.status !== 200) {
          reject(xml.status);
        }
      };

      if (data) {
        xml.send(data);
      } else {
        xml.send();
      }
    });
  }

  get(url, config) {
    return this.__request(url, 'GET', config);
  }

  post(url, config) {
    return this.__request(url, 'POST', config);
  }
}

/*
const reuest = new HttpRequest({
  baseUrl: 'http://localhost:3000',
});

reuest.get('/user/12345', { onDownloadProgress, headers: {contentType: undefined} })
  .then(response => {
    console.log(response);
  })
  .catch(e => {
    console.log(e)
  });

reuest.post('/save', { data: formdata, header, onUploadProgress })
  .then(response => {
    console.log(response);
  })
  .catch(e => {
    console.log(e)
  });

config = {

  // `transformResponse` allows changes to the response data to be made before
  // it is passed to then/catch
  transformResponse: [function (data) {
    // Do whatever you want to transform the data

    return data;
  }],

  // `headers` are custom headers to be sent
  headers: {'X-Requested-With': 'XMLHttpRequest'},

  // `params` are the URL parameters to be sent with the request
  // Must be a plain object or a URLSearchParams object
  params: {
    ID: 12345
  },

  // `data` is the data to be sent as the request body
  // Only applicable for request methods 'PUT', 'POST', and 'PATCH'
  // When no `transformRequest` is set, must be of one of the following types:
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - Browser only: FormData, File, Blob
  // - Node only: Stream, Buffer

  data: {
    firstName: 'Fred'
  },

  // `responseType` indicates the type of data that the server will respond with
  // options are 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  responseType: 'json', // default

  // `onUploadProgress` allows handling of progress events for uploads
  onUploadProgress: function (progressEvent) {
    // Do whatever you want with the native progress event
  },

  // `onDownloadProgress` allows handling of progress events for downloads
  onDownloadProgress: function (progressEvent) {
    // Do whatever you want with the native progress event
  },
}
*/
