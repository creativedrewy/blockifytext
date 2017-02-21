var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define("mesh/Block1x1", ["require", "exports", "three"], function (require, exports, _three) {
    "use strict";
    var Block1x1 = (function (_super) {
        __extends(Block1x1, _super);
        function Block1x1(blockColor) {
            if (blockColor === void 0) { blockColor = 0xff0000; }
            var _this = _super.call(this) || this;
            var boxGeom = new _three.BoxGeometry(Block1x1.blockDimension, 9.6, Block1x1.blockDimension);
            var newBox = new _three.Mesh(boxGeom, new _three.MeshPhongMaterial({ color: blockColor, specular: 0xcccccc, shininess: 100 }));
            newBox.position.y = 4.8;
            newBox.castShadow = true;
            newBox.receiveShadow = true;
            _this.add(newBox);
            var cylGeom = new _three.CylinderGeometry(2.4, 2.4, 1.7, 30);
            var newCyl = new _three.Mesh(cylGeom, new _three.MeshPhongMaterial({ color: blockColor, specular: 0xcccccc, shininess: 100 }));
            newCyl.position.y = 10.45;
            newCyl.castShadow = true;
            newCyl.receiveShadow = true;
            _this.add(newCyl);
            _this.castShadow = true;
            _this.receiveShadow = true;
            _this.rotation.x = Math.PI / 2;
            return _this;
        }
        return Block1x1;
    }(_three.Object3D));
    Block1x1.blockDimension = 7.8;
    exports.Block1x1 = Block1x1;
});
define("object3d/Letter3d", ["require", "exports", "three", "mesh/Block1x1"], function (require, exports, _three, Block1x1_1) {
    "use strict";
    var Letter3d = (function (_super) {
        __extends(Letter3d, _super);
        function Letter3d(letterProps) {
            var _this = _super.call(this) || this;
            _this.propsData = letterProps;
            _this.letterBlocks = new Array();
            return _this;
        }
        Object.defineProperty(Letter3d.prototype, "blockWidth", {
            get: function () { return this.propsData.w; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Letter3d.prototype, "blockHeight", {
            get: function () { return this.propsData.px.length; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Letter3d.prototype, "pxWidth", {
            get: function () { return this.blockWidth * Block1x1_1.Block1x1.blockDimension; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Letter3d.prototype, "pxHeight", {
            get: function () { return this.blockHeight * Block1x1_1.Block1x1.blockDimension; },
            enumerable: true,
            configurable: true
        });
        Letter3d.prototype.getBlockSrc = function (x, y) {
            return parseInt(this.propsData.px[x][y]);
        };
        Letter3d.prototype.addBlock = function (block) {
            this.letterBlocks.push(block);
            this.add(block);
        };
        return Letter3d;
    }(_three.Object3D));
    exports.Letter3d = Letter3d;
});
define("object3d/SpaceChar3d", ["require", "exports", "object3d/Letter3d"], function (require, exports, Letter3d_1) {
    "use strict";
    var SpaceChar3d = (function (_super) {
        __extends(SpaceChar3d, _super);
        function SpaceChar3d() {
            return _super.call(this, {}) || this;
        }
        Object.defineProperty(SpaceChar3d.prototype, "blockWidth", {
            get: function () { return 5; },
            enumerable: true,
            configurable: true
        });
        return SpaceChar3d;
    }(Letter3d_1.Letter3d));
    exports.SpaceChar3d = SpaceChar3d;
});
define("service/Block3dFontService", ["require", "exports", "object3d/SpaceChar3d", "three", "mesh/Block1x1", "object3d/Letter3d"], function (require, exports, SpaceChar3d_1, _three, Block1x1_2, Letter3d_2) {
    "use strict";
    var Block3dFontService = (function () {
        function Block3dFontService() {
            this.blockColors = [0xfec400, 0xe76318, 0xde000d, 0xde378b, 0x0057a8, 0xffff99, 0xee9ec4, 0x87c0ea, 0xf49b00, 0x9c006b, 0x478cc6];
        }
        Block3dFontService.prototype.loadFontData = function (fontJson) {
            var _this = this;
            return new Promise(function (resolve) {
                var fontLoader = new _three.XHRLoader(_three.DefaultLoadingManager);
                fontLoader.load(fontJson, function (res) {
                    _this.letterData = JSON.parse(res);
                    resolve(true);
                });
            });
        };
        Block3dFontService.prototype.generate3dLetter = function (letter, color) {
            if (color === void 0) { color = 0xff0000; }
            if (letter == " ") {
                var letter3d = new SpaceChar3d_1.SpaceChar3d();
            }
            else {
                if (Object.keys(this.letterData).indexOf(letter) == -1)
                    return null;
                var letter3d = new Letter3d_2.Letter3d(this.letterData[letter]);
                var letterDisp = "";
                for (var i = 0; i < letter3d.blockHeight; i++) {
                    for (var j = 0; j < letter3d.blockWidth; j++) {
                        if (letter3d.getBlockSrc(i, j) == 1) {
                            var pxBlock = new Block1x1_2.Block1x1(color);
                            pxBlock.position.x = j * Block1x1_2.Block1x1.blockDimension;
                            pxBlock.position.y = (letter3d.pxHeight / 2) - (i * Block1x1_2.Block1x1.blockDimension);
                            letter3d.addBlock(pxBlock);
                        }
                    }
                }
            }
            return letter3d;
        };
        return Block3dFontService;
    }());
    exports.Block3dFontService = Block3dFontService;
});
define("object3d/WordBuilder", ["require", "exports", "three"], function (require, exports, _three) {
    "use strict";
    var WordBuilder = (function (_super) {
        __extends(WordBuilder, _super);
        function WordBuilder(svc) {
            var _this = _super.call(this) || this;
            _this.letterSpacing = 10;
            _this.totalWidth = 0;
            _this.fontService = svc;
            _this.letterStash = new Array();
            return _this;
        }
        WordBuilder.prototype.appendLetter = function (letter) {
            var colorIndex = Math.round((Math.random() * this.fontService.blockColors.length - 1));
            var newLetter = this.fontService.generate3dLetter(letter, this.fontService.blockColors[colorIndex]);
            if (newLetter) {
                this.add(newLetter);
                this.letterStash.push(newLetter);
                this.totalWidth += newLetter.pxWidth + this.letterSpacing;
                this.positionLetters();
            }
        };
        WordBuilder.prototype.deleteLastLetter = function () {
            if (this.letterStash.length > 0) {
                var removeLetter = this.letterStash.pop();
                this.totalWidth -= removeLetter.pxWidth + this.letterSpacing;
                this.remove(removeLetter);
                this.positionLetters();
            }
        };
        WordBuilder.prototype.positionLetters = function () {
            var _this = this;
            var xOffset = -(this.totalWidth / 2);
            this.letterStash.forEach(function (child) {
                child.position.x = xOffset;
                xOffset += child.pxWidth + _this.letterSpacing;
            });
        };
        return WordBuilder;
    }(_three.Object3D));
    exports.WordBuilder = WordBuilder;
});
define("BlockifyText", ["require", "exports", "object3d/WordBuilder", "three", "service/Block3dFontService"], function (require, exports, WordBuilder_1, _three, Block3dFontService_1) {
    "use strict";
    var BlockifyText = (function () {
        function BlockifyText() {
            this.width = 900;
            this.height = 400;
            this.sceneMain = new _three.Scene();
            this.cameraMain = new _three.PerspectiveCamera(75, this.width / this.height, 1, 10000);
            this.cameraMain.position.z = 250;
            this.rendererMain = new _three.WebGLRenderer({ antialias: true });
            this.rendererMain.shadowMapEnabled = true;
            this.rendererMain.shadowMap.type = _three.PCFSoftShadowMap;
            this.rendererMain.setSize(this.width, this.height);
            document.body.appendChild(this.rendererMain.domElement);
            this.setupLights();
            this.setupTextInteractions();
        }
        BlockifyText.prototype.setupTextInteractions = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var fontService;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            fontService = new Block3dFontService_1.Block3dFontService();
                            this.mainPhrase = new WordBuilder_1.WordBuilder(fontService);
                            return [4 /*yield*/, fontService.loadFontData(BlockifyText.FONT_04b25)];
                        case 1:
                            _a.sent();
                            this.sceneMain.add(this.mainPhrase);
                            document.body.onkeydown = function (ev) {
                                if (ev.keyCode == 8) {
                                    _this.mainPhrase.deleteLastLetter();
                                }
                                else {
                                    _this.mainPhrase.appendLetter(ev.key.toLowerCase());
                                }
                            };
                            this.animateMainPhrase();
                            this.typeFirstPhrase();
                            return [2 /*return*/];
                    }
                });
            });
        };
        BlockifyText.prototype.animateMainPhrase = function () {
            var animDuration = 5;
            this.mainPhrase.rotation.x = -Math.PI / 30;
            this.mainPhrase.rotation.y = -Math.PI / 50;
            var timeline = new TimelineMax({ repeat: -1 });
            timeline.add(TweenLite.to(this.mainPhrase.rotation, animDuration, { x: Math.PI / 30, ease: Quad.easeInOut }));
            timeline.add(TweenLite.to(this.mainPhrase.rotation, animDuration, { y: Math.PI / 50, ease: Quad.easeInOut }));
            timeline.add(TweenLite.to(this.mainPhrase.rotation, animDuration, { x: -Math.PI / 30, ease: Quad.easeInOut }));
            timeline.add(TweenLite.to(this.mainPhrase.rotation, animDuration, { y: -Math.PI / 50, ease: Quad.easeInOut }));
        };
        BlockifyText.prototype.typeFirstPhrase = function () {
            return __awaiter(this, void 0, void 0, function () {
                var firstWord, i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            firstWord = "type here";
                            i = 0;
                            _a.label = 1;
                        case 1:
                            if (!(i < firstWord.length)) return [3 /*break*/, 4];
                            this.mainPhrase.appendLetter(firstWord[i]);
                            return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 200); })];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        BlockifyText.prototype.setupLights = function () {
            this.sceneMain.add(new _three.AmbientLight(0xaaaaaa, 0.7));
            var topLeft = new _three.PointLight(0xffffff, 0.4);
            topLeft.position.set(-250, 150, 150);
            topLeft.castShadow = true;
            topLeft.shadowMapWidth = 2048;
            topLeft.shadowMapHeight = 2048;
            this.sceneMain.add(topLeft);
            var bottomCenter = new _three.PointLight(0xaaaaaa, 0.4);
            bottomCenter.position.set(0, -150, 125);
            bottomCenter.castShadow = true;
            bottomCenter.shadowMapHeight = 2048;
            bottomCenter.shadowMapWidth = 2048;
            this.sceneMain.add(bottomCenter);
            var topRight = new _three.PointLight(0xaaaaaa, 0.3);
            topRight.position.set(300, 75, 150);
            topRight.castShadow = true;
            topRight.shadowMapHeight = 2048;
            topRight.shadowMapWidth = 2048;
            this.sceneMain.add(topRight);
        };
        BlockifyText.prototype.run = function () {
            var _this = this;
            setInterval(function () {
                _this.rendererMain.render(_this.sceneMain, _this.cameraMain);
            }, 33);
        };
        return BlockifyText;
    }());
    BlockifyText.FONT_04b25 = 'assets/04b25_font.json';
    exports.BlockifyText = BlockifyText;
});
