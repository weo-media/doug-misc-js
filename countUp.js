function countUp() {
  /*find all the counters by class name*/
  var countersClass = document.querySelectorAll('[class^=TPcounter]');

  /*structure for the counter object*/
  function Counter(end, start, speed, counterId) {
    this.endNum = end;
    this.startNum = start;
    this.countSpeed = speed;
    this.id = counterId;
  }

  /*creating the counters*/
  var counters = [];
  countersClass.forEach((countClass) => {
    /*get the id of the counter*/
    var countId = countClass.className.replace(/TPcounter-/,'');
    /*get the end number*/
    var endCountNum = countClass.querySelector('[class^=TPdigit]').className.replace(/TPdigit-/,'');
    /*create the counter*/
    var c = new Counter(endCountNum, 0, 500, countId);
    /*push it into the array*/
    counters.push(c);
  });
  
  /*start each counter counting*/
  counters.forEach((counter) => {
    var theCounterContainer = document.querySelector('.TPcounter-' + counter.id).querySelector('.TPdigit-' + counter.endNum);
    var theCount = 0;
    theCounterContainer.innerText = theCount;
    var timer = setInterval((tmr) => {
      if (theCount < counter.endNum) {
        theCount++;
        theCounterContainer.innerText = theCount;
      } else {
        clearInterval(timer);
      }
    },0);
  });
}
countUp();







var thisScript = Array.from(document.getElementsByTagName('script')).splice(-1);
thisScript[0].insertAdjacentHTML('beforebegin',`<span id="[[[PARAM2]]]">0</span>`);
countUpTil([[[PARAM1]]],'[[[PARAM2]]]',[[[PARAM3]]]);
function countUpTil(tilNum,counterId,speed) {
  tilNum = Number(tilNum);
  speed = Number(speed);
  if (isNaN(speed)) {
    speed = 0;
  }
  if (isNaN(tilNum)) {
    tilNum = 0;
  }
  var theCounterContainer = document.getElementById(counterId);
  var theCount = 0;
  var timer = setInterval( () => {
    if (theCount < tilNum) {
      theCount++;
      var theCountAsString = theCount.toString();
      if (theCountAsString.length > 3) {
        theCountAsString = theCountAsString.replace(/(\d)(?=(\d{3})+$)/g, '$1,');
      }
      theCounterContainer.innerText = theCountAsString;
    } else {
      clearInterval(timer);
    }
  }, speed);
}

