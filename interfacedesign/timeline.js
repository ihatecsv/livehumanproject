//From https://www.arduino.cc/reference/en/language/functions/math/map/
const map = function(x, in_min, in_max, out_min, out_max) {
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

const timelineLineElem = document.getElementById("timeline-line");
const timelineRangesElem = document.getElementById("timeline-ranges");

const timeRange = [0, 120]; //2m

let activeRanges = [];

const drawFrame = function(){
  const timelineYLocation = window.innerHeight/2;
  const widthOfWindow = window.innerWidth;
  timelineLineElem.style.top = timelineYLocation + "px";
  timelineLineElem.style.width = widthOfWindow + "px";

  for(let i = 0; i < activeRanges.length; i++){
    const rangeYLocation = timelineYLocation + 20;
    const rangeXStartLocation = map(activeRanges[i].range[0], timeRange[0], timeRange[1], 0, widthOfWindow);
    const rangeXEndLocation = map(activeRanges[i].range[1], timeRange[0], timeRange[1], 0, widthOfWindow);
    const rangeXWidth = rangeXEndLocation - rangeXStartLocation;
    activeRanges[i].elem.style.top = rangeYLocation + "px";
    activeRanges[i].elem.style.left = rangeXStartLocation + "px";
    activeRanges[i].elem.style.width = rangeXWidth + "px";
  }

  window.requestAnimationFrame(drawFrame);
}

const addRange = function(range, color){
  const rangeElem = document.createElement("div");
  rangeElem.style.position = "absolute";
  rangeElem.style["background-color"] = color;
  rangeElem.style["padding-bottom"] = "8px";
  timelineRangesElem.appendChild(rangeElem);

  activeRanges.push({
    elem: rangeElem,
    range: range
  });
}

addRange([10, 30], "#F00");
addRange([45, 80], "#0F0");

drawFrame();
