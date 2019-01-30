const imgWrapper = document.querySelector('.download-img-wrap');

function showImgOnPage(data) {
  const imgSrc = window.URL.createObjectURL(data, { type: `${data.type}` });
  document.getElementById('download-img').src = imgSrc;
  imgWrapper.classList.add('active');
}

imgWrapper.querySelector('span').addEventListener('click', function() {
  imgWrapper.classList.remove('active');
});