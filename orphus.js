// This script has been modified by Artyom Kazak because its original
// version was performing some vanity checks. I'm not ashamed.
// 
// Also I slightly improved design, for which I'm not ashamed either.
// 
// And renamed obscure variables, yeah. And made it possible to invoke
// reporting by calling orphus.reportSelected().
// 
// Original author: Dmitry Koterov.

orphus = (function () {
    var scriptVersion   = "5.01";
    var sendTo          = "yom@artyom.me";
    var orphusHomepage  = "https://orphus.ru/en/";
    // Put here a link to your site's section where you explain about Orphus.
    // If you don't, leave it empty.
    var descrlink       = "https://github.com/neongreen/orphus.js";
    var leftSelTag      = "<!!!>";
    var rightSelTag     = "<!!!>";
    // Controls how many characters to the left and right of selected text
    // would be included in the error report.
    var marginLength    = 60;
    // Specifies the maximum amount of characters sent, together with margins
    // and left/rightSelTag-s. I haven't checked whether Orphus server would
    // be willing to receive more than 256 characters.
    var maxReportLength = 256;
    var messageTable    = {
        badbrowser: "Your browser does not support selection handling or IFRAMEs. Probably you're using an obsolete browser.",
        thanks: "Thanks!",
        subject: "Mistake report",
        docmsg: "Document:",
        intextmsg: "Mistake in text:",
        name: "Orphus system",
        to: "Orphus user",
        send: "Send",
        cancel: "Cancel",
        entercmnt: "Comment (optional):"
    };
    // You can use this variable to leave a message to users specifying what
    // you don't consider as mistakes (so that they wouldn't be annoying
    // you). If you don't want this, assign an empty string to it instead of
    // this list.
    var nonMistakes = "";
    var _9 = "css";
    var _a = 0;
    var w = window;
    var d = w.document;
    var de = d.documentElement;
    var b = d.body;
    var _f = null;
    var _10 = {};
    var _11 = false;
    var _12 = "";
    var _13 = function () {
        d.onkeypress = _17;
    };
    var _18 = function () {
        var n = 0;
        var _1a = function () {
            if (++n > 20) {
                return;
            }
            w.status = (n % 5) ? messageTable.thanks : " ";
            setTimeout(_1a, 100);
        };
        _1a();
    };
    var _1b = function (e) {
        e.style.position = "absolute";
        e.style.top = "-10000px";
        if (b.lastChild) {
            b.insertBefore(e, b.lastChild);
        } else {
            b.appendChild(e);
        }
    };
    var _1d = function (_1e) {
        var div = d.createElement("DIV");
        div.innerHTML = "<iframe name=\"" + _1e + "\"></iframe>";
        _1b(div);
        return d.childNodes[0];
    };
    var _20 = function (url, _22, _23) {
        var _24 = "orphus_ifr";
        if (!_f) {
            _f = _1d(_24);
        }
        var f = d.createElement("FORM");
        f.style.position = "absolute";
        f.style.top = "-10000px";
        f.action = orphusHomepage;
        f.method = "post";
        f.target = _24;
        var _26 = {
            version: scriptVersion,
            email: sendTo,
            to: messageTable.to,
            subject: messageTable.subject,
            ref: url,
            c_pre: _22.pre,
            c_sel: _22.text,
            c_suf: _22.suf,
            c_pos: _22.pos,
            c_tag1: leftSelTag,
            c_tag2: rightSelTag,
            charset: d.charset || d.characterSet || "",
            comment: _23
        };
        for (var k in _26) {
            var h = d.createElement("INPUT");
            h.type = "hidden";
            h.name = k;
            h.value = _26[k];
            f.appendChild(h);
        }
        _1b(f);
        f.submit();
        f.parentNode.removeChild(f);
    };
    var _29 = function () {
        var _2a = 0,
            _2b = 0;
        if (typeof (w.innerWidth) == "number") {
            _2a = w.innerWidth;
            _2b = w.innerHeight;
        } else {
            if (de && (de.clientWidth || de.clientHeight)) {
                _2a = de.clientWidth;
                _2b = de.clientHeight;
            } else {
                if (b && (b.clientWidth || b.clientHeight)) {
                    _2a = b.clientWidth;
                    _2b = b.clientHeight;
                }
            }
        }
        var _2c = 0,
            _2d = 0;
        if (typeof (w.pageYOffset) == "number") {
            _2d = w.pageYOffset;
            _2c = w.pageXOffset;
        } else {
            if (b && (b.scrollLeft || b.scrollTop)) {
                _2d = b.scrollTop;
                _2c = b.scrollLeft;
            } else {
                if (de && (de.scrollLeft || de.scrollTop)) {
                    _2d = de.scrollTop;
                    _2c = de.scrollLeft;
                }
            }
        }
        return {
            w: _2a,
            h: _2b,
            x: _2c,
            y: _2d
        };
    };
    _10.confirm = function (_2e, _2f, _30) {
        var ts = new Date().getTime();
        var _32 = confirm(messageTable.docmsg + "\n   " +
                          d.location.href + "\n" +
                          messageTable.intextmsg + "\n   \"" +
                          _2e + "\"\n\n");
        var dt = new Date().getTime() - ts;
        if (_32) {
            _2f("");
        } else {
            if (!_30 && dt < 50) {
                var sv = d.onkeyup;
                d.onkeyup = function (e) {
                    if (!e) {
                        e = window.event;
                    }
                    if (e.keyCode == 17) {
                        d.onkeyup = sv;
                        _10.confirm(_2e, _2f, true);
                    }
                };
            }
        }
    };
    _10.css = function (_36, _37) {
        if (_11) {
            return;
        }
        _11 = true;
        var div = d.createElement("DIV");
        var w = 550;
        if (w > b.clientWidth - 10) {
            w = b.clientWidth - 10;
        }
        div.style.zIndex = "10001";

        var wrapDiv = function (style, inner) {
          if (style == "") 
            { return "<div>" + inner + "</div>"; }
          else
            { return "<div style=\"" + style + "\">" + inner + "</div>"; }
        }

        var poweredBy = 
          "Powered by <a href=\"" + orphusHomepage + 
          "\" target=\"_blank\">Orphus</a>.";

        if (messageTable.descrlink != "")
          { poweredBy = poweredBy +
                        " (Learn more <a href=\"" + descrlink + 
                        "\" target=\"_blank\">here</a>.)"; }

        poweredBy = wrapDiv("text-align:right", poweredBy);

        var nonMistakesBox = "";
        if (nonMistakes != "") {
          nonMistakesBox =
            wrapDiv("font-size:0.5em; line-height:100%;" +
                    "width:50%; margin:1em auto; padding:0.5em 0 0 0.5em;" +
                    "border:1px solid red",
              "Non-mistakes: " + nonMistakes); }

        var leftTagRepl = "<span style=\"background-color:#ff7373\">";
        var rightTagRepl = "</span>";

        var displayMistake =
          wrapDiv("font-weight:bold;padding-bottom:0.2em", 
            messageTable.intextmsg) +   
          wrapDiv("padding:0 0 1em 1em", 
            _36.replace(leftSelTag,  leftTagRepl)
               .replace(rightSelTag, rightTagRepl));

        var buttons = 
          wrapDiv("text-align:right", 
            "<input type=\"submit\" value=\"" + messageTable.send + 
              "\" style=\"width:7em;font-weight:bold\">&nbsp;" + 
            "<input type=\"button\" value=\"" + messageTable.cancel + 
              "\" style=\"width:5em\">");

        var commentForm = 
          "<form style=\"padding:0;margin:0;border:0\">" + 
          wrapDiv("", messageTable.entercmnt) + 
          "<input type=\"text\" maxlength=\"250\"" + 
            "style=\"width:100%;margin:0.2em 0\" />" + 
          buttons + 
          "</form>"

        div.innerHTML = 
          wrapDiv("background-color:#eee;" + "width:" + w + "px;" + 
                  "z-index:10001;" + "border: 1px solid #555;" + 
                  "padding:1em;" + "font-size: 90%;" + "color:black",
            poweredBy + "<hr>" +
            nonMistakesBox +
            displayMistake +
            wrapDiv("padding-bottom:1em", "") +
            commentForm);

        _1b(div);
        var _3a = div.getElementsByTagName("input");
        var _3b = div.getElementsByTagName("form");
        var t = _3a[0];
        var _3d = null;
        var _3e = [];
        var _3f = function () {
            d.onkeydown = _3d;
            _3d = null;
            div.parentNode.removeChild(div);
            for (var i = 0; i < _3e.length; i++) {
                _3e[i][0].style.visibility = _3e[i][1];
            }
            _11 = false;
            _12 = t.value;
        };
        var pos = function (p) {
            var s = {
                x: 0,
                y: 0
            };
            while (p.offsetParent) {
                s.x += p.offsetLeft;
                s.y += p.offsetTop;
                p = p.offsetParent;
            }
            return s;
        };
        setTimeout(function () {
            var w = div.clientWidth;
            var h = div.clientHeight;
            var dim = _29();
            var x = (dim.w - w) / 2 + dim.x;
            if (x < 10) {
                x = 10;
            }
            var y = (dim.h - h) / 2 + dim.y - 10;
            if (y < 10) {
                y = 10;
            }
            div.style.left = x + "px";
            div.style.top = y + "px";
            if (navigator.userAgent.match(/MSIE (\d+)/) && RegExp.$1 < 7) {
                var _49 = d.getElementsByTagName("SELECT");
                for (var i = 0; i < _49.length; i++) {
                    var s = _49[i];
                    var p = pos(s);
                    if (p.x > x + w 
                     || p.y > y + h
                     || p.x + s.offsetWidth < x 
                     || p.y + s.offsetHeight < y) {
                        continue; }
                    _3e[_3e.length] = [s, s.style.visibility];
                    s.style.visibility = "hidden";
                }
            }
            t.value = _12;
            t.focus();
            t.select();
            _3d = d.onkeydown;
            d.onkeydown = function (e) {
                if (!e) {
                    e = window.event;
                }
                if (e.keyCode == 27) {
                    _3f();
                }
            };
            _3b[0].onsubmit = function () {
                _37(t.value);
                _3f();
                _12 = "";
                return false;
            };
            _3a[2].onclick = function () {
                _3f();
            };
        }, 10);
    };
    var removeNewlines = function (str) {
        return ("" + str).replace(/[\r\n]+/g, " ")
                         .replace(/^\s+|\s+$/g, "");
    };
    var getSelectedText = function () {
        try {
            var _51 = null;
            var _52 = null;
            if (w.getSelection) {
                _52 = w.getSelection();
            } else {
                if (d.getSelection) {
                    _52 = d.getSelection();
                } else {
                    _52 = d.selection;
                }
            }
            var _53 = null;
            if (_52 != null) {
                var pre = "",
                    _51 = null,
                    suf = "",
                    pos = -1;
                if (_52.getRangeAt) {
                    var r = _52.getRangeAt(0);
                    _51 = r.toString();
                    var _58 = d.createRange();
                    _58.setStartBefore(r.startContainer.ownerDocument.body);
                    _58.setEnd(r.startContainer, r.startOffset);
                    pre = _58.toString();
                    var _59 = r.cloneRange();
                    _59.setStart(r.endContainer, r.endOffset);
                    _59.setEndAfter(r.endContainer.ownerDocument.body);
                    suf = _59.toString();
                } else {
                    if (_52.createRange) {
                        var r = _52.createRange();
                        _51 = r.text;
                        var _58 = _52.createRange();
                        _58.moveStart("character", -marginLength);
                        _58.moveEnd("character", -_51.length);
                        pre = _58.text;
                        var _59 = _52.createRange();
                        _59.moveEnd("character", marginLength);
                        _59.moveStart("character", _51.length);
                        suf = _59.text;
                    } else {
                        _51 = "" + _52;
                    }
                }
                var p;
                var s = (p = _51.match(/^(\s*)/)) && p[0].length;
                var e = (p = _51.match(/(\s*)$/)) && p[0].length;
                pre = pre + _51.substring(0, s);
                suf = _51.substring(_51.length - e, _51.length) + suf;
                _51 = _51.substring(s, _51.length - e);
                if (_51 == "") {
                    return null;
                }
                return {
                    pre: pre,
                    text: _51,
                    suf: suf,
                    pos: pos
                };
            } else {
                alert(messageTable.badbrowser);
                return;
            }
        } catch (e) {
            return null;
        }
    };
    var reportSelected = function () {
        if (!sendTo 
         || navigator.appName.indexOf("Netscape") != -1 
         && eval(navigator.appVersion.substring(0, 1)) < 5) {
              alert(messageTable.badbrowser);
              return;
        }
        var selection = getSelectedText();
        if (!selection) {
            return;
        }
        with(selection) {
            pre = pre.substring(pre.length - marginLength, pre.length)
                     .replace(/^\S{1,10}\s+/, "");
            suf = suf.substring(0, marginLength)
                     .replace(/\s+\S{1,10}$/, "");
        }
        var framingLength = 
             selection.pre.length + selection.suf.length +
             leftSelTag.length + rightSelTag.length;
        // If the report turns out to be is too long, we replace some text in
        // the middle of selection with “[...]”.
        if (framingLength + selection.text.length > maxReportLength) {
          var allowed = (maxReportLength-framingLength-5)/2;
          selection.text = 
            selection.text.slice(0, allowed) + "[...]" +
            selection.text.slice(-allowed);
        }
        var mistakeBlock =
              removeNewlines(selection.pre + leftSelTag + 
                             selection.text + rightSelTag + selection.suf);
        _10[_9](mistakeBlock, function (_65) {
            _20(d.location.href, selection, _65);
            _18();
        });
    };
    var _17 = function (e) {
        var comboPressed = 0;
        var we = w.event;
        if (we) {
          comboPressed =  we.keyCode == 10
                      || (we.keyCode == 13 && we.ctrlKey);
        } else {
            if (e) {
              comboPressed = (e.which == 10 && e.modifiers == 2)
                          || (e.keyCode == 0 && e.charCode == 106 && e.ctrlKey)
                          || (e.keyCode == 13 && e.ctrlKey);
            }
        } if (comboPressed) {
            reportSelected();
            return false;
        }
    };
    _13();
    return {
      reportSelected: reportSelected };
})();
