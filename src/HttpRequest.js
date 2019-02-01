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