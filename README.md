# Project for fixing iOS captions on youtube
Working but could be improved apon.

Obtains the url used by YouTube to fetch captions.  
Removes unneeded data like tracking data from it.  
Fetches captions, if fails, tries another format.  
(tries to) Requests captions in browser's default language.  
Converts a certain caption formats to VTT to work.  

Supports converting JSON3 into VTT captions, including formats and animations.  
Music Video with animated captions: https://www.youtube.com/watch?v=6LtrI3MOfQg  


# Known Issues:
* Breaks when YT swaps video players(adds the more videos button)
* Sends a second/third fetch request for captions
* When enabling captions, there are two (YT & the injected) when not in fullscreen


Youtube has made itself worse (with ad-block).  
This has as nothing to do with this script.  
  
  
  
I kinda need help with this...
