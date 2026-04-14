# Project for fixing iOS captions on youtube
Working but could be improved apon.

Obtains the url used by YouTube to fetch captions.  
Removes unneeded data like tracking data from it.  
Fetches captions, if fails, tries another format.  
(tries to) Requests captions in browser's default language.  
Converts a certain caption formats to VTT to work.  

Supports converting JSON3 into VTT captions, including formats and animations.  
Music Video with animated captions: https://www.youtube.com/watch?v=6LtrI3MOfQg  
The music video above is finally fully supported.  
  
Most but not all features supported here: https://www.youtube.com/watch?v=L-BgxLtMxh0  
  
# Known Issues:
* Breaks when YT swaps video players(likely caused by having adblock)
* Sends a second/third fetch request for captions
* When enabling captions, there are two (YT & the injected) when not in fullscreen

