import Util from "./Util.js";
import Selection from "./Selection.js";
const Snap = require(`imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js`);
const iconsPath = require("./../assets/icons.svg");

Snap.plugin(function(Snap, Element) {
  return (Element.prototype.hover = function(f_in, f_out, s_in, s_out) {
    return this.mouseover(f_in, s_in).mouseout(f_out || f_in, s_out || s_in);
  });
});

export default class RadialNav {
  constructor(paper, store) {
    this.paper = paper;
    this.area = paper.svg(0, 0, this.size, this.size).addClass("radialnav");
    this.container = this.area.g();
    this.container.transform("s0");

    this.store = store;
    const p = this.store.getters.getRadialNavParams;
    this.size = p.size;
    this.c = p.c;
    this.r = p.r;
    this.r2 = p.r2;
    this.animDuration = p.animDuration;
  }

  /******************
   * Private
   *******************/

  _bindEvents() {
    this.paper.node.addEventListener("mousedown", this.show.bind(this));
    this.paper.node.addEventListener("mouseup", this.hide.bind(this));
    this.paper.node.addEventListener("contextmenu", function(e) {
      e.preventDefault();
    });
  }

  _animateButtonHover(button, start, end, duration, easing, cb) {
    return Util.animate(
      Snap,
      button,
      1,
      start,
      end,
      duration,
      easing,
      (function(_this) {
        return function(val) {
          button[0].attr({
            d: Util.describeSector(
              _this.c,
              _this.c,
              _this.r - val * 10,
              _this.r2,
              0,
              _this.angle
            )
          });
          return button[2].transform(
            "s" +
              (1.1 - val * 0.1) +
              "," +
              (1.1 - val * 0.1) +
              "," +
              _this.c +
              "," +
              _this.c
          );
        };
      })(this),
      cb
    );
  }

  _animateContainer(start, end, duration, easing) {
    return Util.animate(
      Snap,
      this,
      0,
      start,
      end,
      duration,
      easing,
      (function(_this) {
        return function(val) {
          return _this.container.transform(
            "r" +
              (90 - 90 * val) +
              "," +
              _this.c +
              "," +
              _this.c +
              "s" +
              val +
              "," +
              val +
              "," +
              _this.c +
              "," +
              _this.c
          );
        };
      })(this)
    );
  }

  _sector() {
    return this.area
      .path(Util.describeSector(this.c, this.c, this.r, this.r2, 0, this.angle))
      .addClass("radialnav-sector");
  }

  _icon(btn, icons) {
    let icon = icons.select(`#${btn.icon}`).addClass("radialnav-icon");
    let bbox = icon.getBBox();
    icon.transform(
      `T${this.c - bbox.x - bbox.width / 2},${this.c -
        this.r +
        this.r2 -
        bbox.y -
        bbox.height / 2 -
        5}R${this.angle / 2},${this.c},${this.c}S0.7`
    );
    return icon;
  }

  _hint(btn) {
    let hint = this.area
      .text(0, 0, btn.text)
      .addClass("radialnav-hint radialnav-hint_hide")
      .attr({
        textpath: Util.describeArc(this.c, this.c, this.r, 0, this.angle)
      });
    hint.select("*").attr({ startOffset: "50%" });
    return hint;
  }

  _button(btn, sector, icon, hint) {
    const id = btn.id;
    const store = this.store;

    return this.area
      .g(sector, icon, hint)
      .data("cb", function(id) {
        store.commit("setCurrentTool", id);
      })
      .mouseup(function() {
        if (this.data("cb") !== null) {
          this.data("cb")(id);
        }
      })
      .hover(function() {
        let arr = [this[0], this[1], this[2]];
        for (let i = 0, len = arr.length; i < len; i++) {
          arr[i].toggleClass("active");
        }
      })
      .hover(this._buttonOver(this), this._buttonOut(this));
  }

  _buttonOver(nav) {
    return function() {
      nav._animateButtonHover(this, 0, 1, 100, mina.easeinout); // eslint-disable-line no-undef
      return this[2].removeClass("radialnav-hint_hide");
    };
  }

  _buttonOut(nav) {
    return function() {
      return nav._animateButtonHover(
        this,
        1,
        0,
        100,
        mina.easeinout, // eslint-disable-line no-undef
        function() {
          return this.addClass("radialnav-hint_hide");
        }.bind(this[2])
      );
    };
  }

  /******************
   * Public
   *******************/

  init() {
    Snap.load(iconsPath, icons => {
      const buttons = this.store.getters.getRadialNavIcons;
      this.angle = 360 / buttons.length;
      this.updateButtons(buttons, icons);
      this._bindEvents();
    });
  }

  updateButtons(buttons, icons) {
    this.container.clear();
    for (let i = 0, len = buttons.length; i < len; i++) {
      let button = this._button(
        buttons[i],
        this._sector(),
        this._icon(buttons[i], icons),
        this._hint(buttons[i])
      );
      button.transform(`r${this.angle * i},${this.c},${this.c}`);
      this.container.add(button);
    }
  }

  show(e) {
    if (e.which === 3) {
      this.area.attr({
        x: e.offsetX - this.c,
        y: e.offsetY - this.c
      });
      this._animateContainer(0, 1, this.animDuration, mina.easeinout); // eslint-disable-line no-undef
    }
  }

  hide(e) {
    if (e.which === 3) {
      this._animateContainer(1, 0, this.animDuration, mina.easeinout); // eslint-disable-line no-undef
    }
  }
}
