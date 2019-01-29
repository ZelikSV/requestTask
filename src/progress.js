
const progress = document.getElementById('progress');
const inputUpload = document.getElementById('download');
const uploadLabel = document.querySelector('.download-icon span');
const btnUpload = document.querySelector('.btn-upload');
const inputDownload = document.querySelector('.search-field');
const btnDownload = document.querySelector('.btn-download');
const listOpenBtn = document.querySelector('.open-list-btn');
const listWrapper = document.querySelector('.download-list-wrap');
const closeBtnList = document.querySelector('.download-list-wrap span');
const listFilesContainer = document.querySelector('.download-list');

function changeStatusBtn(elem, btn) {
  elem.addEventListener('input', function() {
    if (elem.value !== '') {
      btn.disabled = false;
    } else {
      btn.disabled = true;
    }
  });
}

function changeInputFileValue(elem, titleValue) {
  elem.addEventListener('change', function() {
    if (elem.value !== '') {
      titleValue.innerHTML = elem.value.replace(/.*\\/, '');
    } else {
      titleValue.innerHTML = 'Choose your file';
    }
  });
}

function downloadLine(event) {
  const percentage = Math.round(event.loaded / event.total * 100);
  progress.style.opacity = 1;
  progress.style.width = `${percentage}%`;
  document.title = `${percentage}%`;
  setTimeout(() => {
    document.title = 'Download Master';
    progress.style.opacity = 0;
    progress.style.width = '0%';
  }, 1500);
}

function showImgOnPage(data) {
  const imgSrc = window.URL.createObjectURL(data, { type: `${data.type}` });
  document.getElementById('download-img').src = imgSrc;
}

function downloadFile(data) {
  const downloadURL = URL.createObjectURL(data, { type: data.type });
  const fileLink = document.createElement('a');

  document.body.appendChild(fileLink);
  fileLink.style.display = 'none';
  fileLink.href = downloadURL;
  fileLink.download = data.type;
  fileLink.click();
  document.body.removeChild(fileLink);
}

function clearFilesList() {
  Array.from(listFilesContainer.children).forEach(item => {
    listFilesContainer.removeChild(item);
  });
}

function addElementsToFilesList(files) {
  files.forEach(item => {
    const fileElem = document.createElement('li');
    fileElem.innerHTML = item;
    listFilesContainer.appendChild(fileElem);
  });
}

function filesList() {
  // eslint-disable-next-line no-undef
  const r = new HttpRequest({ baseUrl: 'http://localhost:8000/' });
  r.get('/list', { downloadLine, responseType: 'json' })
    .then(data => {
      clearFilesList();
      addElementsToFilesList(data);
    });
}

function showAndHiddenList(elem) {
  elem.addEventListener('click', function() {
    listWrapper.classList.toggle('active');
  });
}

document.getElementById('uploadForm').onsubmit = function(e) {
  e.preventDefault();
  const form = new FormData();
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'multipart/form-data');
  form.append('sampleFile', e.target.sampleFile.files[0]);
  // eslint-disable-next-line no-undef
  const xhr = new HttpRequest({ baseUrl: 'http://localhost:8000' });
  xhr.post('/upload', { downloadLine, data: form });
  btnUpload.disabled = true;
  filesList();
};

document.getElementById('downloadForm').onsubmit = function(e) {
  e.preventDefault();
  // eslint-disable-next-line no-undef
  const xhr = new HttpRequest({ baseUrl: 'http://localhost:8000' });
  xhr.get(`/files/${e.target[0].value}`, { downloadLine, responseType: 'blob' })
    .then(data => {
      if (data.type === 'image/jpeg') {
        showImgOnPage(data);
      } else {
        downloadFile(data);
      }
    })
    .catch(error => {
      throw new Error(error);
    });
  btnDownload.disabled = true;
};

showAndHiddenList(listOpenBtn);

showAndHiddenList(closeBtnList);

changeStatusBtn(inputUpload, btnUpload);

changeStatusBtn(inputDownload, btnDownload);

changeInputFileValue(inputUpload, uploadLabel);