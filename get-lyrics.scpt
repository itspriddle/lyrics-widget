set del to "###SPLIT###"

on iTunesRunning()
  tell application "System Events"
    return ((name of processes) contains "iTunes")
  end tell
end iTunesRunning

if iTunesRunning() then
  tell application "iTunes"
    if player state is playing then
      set the_album to (album of current track)
      set the_artist to (artist of current track)
      set the_lyrics to (lyrics of current track)
      set the_track to (name of current track)
      set the_rating to (rating of current track)
      set output to the_artist & del & the_album & del & the_track & del & the_rating & del & the_lyrics
    else
      "IDLE"
    end if
  end tell
else
  "NOTRUNNING"
end if
