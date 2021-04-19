'use strict';
let keywordArray = ['narwhal', 'rhino', 'unicorn', 'unilego', 'triceratops', 'markhor', 'mouflon', 'addax', 'chameleon', 'lizard', 'dragon'];



keywordArray.forEach((item) => {

  $('select').append(`<option value="${item}">${item}</option>`);

});


function Gallery(horns) {
  this.title = horns.title;
  this.image_url = horns.image_url;
  this.description = horns.description;
  this.keyword = horns.keyword;

}

Gallery.prototype.render = function () {

  let $galleryClone = $('.photo-template').clone();
  $('main').append($galleryClone);
  $('main').append($galleryClone);
  $galleryClone.find('h2').text(this.title);
  $galleryClone.find('img').attr('src', this.image_url);
  $galleryClone.find('p').text(this.description);
  $galleryClone.removeClass('photo-template');
  $galleryClone.attr('class', this.title);
};

Gallery.readJson = () => {
  const ajaxSettings = {
    method: 'get',
    datatype: 'json',
  };

  $.ajax('./data/page-1.json', ajaxSettings)
    .then(data => {
      data.forEach(item => {
        let gallery = new Gallery(item);
        gallery.render();


      });
      $('.photo-template').hide();

    });

};

$(() => Gallery.readJson());

$('select').on('change', function (event) {
  $('.photo-template').show();
  const ch = $('.content').children();
  for (let i = 1; i < ch.length; i++) {
    ch[i].remove();
  }

  $(() => Gallery.readJson());
  Gallery.readJson = () => {
    const ajaxSettings = {
      method: 'get',
      datatype: 'json',
    };

    $.ajax('./data/page-1.json', ajaxSettings)
      .then(data => {

        data.forEach(item => {

          let gallery = new Gallery(item);

          if (event.target.value === gallery.keyword) {
            gallery.render();
          }else if(event.target.value==='default'){
            gallery.render();
          }

        });
        $('.photo-template').hide();

      });

  };

});

