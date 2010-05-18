/**
 * Lyrics
 *
 * Yeah thats it...
 */

var Lyrics = function (data) {
  if ($.isFunction(data)) data.call($);
};

$.extend(Lyrics, {
  scrollbar: null,
  scroll_area: null,
  setup_scroll_area: function () {
    var scrollbar = new AppleVerticalScrollbar(document.getElementById('lyrics-scrollbar'));
    var scroll_area = new AppleScrollArea(document.getElementById('lyrics-container'));

    scroll_area.addScrollbar(scrollbar);
    scroll_area.scrollsHorizontally = false;
    scroll_area.singlepressScrollPixels = 10;
    scroll_area.refresh();

    window.onfocus = function () {
      scroll_area.refresh();
    };

    window.onblur = function () {
      scroll_area.refresh();
    };

    this.scrollbar = scrollbar;
    this.scroll_area = scroll_area;
  },
  ratings: {
    0: 'zero',
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five'
  },
  get_info: function () {
    var cmd = widget.system("/usr/bin/osascript get-lyrics.scpt", null),
        res = $.trim(cmd.outputString);

    if (res != "") {
      if (res == 'IDLE') {
        return {error: 'iTunes is idle.'};
      } else if (res == 'NOTRUNNING') {
        return {error: 'iTunes is not running.'};
      }
      var data = res.split('###SPLIT###');
      return {
        artist: data[0],
        album:  data[1],
        song:   data[2],
        rating: parseInt(data[3]),
        lyrics: data[4].replace(/\r/g, '\n<br />')
      };
    } else {
      return {error: 'Error'};
    }
  },
  show: function () {
    var lyrics = Lyrics.get_info();

    if (lyrics.error) {
      $('#rating').html('').attr('class', 'zero');
      $('#header, #rating').hide();
      $('#album, #artist, #song').html('');
      $('#lyrics-content').html(lyrics.error);
    } else {
      $('#header, #rating').show();
      $('#album').html(lyrics.album);
      $('#artist').html(lyrics.artist);
      $('#song').html(lyrics.song);
      $('#lyrics-content').html(lyrics.lyrics);
      $('#rating').attr('class', Lyrics.ratings[lyrics.ratings]);
      Lyrics.scroll_area.refresh();
    }
  }
});

// --------------------------------------------------------------------

function load() {
  Lyrics.setup_scroll_area();
  Lyrics.show();
}

function itunes_notification_recieved() {
  Lyrics.show();
}
