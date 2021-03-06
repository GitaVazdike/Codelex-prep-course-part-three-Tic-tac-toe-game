// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../src/Game.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Game = void 0;

var Game =
/** @class */
function () {
  function Game() {
    this.cells = ["-", "-", "-", "-", "-", "-", "-", "-", "-"]; // iznes atsevi????i cells, kas b??s sp??les laukums, kuru zem??k metod??s maina p??c vajadz??bas, savuk??rt getcells() katru reizi atgrie?? jauno laukuma st??vokli.
  }

  Game.prototype.getCells = function () {
    //tips = XO mas??vs( mas??vs, kur?? var b??t tikai augst??k defin??taj?? tip?? eso????s v??rt??bas - X, O vai -
    return this.cells;
  };

  Game.prototype.getTurn = function () {
    var countEmptyCells = this.cells.filter(function (cell) {
      return cell === "-";
    }).length;
    return countEmptyCells % 2 === 0 ? "O" : "X";
  }; //izfiltr?? tuk??os laukumus un saskaita, cik to ir. Ja skaits dal??s ar 2 bez atlikuma, n??kamais g??jiens ir "O", ja ne "X" (p??c atliku??o ????nu skaita var noteikt, kuram g??jiens)


  Game.prototype.getWinner = function () {
    var winningPositions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

    for (var _i = 0, winningPositions_1 = winningPositions; _i < winningPositions_1.length; _i++) {
      var position = winningPositions_1[_i]; // For of iter?? cauri katram nested mas??vam - sakot - katru poz??ciju (katru nested mas??vu) no winningPositions p??rbaud??t ar if.

      if (this.cells[position[0]] === this.cells[position[1]] && //p??rbauda vai mas??v?? cells ar vien??diem simboliem (X vai O) aizpild??ta k??da no 3 indeksu kombin??cij??m, kas atrodas winningPositions nested mas??vos(position - nested mas??vs, [0],[1],[2] - nested mas??va indeksi)
      this.cells[position[1]] === this.cells[position[2]] && this.cells[position[0]] !== "-" // Ja visi 3 laukumi vien??di un tie NAV tuk??i laukumi ("-") =>ja ??o nepieliek, piepildot p??d??jo un pirmsp??d??jo rindu un kolonnu, uzvara par??d??s, tikai tad, ja iespie?? v??l k??d?? laukum?? - tipa, lai ner??da, ka uzvar??t??js ir "-" tad, ja ir 3 tuk??i laukumi uzvaras poz??cij?? (1 rind?? un kolonn??), kas izpild??ju??ies ??tr??k par X vai O uzvaras g??jienu - jau s??kotn??ji ir tuk??i
      ) {
        return this.cells[position[0]]; //...atgriezt nulto poz??ciju(??aj?? gad??jum?? der jebkura no 0 -2) - atgrie?? X vai O (atkar??b?? no t??, kur?? aizpild??jis 3 ciparu kombin??ciju no winningpositions)
      }
    }

    return "-"; //cit??di atgrie?? tuk??u laukumu (saist??ts ar GameUI failu) - turpina sp??li
  };

  Game.prototype.isTie = function () {
    if (this.cells.includes("-")) {
      return false; // ja laukum?? ir tuk??as ????nas - atgrie?? false (NAV NEIZ????IRTS) - apskata ??o if, ja v??l br??vas ????nas - turpina sp??li
    }

    if (this.getWinner() !== "-") {
      //ja IR uzvar??t??js (Nav neiz????irts)
      return false;
    }

    return true; // ja neizpild??s abi aug????jie ifi (nav tuk??u ????nu un nav uzvar??t??ja) = NEIZ????IRTS
  };

  Game.prototype.onClick = function (i) {
    if (this.cells[i] === "-" && this.getWinner() === "-") {
      // pie g??jiena tiek tikai tad, ja lauci???? ir tuk??s un neviens nav uzvar??jis!
      // ja ????na, uz kuras klik????ina ir tuk??a un nav uzvar??t??ja(jogetWinner atgrie?? tuk??u laukumu, nevis X vai O), tad... // ??is nodro??ina, ka, ja ????n?? atrodas x vai o, taj?? nevar ieklik????in??t v??lreiz un nomain??t x uz o un otr??di - tikai tuk???? laukum?? var ielikt k??du no simboliem, k?? ar?? uzvaras gad??jum?? vairs nevar izdar??t g??jienus - tuk??ie laukumi paliek tuk??i, ja tajos klik????ina
      this.cells[i] = this.getTurn(); // piek????stam cells mas??va indeksam (uz kura uzklik????ina) un nor??d??m,ka uz to izsaucas f-cija getTurn(), kas ????n?? ieliek 'x' vai O (atkar??b?? no get turn?? ielikt?? ifa)
    }

    console.log("cell " + i + " clicked");
  };

  Game.prototype.restart = function () {
    if (this.getWinner() !== "-" || this.isTie()) {
      // ja winners neatgrie?? tuk??u laukumu(t??tad ir uzvar??t??js, jo atgrie?? X vai O) VAI fcija isTie atgrie?? true(ir neiz????irts) = laukums atgrie??as s??kuma st??vokl?? - visus mas??va elementus aizpilda ar tuk??u laukumu - "-" - ????nas tuk??as
      this.cells.fill("-");
    }

    console.log("restart called");
  };

  return Game;
}();

exports.Game = Game;
},{}],"../src/GameUI.ts":[function(require,module,exports) {
"use strict";

var _Game = require("./Game");

/**
 * DO NOT EDIT THIS FILE
 */
var game = new _Game.Game();
var info = document.getElementById("info");
var button = document.getElementById("play-button");
var board = document.getElementById("board");
button.addEventListener("click", function () {
  game.restart();
  draw(game);
});

var draw = function draw(game) {
  board.innerHTML = "";
  game.getCells().forEach(function (cell, i) {
    var div = document.createElement("div");
    div.className = "box";

    if (cell !== "-") {
      div.innerText = cell;
    }

    div.addEventListener("click", function () {
      game.onClick(i);
      draw(game);
    });
    board.appendChild(div);
  });

  if (game.isTie()) {
    info.innerText = "It's a tie!";
    button.removeAttribute("disabled");
    button.className = "button button-hoverable";
  } else if (game.getWinner() !== "-") {
    info.innerText = "Nice, " + game.getWinner() + " won";
    button.removeAttribute("disabled");
    button.className = "button button-hoverable";
  } else {
    info.innerText = "It's " + game.getTurn() + " turn";
    button.setAttribute("disabled", "true");
    button.className = "button";
  }
};

draw(game);
},{"./Game":"../src/Game.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55392" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ??? Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] ????  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">????</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","../src/GameUI.ts"], null)
//# sourceMappingURL=/GameUI.d604de4c.js.map