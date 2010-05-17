// Based on http://github.com/supapuerco/harmonic/blob/master/Harmonic.wdgt/js/resize.js



var lastPos;

// The mouseDown function is called the user clicks on the growbox.  It prepares the
// widget to be resized and registers handlers for the resizing operations
function mouseDown(event)
{
  //stop widget from loading
  shouldRefresh = 0;

  var x = event.x + window.screenX;    // the placement of the click
  var y = event.y + window.screenY;
  
  document.addEventListener("mousemove", mouseMove, true);    // begin tracking the move
  document.addEventListener("mouseup", mouseUp, true);    // and notify when the drag ends

  lastPos = {x:x, y:y};

  event.stopPropagation();
  event.preventDefault();
}


// mouseMove performs the actual resizing of the widget.  It is called after mouseDown
// activates it and every time the mouse moves.
function mouseMove(event)
{ 
  var screenX = event.x + window.screenX;    // retrieves the current mouse position
  var screenY = event.y + window.screenY;
    
  var deltaX = 0;    // will hold the change since the last mouseMove event
  var deltaY = 0;

  if ( (window.outerWidth + (screenX - lastPos.x)) >= 100 ) {
    deltaX = screenX - lastPos.x;
    lastPos.x = screenX;
  }

  if ( (window.outerHeight + (screenY - lastPos.y)) >= 100 ) {
    deltaY = screenY - lastPos.y;
    lastPos.y = screenY;
  }
  
  window.resizeBy(deltaX, deltaY);  // resizes the widget to follow the mouse movement

  event.stopPropagation();
  event.preventDefault();

  Lyrics.scroll_area.refresh();

}


// mouseUp is called when the user stops resizing the widget.  It removes the mouseMove and
// mouseUp event handlers, so that the widget doesn't continute resizing (because the mouse
// button is now up
function mouseUp(event)
{
  document.removeEventListener("mousemove", mouseMove, true);
  document.removeEventListener("mouseup", mouseUp, true);  

  event.stopPropagation();
  event.preventDefault();
  
    // widget.setPreferenceForKey(window.outerWidth, prefkey("widgetWidth"));
  // widget.setPreferenceForKey(window.outerHeight, prefkey("widgetHeight"));

  //restart widget refreshing
  shouldRefresh = 1;
}
