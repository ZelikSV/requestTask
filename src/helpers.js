function applyRequestHeaders(xml, headers) {
  if (typeof headers === 'object') {
    Object.keys(headers).forEach(key => {
      xml.setRequestHeader(key, headers[key]);
    });
  }
}

function generateURL(constructorURL, methodURL, parameters) {
  const url = new URL(methodURL, constructorURL);

  for (const key in parameters) {
    url.searchParams.set(key, parameters[key]);
  }
  return url;
}

function requestHelper(argObj) {
  const { xml, method, finishURL, headersObj, responseType, downloadLine, data, resolve, reject } = argObj;
  xml.open(method, finishURL);
  xml.responseType = responseType;

  applyRequestHeaders(xml, headersObj);

  xml.onprogress = downloadLine;

  xml.onreadystatechange = () => {
    if (xml.readyState === 4 && xml.status === 200) {
      resolve(xml.response);
    } else if (xml.status !== 200) {
      reject(xml.status);
    }
  };
  xml.send(data);
}