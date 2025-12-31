# Project for fixing iOS captions on youtube
Somewhat working

Obtains the url used by YouTube to fetch captions.
Removes unneeded data like tracking data from it.
Fetches captions, if fails, tries another format.
(tries to) Requests captions in browser's default language.
Converts a certain caption formats to VTT to work.


# Known Issues:
* Breaks when YT swaps video players
* Sends a second/third fetch request for captions
* When enabling captions, there are two (builtin & added)
