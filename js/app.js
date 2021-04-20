'use strict';
let keywordArray = ['narwhal', 'rhino', 'unicorn', 'unilego', 'triceratops', 'markhor', 'mouflon', 'addax', 'chameleon', 'lizard', 'dragon','jackalope','horn','triceratops','Music','giraffe','saiga'];

let pageNumber = 1;
let keywordSelected=0;
let sort=0;

keywordArray.forEach((item) => {

  $('#keyword').append(`<option value="${item}">${item}</option>`);

});


function Gallery(horns) {
  this.title = horns.title;
  this.image_url = horns.image_url;
  this.description = horns.description;
  this.keyword = horns.keyword;
  this.horns=horns.horns;
}

Gallery.prototype.renderObj = function () {

  let template = $('#hornTemplate').html();
  let margeTemplate=Mustache.render(template,this);
  $('.content').append(margeTemplate);

};

let readJson = () => {


  const ajaxSettings = {
    method: 'get',
    datatype: 'json',
  };

  $.ajax('./data/page-1.json', ajaxSettings)
    .then(data => {
      data.forEach(item => {
        let gallery = new Gallery(item);
        gallery.renderObj();


      });


    });

};
$('fieldset').on('click',function(event){

  if(event.target.value){
    pageNumber = event.target.value;

    if(keywordSelected===0){
      readJson2('default');

    }else{
      readJson2(keywordSelected);
    }
  }
});

readJson();

$('#keyword').on('change', function (event) {
  keywordSelected=event.target.value;
  readJson2(keywordSelected);

});

$('#sort').on('change', function (event) {
  sort=event.target.value;
  if(keywordSelected===0){
    readJson2('default');

  }else{
    readJson2(keywordSelected);
  }

});

let readJson2 = (a) => {
  const ajaxSettings = {
    method: 'get',
    datatype: 'json',
  };

  const ch = $('.content').children();
  for (let i = 0; i < ch.length; i++) {
    ch[i].remove();
  }


  $.ajax(`./data/page-${pageNumber}.json`, ajaxSettings)
    .then(data => {
      if(sort==='title'){
        data.sort((a,b)=>{

          if(a.title.toUpperCase()<b.title.toUpperCase()){

            return -1;
          }else if(a.title.toUpperCase()>b.title.toUpperCase()){
            return 1;
          }else{
            return 0;
          }
        });
      }else if(sort==='# of horns'){
        data.sort((a,b)=>{

          if(a.horns<b.horns){

            return -1;
          }else if(a.horns>b.horns){
            return 1;
          }else{
            return 0;
          }
        });

      }

      data.forEach(item => {

        let gallery = new Gallery(item);
        console.log(gallery);


        if (a === gallery.keyword) {
          gallery.renderObj();
        }else if(a==='default'){
          gallery.renderObj();
        }

      });

    });

};
