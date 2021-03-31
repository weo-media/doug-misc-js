/*
//============================================================================================    
//Copyright (c) 2011-2020 WEO MEDIA (TouchPoint Communications LLC). All rights reserved.
//   UNAUTHORIZED USE IS STRICTLY PROHIBITED                                                      
//   FOR QUESTIONS AND APPROPRIATE LICENSING PLEASE CONTACT WEO MEDIA                             
//   www.weomedia.com | info@weomedia.com                                                         
//                                                                                                
//   Some portions of code (modified and unmodified) have been included from public,              
//   or open source, sources. Included individual images, videos, documents,                      
//   scripts, embedded code, and referenced code files may have additional copyright              
//   holders and additional restrictions on licensing.                                            
//                                                                                                
//	  ***** LIMITATION OF LIABILITY *****                                                          
//   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,        
//   INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR     
//   PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE           
//   LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,          
//   TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE        
//   OR OTHER DEALINGS IN THE SOFTWARE.                                                           
//   ***********************************                                                          
//============================================================================================    
 */

(() => {// find first gallery and make it unique
  const meta = (function () {
    let rando = (function () { let x = Math.ceil(Math.random() * 1000000); return x; })();
    let changeId = document.querySelector('meta#bs-lightbox-data').id;
    let updatedId = changeId + '-' + rando;
    document.querySelector('meta#bs-lightbox-data').id = updatedId;
    return [updatedId, rando];
  })();
  const metaId = meta[0];
  const rando = meta[1];
  const data = document.querySelector('#' + metaId);
  const imgs = data.dataset.imagesSrc.split(',');
  const imgsCaption = data.dataset.imagesCaption.split(',');
  const bootstrapColumnSizes = {
    xs: data.dataset.columnSizes.split(',')[0],
    sm: data.dataset.columnSizes.split(',')[1],
    md: data.dataset.columnSizes.split(',')[2],
    lg: data.dataset.columnSizes.split(',')[3],
  }
  const galleryId = data.dataset.galleryId;
  const galleryIdAndRando = galleryId !== '' ? galleryId + '-' + rando : 'lightbox-gallery' + '-' + rando;
  const imgsObjs = [];
  const gallery = document.createElement('div');
  const style = document.createElement('style');

  for (let i = 0; i < imgs.length; i++) {
    const x = {};
    const img = imgs[i];
    const caption = imgsCaption[i];
    x.image = img.trim();
    try {
      x.captionText = caption.trim();
    } catch (e) {
      console.log(imgs.length + ' img' + addS(imgs.length) + ' and ' + imgsCaption.length + ' alt tag' + addS(imgsCaption.length));
      x.captionText = '';
      function addS(l) {
        return l !== 1 ? 's' : '';
      }
    }
    imgsObjs.push(x);
  }

  // create bs gallery row
  let gSty, gCls, mSty, mCls;
  gSty = sepStyleClass('gallery')[0];
  gCls = sepStyleClass('gallery')[1];
  gallery.id = galleryIdAndRando;
  gallery.className = gCls.join(' ');
  gallery.style = gSty;

  // create image thumb
  let thumbs = imgsObjs.map(function (imgData) {
    let img = imgData.image;
    let caption = imgData.captionText.match(/\w/) == null ? useAlt(imgData) : imgData.captionText;
    let thmb = document.createElement('div');
    bootstrapColumnSizes.xs ? thmb.classList.add(`TPcol-xs-${bootstrapColumnSizes.xs}`) : thmb.classList.add('TPcol-xs-6');
    bootstrapColumnSizes.sm ? thmb.classList.add(`TPcol-sm-${bootstrapColumnSizes.sm}`) : thmb.classList.add('TPcol-sm-4');
    bootstrapColumnSizes.md ? thmb.classList.add(`TPcol-md-${bootstrapColumnSizes.md}`) : thmb.classList.add('TPcol-md-3');
    bootstrapColumnSizes.lg ? thmb.classList.add(`TPcol-lg-${bootstrapColumnSizes.lg}`) : thmb.classList.add('TPcol-lg-3');
    thmb.innerHTML = '<a href="#" class="bs-lightbox-thumbnail TPthumbnail" data-toggle="modal" data-target="#bs-lightbox-modal-' + rando + '" > <img ' + img.match(/(?:<img)([^\>]+)/)[1] + ' data-caption="' + caption + '"> </a>';
    return thmb;
  });

  // create style
  style.innerHTML = '#' + gallery.id + ' .TPthumbnail img {height: 200px; object-fit: cover; } .modal-open #' + gallery.id + ' .modal { padding: 20px!important; } .bs-lightbox-control {position: absolute; top: 35%; bottom: 35%; width: 8%; left: 0; font-size: 20px; color: #fff; text-align: center; text-shadow: 0 1px 2px rgba(0,0,0,.6); background-color: rgba(0,0,0,0); filter: alpha(opacity=50); opacity: .5; } .bs-lightbox-control.right {right: 0; left: auto; background-image: -webkit-linear-gradient(left,rgba(0,0,0,.0001) 0,rgba(0,0,0,.5) 100%); background-image: -o-linear-gradient(left,rgba(0,0,0,.0001) 0,rgba(0,0,0,.5) 100%); background-image: -webkit-gradient(linear,left top,right top,from(rgba(0,0,0,.0001)),to(rgba(0,0,0,.5))); background-image: linear-gradient(to right,rgba(0,0,0,.0001) 0,rgba(0,0,0,.5) 100%); filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#00000000", endColorstr="#80000000", GradientType=1); background-repeat: repeat-x; } .bs-lightbox-control.left {background-image: -webkit-linear-gradient(left,rgba(0,0,0,.5) 0,rgba(0,0,0,.0001) 100%); background-image: -o-linear-gradient(left,rgba(0,0,0,.5) 0,rgba(0,0,0,.0001) 100%); background-image: -webkit-gradient(linear,left top,right top,from(rgba(0,0,0,.5)),to(rgba(0,0,0,.0001))); background-image: linear-gradient(to right,rgba(0,0,0,.5) 0,rgba(0,0,0,.0001) 100%); filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#80000000", endColorstr="#00000000", GradientType=1); background-repeat: repeat-x; } bs-lightbox-control:focus, .bs-lightbox-control:hover {color: #fff; text-decoration: none; outline: 0; filter: alpha(opacity=90); opacity: .9; } .bs-lightbox-control .glyphicon-chevron-left, .bs-lightbox-control .glyphicon-chevron-right, .bs-lightbox-control .icon-next, .bs-lightbox-control .icon-prev {position: absolute; top: 50%; z-index: 5; display: inline-block; margin: 0px; } .bs-lightbox-control .glyphicon-chevron-left, .bs-lightbox-control .icon-prev { left: 10%; } .bs-lightbox-control .glyphicon-chevron-right, .bs-lightbox-control .icon-next { right: 10%; } @media screen and (min-width: 768px) {.bs-lightbox-control .glyphicon-chevron-left, .bs-lightbox-control .glyphicon-chevron-right, .bs-lightbox-control .icon-next, .bs-lightbox-control .icon-prev {width: 30px; height: 30px; font-size: 30px; } .bs-lightbox-control .glyphicon-chevron-left, .bs-lightbox-control .icon-prev { } } @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) { #' + gallery.id + ' .TPthumbnail {height: 200px; overflow: hidden;} #' + gallery.id + ' .TPthumbnail img {height: auto; width: 100%;} }';

  // add modal
  mSty = sepStyleClass('modal')[0];
  mCls = sepStyleClass('modal')[1];
  gallery.innerHTML = '<div class="modal fade ' + mCls.join(' ') + '" tabindex="-1" role="dialog" id="bs-lightbox-modal-' + rando + '" aria-labelledby="bs-lightbox-modal-' + rando + '" style="' + mSty + '"> <div class="modal-dialog modal-lg" role="document"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&#215;</span> </button> </div> <img id="bs-lightbox-image" class="TPimg-responsive TPimg-gallery-large" src="" ></img> <div class="modal-footer TPtext-center"> <p id="bs-lightbox-caption"></p> </div> </div> </div> <a href="#" class="left bs-lightbox-control" role="button" data-slide="prev"> <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span> <span class="sr-only">Previous</span> </a> <a href="#" class="right bs-lightbox-control" role="button" data-slide="next"> <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span> <span class="sr-only">Next</span> </a> </div>';

  // add the gallery and style
  data.insertAdjacentElement('afterend', gallery);
  data.insertAdjacentElement('afterend', style);

  // add images
  thumbs.forEach(function (thumb) {
    document.querySelector('#' + gallery.id).appendChild(thumb);
  });

  // functions
  // split up style and classes - takes in the data attribute names like modal, or image and returns a styles string, and a classes array
  function sepStyleClass(dataType) {
    let d = 'style' + capitalize(dataType);
    let dt = data.dataset[d];
    let styles = dt.replace(/TP(\w|\-|\_|)+/g, '');
    let classes = dt.match(/TP(\w|\-|\_|)+/g);
    return [styles, classes];
  }

  // capitalize the first letter of string
  function capitalize(s) {
    return s.toString().charAt(0).toUpperCase() + s.toString().toLowerCase().slice(1);
  }

  // TODO input is img object, returns alt text
  function useAlt(pic) {
    let pStr = pic.image;
    let alt;
    try {
      alt = pStr.match(/alt\=\"([^\"]+)"/);
    } catch (e) {
      try {
        alt = pStr.match(/title\=\"([^\"]+)"/);
      } catch (e2) {
        console.log('no title for ' + pic);
        alt = ''
      }
      console.log('no alt for ' + pic);
    }
    return alt[1];
  }

  // supply image to modal when image is clicked
  $(`[id=bs-lightbox-modal-${rando}]`).on('show.bs.modal', function (e) {
    let clickedImg = { src: e.relatedTarget.querySelector('img').src, caption: e.relatedTarget.querySelector('img').dataset.caption };
    updateImg(clickedImg);
    let modal = document.querySelector(`${e.relatedTarget.dataset.target}`);
    modal.style.display = 'flex';
    modal.style.margin = 'auto';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';

  });

  // ui control navigation
  // left click
  document.querySelector(`#${galleryIdAndRando} .left.bs-lightbox-control`).addEventListener('click', function (e) {
    console.log('left clicked');
    newImg(e, 'left');
  });
  // right click
  document.querySelector(`#${galleryIdAndRando} .right.bs-lightbox-control`).addEventListener('click', function (e) {
    console.log('right clicked');
    newImg(e, 'right');
  });

  // keyboard navigation
  document.addEventListener('keydown', function (e) {
    if (e.code == 'ArrowRight') {
      console.log(e.code + ' pressed');
      document.querySelector(`#${galleryIdAndRando} .right.bs-lightbox-control`).click();
    }
    if (e.code == 'ArrowLeft') {
      console.log(e.code + ' pressed');
      document.querySelector(`#${galleryIdAndRando} .left.bs-lightbox-control`).click();
    }
  });

  function getImgs() {
    let arr = Array.from(document.querySelectorAll('.bs-lightbox-thumbnail img'));
    arr = arr.map(function (obj) {
      return { src: obj.src, caption: obj.dataset.caption };
    });
    return arr
  }

  function newImg(e, direction) {
    let imgs = getImgs();
    let curImgSrc = document.querySelector(`#${galleryIdAndRando} #bs-lightbox-image`).src;

    // if previous was clicked
    if (direction === 'left') {
      console.log('left clicked');
      prevImg();
    }
    // if next was clicked
    if (direction === 'right') {
      console.log('right clicked');
      nextImg();
    }

    function nextImg() {
      for (let i = 0; i < imgs.length; i++) {
        const img = imgs[i];
        if (img.src == curImgSrc) {
          // set modal img cur src to next image
          let newImg = imgs[i + 1];
          updateImg(newImg)
        }
      }
    }
    function prevImg() {
      for (let i = 0; i < imgs.length; i++) {
        const img = imgs[i];
        if (img.src == curImgSrc) {
          // set modal img cur src to prev image
          let newImg = imgs[i - 1];
          updateImg(newImg)
        }
      }
    }
  }

  function updateImg(newImg) {
    let updateModal = document.querySelectorAll(`#${galleryIdAndRando} #bs-lightbox-image`);
    for (let i = 0; i < updateModal.length; i++) {
      let uM = updateModal[i];
      uM.src = newImg.src;
    }
    let updateCaption = document.querySelectorAll(`#${galleryIdAndRando} #bs-lightbox-caption`);
    for (let y = 0; y < updateCaption.length; y++) {
      let uC = updateCaption[y];
      uC.innerText = newImg.caption;
    }
  }
})();