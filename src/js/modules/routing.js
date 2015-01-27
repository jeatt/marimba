/// Routing

var context = new AudioContext(),
  gainNode = context.createGain(),
  filterNode = context.createBiquadFilter(),
  osc = 0;

/// Oscillators are one-use only - has to be created each time, can't be stopped and started
/// Create oscillator and connect it to the destination
var oscStart = function() {

  /// If an oscillator is already running, kill it
  if (osc !== 0) {  
    osc.disconnect();
  }

  /// Get user declared variables
  var waveType = $('.wave-type').val();
  var filterType = $('.filter-type').val();
  var oscFrequency = 100;

  osc = context.createOscillator();
  osc.type = waveType;
  osc.frequency.value = oscFrequency;
  osc.start(0);

  /// If a filter has been selected, connect through it, otherwise connect the gain node to the destination
  if (filterType !== "none") {
    filterNode.type = filterType;
    filterNode.frequency.value = 3000;
    osc.connect(gainNode);
    gainNode.connect(filterNode);
    filterNode.connect(context.destination);
    console.log(filterType + " filter applied");
  } else {
    osc.connect(gainNode);
    gainNode.connect(context.destination);
    console.log('No filter applied');
  }

}

/// Stop oscillator and throw it away
var oscStop = function() {
  osc.stop();
  osc.disconnect();
  osc = 0;
};

/// Use jQuery to bind the functions to the controls
$(document).ready(function() {

  $('.play').click(function() {
    oscStart();
  });

  $('.stop').click(function() {
    oscStop();
  });

  $('.control--gain').change(function() {
    gainNode.gain.value = this.value;
  });

});