function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
}

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    // add a zero in front of numbers<10
    m = checkTime(m);
    s = checkTime(s);

    var currentTime = h + ":" + m + ":" + s;
    // console.log(`Time: ${currentTime}`)
    document.getElementsByClassName('time')[0].innerHTML = currentTime
    setTimeout(function() {
      startTime()
    }, 500);
  }

window.onload = function(e){ 
    
      startTime();
}