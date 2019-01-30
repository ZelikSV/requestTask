/* eslint-disable no-undef */
const listOpenBtn = document.querySelector('.open-list-btn');
const listWrapper = document.querySelector('.download-list-wrap');
const listFilesContainer = document.querySelector('.download-list');
const closeBtnList = document.querySelector('.download-list-wrap span');


function addElementsToFilesList(files) {
  files.forEach(item => {
    const fileElem = document.createElement('li');
    fileElem.innerHTML = item;
    listFilesContainer.appendChild(fileElem);
  });
}

function clearFilesList() {
  Array.from(listFilesContainer.children).forEach(item => {
    listFilesContainer.removeChild(item);
  });
}

function filesList() {
  const r = new HttpRequest({ baseUrl: 'http://localhost:8000/' });
  r.get('/list', { responseType: 'json' })
    .then(data => {
      clearFilesList();
      addElementsToFilesList(data);
    });
}

function showAndHiddenList(elem) {
  elem.addEventListener('click', function() {
    listWrapper.classList.toggle('active');
    filesList();
  });
}

showAndHiddenList(listOpenBtn);
showAndHiddenList(closeBtnList);