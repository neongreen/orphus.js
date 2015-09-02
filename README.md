# orphus.js

This is a modified version of script provided by [Orphus][] to report typos
on your site. Giving your readers an ability to report mistakes without
having to send emails, leave comments, creating pull requests on GitHub,
etc. is *awesome*. Everybody should have this on your site, including you.

## A warning

**Don't forget to replace my email and `nonMistakes` in the script with yours!**

## Usage

  * Register on [Orphus][]. Don't download any GIFs or the script they give
    you, just register there.

  * Download the script from this repo and put it on your site by adding

    ~~~ html
    <script type="text/javascript" src="/orphus.js"></script>
    ~~~

    before `</body></html>` on your site. Don't forget to replace your email
    in the beginning of the script (`var sendTo = ...`) with the one you've
    used to register. Also, change `nonMistakes` or assign `""` to it if you
    don't want to warn your users about any common “mistakes” you don't
    consider as such.

  * Tell your readers that they can select text and press
    <kbd>Ctrl</kbd>+<kbd>Enter</kbd> to report mistakes! Don't forget to
    remind them occasionally in the beginnings of long articles and so on,
    because people tend to ignore banners they see on *every* page of a site
    for whatever reason.

## Improvements

This script is a modification of the “official” one. It has:

  * nicer design (I think)
  * “non-mistakes” functionality
  * cutting down text blocks instead of showing a “selected text is too big”
    message
  * `reportSelected` function which lets you call the script manually (this
    can be used to make a “report a mistake” button)

[Orphus]: http://orphus.ru/en/
