var CANVAS_WIDTH = 1216;
var CANVAS_HEIGHT = 832;

var EDGEBOARD_X = 40;
var EDGEBOARD_Y = 172;

var FPS = 30;
var FPS_TIME = 1000 / FPS;
var DISABLE_SOUND_MOBILE = false;

var PRIMARY_FONT = "impactregular";
var SECONDARY_FONT = "ds-digitalbold";
var TERTIARY_FONT = "motorwerkregular";

var STATE_LOADING = 0;
var STATE_MENU = 1;
var STATE_BET_PANEL = 2;
var STATE_GAME = 3;

var ON_MOUSE_DOWN = 0;
var ON_MOUSE_UP = 1;
var ON_MOUSE_OVER = 2;
var ON_MOUSE_OUT = 3;
var ON_DRAG_START = 4;
var ON_DRAG_END = 5;

var FICHE_WIDTH = 44; 
var COLOR_FICHES =["#ff7706","#ffb600","#000","#06a800","#d50000","#444444"]
var CHIP_VALUES;
var BET_PANEL_X = 40;
var BET_PANEL_Y = 165;
var BET_PANEL_WIDTH;
var BET_PANEL_HEIGHT;
var HORSE_WIDTH = 326;
var HORSE_HEIGHT = 212;
var NUM_CHIPS;
var NUM_HORSES;
var MIN_BET;
var MAX_BET;
var WIN_OCCURRENCE;
var NUM_TRACK_BG = 397;
var ARRIVAL_X = 477;
var TIME_CHECK_RANK = 2000;
var HORSE_DATA = { "horse_names":["engineer","pin","doughnut","mayhem","last things","chatterbox","hypno","croquette"],
                    "odd_win_bet":[3.7,5.5,2.2,11.75,17.25,8.75,7.15,6.15],
                    "odd_place_bet":[1.95,2.55,1.25,5.5,7.75,3.05,2.50,2.05],
                    "odd_show_bet":[1.25,1.7,1.09,2.55,4,1.75,1.55,1.35],
                    "forecast":[{"first":1,"second":2,"odd":20},{"first":1,"second":3,"odd":6.25},{"first":1,"second":4,"odd":60},{"first":1,"second":5,"odd":80},{"first":1,"second":6,"odd":23},{"first":1,"second":7,"odd":20},{"first":1,"second":8,"odd":15},
                                    {"first":2,"second":1,"odd":28},{"first":2,"second":3,"odd":10.25},{"first":2,"second":4,"odd":65},{"first":2,"second":5,"odd":68},{"first":2,"second":6,"odd":58},{"first":2,"second":7,"odd":42},{"first":2,"second":8,"odd":32},
                                    {"first":3,"second":1,"odd":5.75},{"first":3,"second":2,"odd":8.75},{"first":3,"second":4,"odd":26},{"first":3,"second":5,"odd":31},{"first":3,"second":6,"odd":19},{"first":3,"second":7,"odd":15},{"first":3,"second":8,"odd":10},
                                    {"first":4,"second":1,"odd":84},{"first":4,"second":2,"odd":56},{"first":4,"second":3,"odd":23},{"first":4,"second":5,"odd":80},{"first":4,"second":6,"odd":65},{"first":4,"second":7,"odd":55},{"first":4,"second":8,"odd":40},
                                    {"first":5,"second":1,"odd":70},{"first":5,"second":2,"odd":70},{"first":5,"second":3,"odd":68},{"first":5,"second":4,"odd":84},{"first":5,"second":6,"odd":80},{"first":5,"second":7,"odd":70},{"first":5,"second":8,"odd":50},
                                    {"first":6,"second":1,"odd":48},{"first":6,"second":2,"odd":58},{"first":6,"second":3,"odd":13},{"first":6,"second":4,"odd":70},{"first":6,"second":5,"odd":80},{"first":6,"second":7,"odd":55},{"first":6,"second":8,"odd":40},
                                    {"first":7,"second":1,"odd":40},{"first":7,"second":2,"odd":50},{"first":7,"second":3,"odd":10},{"first":7,"second":4,"odd":50},{"first":7,"second":5,"odd":55},{"first":7,"second":6,"odd":40},{"first":7,"second":8,"odd":35},
                                    {"first":8,"second":1,"odd":38},{"first":8,"second":2,"odd":48},{"first":8,"second":3,"odd":8},{"first":8,"second":4,"odd":50},{"first":8,"second":5,"odd":40},{"first":8,"second":6,"odd":35},{"first":8,"second":7,"odd":30}]
 };

var ENABLE_FULLSCREEN;
var ENABLE_CHECK_ORIENTATION;
var SHOW_CREDITS;
var SOUNDTRACK_VOLUME_IN_GAME  = 1;