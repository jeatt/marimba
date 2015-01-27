/// A simple marimba - notes triggered on mouseenter
// To do: add options for triggering on click, and playing using A, S, D, F, G, H, J, K (naturals) and W, E, T, Y, U (accidentals) 

var context = new AudioContext();

function loadAudio( object, url) {
 
  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.responseType = 'arraybuffer';
  
  request.onload = function() {
    context.decodeAudioData(request.response, function(buffer) {
      object.buffer = buffer;
    });
  }
  request.send();
}

function addAudioProperties(object) {
  object.name = object.id;
  object.source = $(object).data('sound');
  loadAudio(object, object.source);
  object.play = function () {
    var s = context.createBufferSource();
    s.buffer = object.buffer;
    s.connect(context.destination);
    s.start(0);
    object.s = s;
  }
}

$(function() {
  $('.marimba__note').each(function() {
    addAudioProperties(this);
  });
  
  $('.marimba__note').mouseenter(function() {
    this.play();
    $(this).addClass('marimba__note--sounding');
  });

  $('.marimba__note').mouseleave(function() {
    $(this).removeClass('marimba__note--sounding');
  });
});