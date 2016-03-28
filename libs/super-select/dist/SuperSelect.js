(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"));
	else if(typeof define === 'function' && define.amd)
		define(["React"], factory);
	else if(typeof exports === 'object')
		exports["SuperSelect"] = factory(require("React"));
	else
		root["SuperSelect"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = __webpack_require__(1);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(2);
	var Fuse = __webpack_require__(3);

	var Button = __webpack_require__(4);
	var OptionsList = __webpack_require__(5);
	var Actions = __webpack_require__(7);
	var SearchBox = __webpack_require__(9);

	var SuperSelect = React.createClass({
	    displayName: "SuperSelect",

	    propTypes: {
	        actions: React.PropTypes.arrayOf(React.PropTypes.shape({
	            handler: React.PropTypes.func.isRequired,
	            label: React.PropTypes.string.isRequired,
	            content: React.PropTypes.element
	        })),
	        content: React.PropTypes.node,
	        contentLabelProvider: React.PropTypes.func,
	        groups: React.PropTypes.array,
	        label: React.PropTypes.string.isRequired,
	        labelKey: React.PropTypes.string,
	        maxLabels: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.bool]),
	        multiple: React.PropTypes.bool,
	        noLabels: React.PropTypes.bool,
	        onChange: React.PropTypes.func,
	        options: React.PropTypes.array,
	        optionRender: React.PropTypes.func,
	        searchBox: React.PropTypes.bool,
	        searchKeys: React.PropTypes.arrayOf(React.PropTypes.string),
	        value: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.arrayOf(React.PropTypes.object)]),
	        valueKey: React.PropTypes.string,
	        valueLink: React.PropTypes.object
	    },

	    getDefaultProps: function getDefaultProps() {
	        "use strict";

	        return {
	            actions: [],
	            labelKey: "label",
	            maxLabels: false,
	            multiple: true,
	            noLabels: false,
	            options: [],
	            searchBox: true,
	            searchKeys: ["label"],
	            valueKey: "value",
	            // html attrs
	            tabIndex: 0
	        };
	    },

	    getInitialState: function getInitialState() {
	        "use strict";

	        return {
	            open: false,
	            pseudoHover: null,
	            q: ""
	        };
	    },

	    componentDidMount: function componentDidMount() {
	        "use strict";

	        this.refs.container.addEventListener("click", this.addSuperSelectToEvent);
	        document.addEventListener("click", this.closeOnClickOutside);
	    },

	    componentWillUnmount: function componentWillUnmount() {
	        "use strict";

	        this.refs.container.removeEventListener("click", this.addSuperSelectToEvent);
	        document.removeEventListener("click", this.closeOnClickOutside);
	    },

	    addSuperSelectToEvent: function addSuperSelectToEvent(e) {
	        "use strict";

	        // @todo i'm not happy with this

	        e.superSelect = this;
	    },

	    closeOnClickOutside: function closeOnClickOutside(e) {
	        "use strict";

	        var eventSuperSelect = e.superSelect || false;
	        if (!eventSuperSelect || eventSuperSelect !== this) {
	            this.setState({
	                open: false,
	                pseudoHover: null
	            });
	        }
	    },

	    getAllOptions: function getAllOptions() {
	        "use strict";

	        return this.props.options || [];
	    },

	    getOptions: function getOptions() {
	        "use strict";

	        var options = this.props.options || [];
	        var q = this.state.q;
	        var fuse = new Fuse(options, {
	            keys: this.props.searchKeys
	        });

	        // threshold: 0.4
	        if (!q.length) {
	            return options.slice();
	        }

	        return fuse.search(q);
	    },

	    getValue: function getValue() {
	        "use strict";

	        var value;
	        if (this.props.valueLink) {
	            value = this.props.valueLink.value;
	        } else {
	            value = this.props.value;
	        }

	        if (value === undefined || value === null) {
	            value = this.props.multiple ? [] : null;
	        }

	        return value;
	    },

	    buildbutton: function buildbutton() {
	        "use strict";

	        return React.createElement(Button, {
	            label: this.props.label,
	            contentLabelProvider: this.props.contentLabelProvider,
	            open: this.state.open,
	            value: this.getValue(),
	            options: this.getOptions(),
	            allOptions: this.getAllOptions(),
	            valueKey: this.props.valueKey,
	            labelKey: this.props.labelKey,
	            multiple: this.props.multiple,
	            toggle: this.toggle,
	            maxLabels: this.props.maxLabels,
	            noLabels: this.props.noLabels,
	            tabIndex: this.props.tabIndex,
	            handleFocus: this.handleFocus
	        });
	    },

	    toggle: function toggle(forceState) {
	        "use strict";

	        var newState = typeof forceState === "boolean" ? forceState : !this.state.open;
	        this.setState({
	            open: newState,
	            pseudoHover: null
	        });
	    },

	    isChecked: function isChecked(item, returnIndex) {
	        "use strict";

	        var index = false;
	        var value = this.getValue();
	        var found = false;
	        var valueKey = this.props.valueKey;

	        if (!value) {
	            return false;
	        }

	        if (this.props.multiple) {
	            found = value.filter(function (option, i) {
	                if (item[valueKey] == option[valueKey]) {
	                    index = i;
	                    return true;
	                }
	            }).length > 0;

	            return returnIndex ? index : found;
	        }

	        return item[valueKey] == value[valueKey];
	    },

	    handleChange: function handleChange(item) {
	        "use strict";

	        var value = this.getValue();
	        var current;

	        if (this.props.multiple) {
	            current = this.isChecked(item, true);

	            if (current !== false) {
	                value.splice(current, 1);
	            } else {
	                value.push(item);
	            }
	        } else {
	            value = item;
	        }

	        this.dispatchChanges(value);
	    },

	    dispatchChanges: function dispatchChanges(newValue) {
	        "use strict";

	        if (this.props.valueLink) {
	            this.props.valueLink.requestChange(newValue);
	        } else if (typeof this.props.onChange === "function") {
	            this.props.onChange(newValue);
	        }

	        if (!this.props.multiple) {
	            this.setState({ open: false });
	        }
	    },

	    clean: function clean() {
	        "use strict";

	        this.dispatchChanges(this.props.multiple ? [] : null);
	    },

	    selectAll: function selectAll() {
	        "use strict";

	        this.dispatchChanges(this.getOptions());
	    },

	    handleChangeQ: function handleChangeQ(event) {
	        "use strict";

	        this.setState({
	            q: event.target.value,
	            pseudoHover: null
	        });
	    },

	    handleNavigationKeys: function handleNavigationKeys(e) {
	        "use strict";

	        var currentPosition = this.state.pseudoHover || 0;
	        var isEnter = e.key === "Enter";
	        var open = this.state.open;
	        var mustRetainFocus = false;
	        var self = this;
	        var container = self.refs.container;

	        if (isEnter) {
	            e.preventDefault();
	        }

	        if (isEnter && !isNaN(currentPosition) && open) {
	            var option = this.getOptions()[currentPosition] || false;
	            if (option) {
	                this.handleChange(option);
	            }
	        }

	        switch (e.key) {
	            case "ArrowUp":
	                currentPosition = !currentPosition ? 0 : currentPosition - 1;
	                open = true;
	                break;
	            case "ArrowDown":
	                currentPosition = currentPosition + 1 === this.getOptions().length ? currentPosition : currentPosition + 1;
	                open = true;
	                break;
	        }

	        if (["Escape", "Tab"].indexOf(e.key) > -1) {
	            open = false;
	            mustRetainFocus = true;
	        }

	        this.setState({
	            open: open,
	            pseudoHover: currentPosition
	        }, function () {
	            if (mustRetainFocus) {
	                container.focus();
	            }
	        });
	    },

	    buildOptions: function buildOptions() {
	        "use strict";

	        return React.createElement(OptionsList, {
	            options: this.getOptions(),
	            optionRender: this.props.optionRender,
	            handleNavigationKeys: this.handleNavigationKeys,
	            isChecked: this.isChecked,
	            handleChange: this.handleChange,
	            currentHover: this.state.pseudoHover,
	            labelKey: this.props.labelKey,
	            actions: this.props.actions,
	            multiple: this.props.multiple,
	            key: "options-list"
	        });
	    },

	    buildSearchBox: function buildSearchBox() {
	        "use strict";

	        return React.createElement(SearchBox, {
	            searchArgument: this.state.q,
	            searchArgumentChange: this.handleChangeQ,
	            searchKeys: this.props.searchKeys,
	            key: "search-box"
	        });
	    },

	    buildActions: function buildActions() {
	        "use strict";

	        var actions = [];
	        if (this.props.options.length && this.props.multiple === true) {
	            actions.push({
	                label: "✓ Selecionar todos",
	                handler: this.selectAll
	            });
	            actions.push({
	                label: "✘ Limpar seleção",
	                handler: this.clean
	            });
	        }
	        actions = actions.concat(this.props.actions);

	        return React.createElement(Actions, { actions: actions, key: "actions" });
	    },

	    buildContent: function buildContent() {
	        "use strict";

	        var content = [];

	        if (this.state.open) {
	            if (this.props.searchBox) {
	                content.push(this.buildSearchBox());
	            }

	            content.push(this.buildActions());
	            content.push(this.props.content || this.buildOptions());

	            return React.createElement(
	                "div",
	                { className: "super-select-content" },
	                content
	            );
	        }
	    },

	    render: function render() {
	        "use strict";

	        return React.createElement(
	            "div",
	            {
	                className: "super-select-container",
	                ref: "container",
	                onKeyDown: this.handleNavigationKeys,
	                tabIndex: this.props.tabIndex
	            },
	            this.buildbutton(),
	            this.buildContent()
	        );
	    }
	});

	module.exports = SuperSelect;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Fuse - Lightweight fuzzy-search
	 *
	 * Copyright (c) 2012 Kirollos Risk <kirollos@gmail.com>.
	 * All Rights Reserved. Apache Software License 2.0
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */
	(function(global) {

	  /**
	   * Adapted from "Diff, Match and Patch", by Google
	   *
	   *   http://code.google.com/p/google-diff-match-patch/
	   *
	   * Modified by: Kirollos Risk <kirollos@gmail.com>
	   * -----------------------------------------------
	   * Details: the algorithm and structure was modified to allow the creation of
	   * <Searcher> instances with a <search> method which does the actual
	   * bitap search. The <pattern> (the string that is searched for) is only defined
	   * once per instance and thus it eliminates redundant re-creation when searching
	   * over a list of strings.
	   *
	   * Licensed under the Apache License, Version 2.0 (the "License");
	   * you may not use this file except in compliance with the License.
	   */
	  var BitapSearcher = function(pattern, options) {
	    options = options || {};
	    this.options = options;
	    this.options.location = options.location || BitapSearcher.defaultOptions.location;
	    this.options.distance = 'distance' in options ? options.distance : BitapSearcher.defaultOptions.distance;
	    this.options.threshold = 'threshold' in options ? options.threshold : BitapSearcher.defaultOptions.threshold;
	    this.options.maxPatternLength = options.maxPatternLength || BitapSearcher.defaultOptions.maxPatternLength;

	    this.pattern = options.caseSensitive ? pattern : pattern.toLowerCase();
	    this.patternLen = pattern.length;

	    if (this.patternLen > this.options.maxPatternLength) {
	      throw new Error('Pattern length is too long');
	    }

	    this.matchmask = 1 << (this.patternLen - 1);
	    this.patternAlphabet = this._calculatePatternAlphabet();
	  };

	  BitapSearcher.defaultOptions = {
	    // Approximately where in the text is the pattern expected to be found?
	    location: 0,

	    // Determines how close the match must be to the fuzzy location (specified above).
	    // An exact letter match which is 'distance' characters away from the fuzzy location
	    // would score as a complete mismatch. A distance of '0' requires the match be at
	    // the exact location specified, a threshold of '1000' would require a perfect match
	    // to be within 800 characters of the fuzzy location to be found using a 0.8 threshold.
	    distance: 100,

	    // At what point does the match algorithm give up. A threshold of '0.0' requires a perfect match
	    // (of both letters and location), a threshold of '1.0' would match anything.
	    threshold: 0.6,

	    // Machine word size
	    maxPatternLength: 32
	  };

	  /**
	   * Initialize the alphabet for the Bitap algorithm.
	   * @return {Object} Hash of character locations.
	   * @private
	   */
	  BitapSearcher.prototype._calculatePatternAlphabet = function() {
	    var mask = {},
	      i = 0;

	    for (i = 0; i < this.patternLen; i++) {
	      mask[this.pattern.charAt(i)] = 0;
	    }

	    for (i = 0; i < this.patternLen; i++) {
	      mask[this.pattern.charAt(i)] |= 1 << (this.pattern.length - i - 1);
	    }

	    return mask;
	  };

	  /**
	   * Compute and return the score for a match with `e` errors and `x` location.
	   * @param {number} errors Number of errors in match.
	   * @param {number} location Location of match.
	   * @return {number} Overall score for match (0.0 = good, 1.0 = bad).
	   * @private
	   */
	  BitapSearcher.prototype._bitapScore = function(errors, location) {
	    var accuracy = errors / this.patternLen,
	      proximity = Math.abs(this.options.location - location);

	    if (!this.options.distance) {
	      // Dodge divide by zero error.
	      return proximity ? 1.0 : accuracy;
	    }
	    return accuracy + (proximity / this.options.distance);
	  };

	  /**
	   * Compute and return the result of the search
	   * @param {String} text The text to search in
	   * @return {Object} Literal containing:
	   *                          {Boolean} isMatch Whether the text is a match or not
	   *                          {Decimal} score Overall score for the match
	   * @public
	   */
	  BitapSearcher.prototype.search = function(text) {
	    text = this.options.caseSensitive ? text : text.toLowerCase();

	    if (this.pattern === text) {
	      // Exact match
	      return {
	        isMatch: true,
	        score: 0
	      };
	    }

	    var i, j,
	      // Set starting location at beginning text and initialize the alphabet.
	      textLen = text.length,
	      LOCATION = this.options.location,
	      // Highest score beyond which we give up.
	      THRESHOLD = this.options.threshold,
	      // Is there a nearby exact match? (speedup)
	      bestLoc = text.indexOf(this.pattern, LOCATION),
	      binMin, binMid,
	      binMax = this.patternLen + textLen,
	      start, finish,
	      bitArr, lastBitArr,
	      charMatch,
	      score = 1,
	      locations = [];

	    if (bestLoc != -1) {
	      THRESHOLD = Math.min(this._bitapScore(0, bestLoc), THRESHOLD);
	      // What about in the other direction? (speedup)
	      bestLoc = text.lastIndexOf(this.pattern, LOCATION + this.patternLen);

	      if (bestLoc != -1) {
	        THRESHOLD = Math.min(this._bitapScore(0, bestLoc), THRESHOLD);
	      }
	    }

	    bestLoc = -1;

	    for (i = 0; i < this.patternLen; i++) {
	      // Scan for the best match; each iteration allows for one more error.
	      // Run a binary search to determine how far from 'MATCH_LOCATION' we can stray at this
	      // error level.
	      binMin = 0;
	      binMid = binMax;
	      while (binMin < binMid) {
	        if (this._bitapScore(i, LOCATION + binMid) <= THRESHOLD) {
	          binMin = binMid;
	        } else {
	          binMax = binMid;
	        }
	        binMid = Math.floor((binMax - binMin) / 2 + binMin);
	      }

	      // Use the result from this iteration as the maximum for the next.
	      binMax = binMid;
	      start = Math.max(1, LOCATION - binMid + 1);
	      finish = Math.min(LOCATION + binMid, textLen) + this.patternLen;

	      // Initialize the bit array
	      bitArr = Array(finish + 2);

	      bitArr[finish + 1] = (1 << i) - 1;

	      for (j = finish; j >= start; j--) {
	        // The alphabet <patternAlphabet> is a sparse hash, so the following line generates warnings.
	        charMatch = this.patternAlphabet[text.charAt(j - 1)];

	        if (i === 0) {
	          // First pass: exact match.
	          bitArr[j] = ((bitArr[j + 1] << 1) | 1) & charMatch;
	        } else {
	          // Subsequent passes: fuzzy match.
	          bitArr[j] = ((bitArr[j + 1] << 1) | 1) & charMatch | (((lastBitArr[j + 1] | lastBitArr[j]) << 1) | 1) | lastBitArr[j + 1];
	        }
	        if (bitArr[j] & this.matchmask) {
	          score = this._bitapScore(i, j - 1);
	          // This match will almost certainly be better than any existing match.
	          // But check anyway.
	          if (score <= THRESHOLD) {
	            // Told you so.
	            THRESHOLD = score;
	            bestLoc = j - 1;
	            locations.push(bestLoc);

	            if (bestLoc > LOCATION) {
	              // When passing loc, don't exceed our current distance from loc.
	              start = Math.max(1, 2 * LOCATION - bestLoc);
	            } else {
	              // Already passed loc, downhill from here on in.
	              break;
	            }
	          }
	        }
	      }

	      // No hope for a (better) match at greater error levels.
	      if (this._bitapScore(i + 1, LOCATION) > THRESHOLD) {
	        break;
	      }
	      lastBitArr = bitArr;
	    }

	    return {
	      isMatch: bestLoc >= 0,
	      score: score
	    };
	  };

	  var deepValueHelper = function(obj, path, list) {
	    var firstSegment, remaining, dotIndex;

	    if (!path) {
	      // If there's no path left, we've gotten to the object we care about.
	      list.push(obj);
	    } else {
	      dotIndex = path.indexOf('.');
	      if (dotIndex !== -1) {
	        firstSegment = path.slice(0, dotIndex);
	        remaining = path.slice(dotIndex + 1);
	      } else {
	        firstSegment = path;
	      }

	      var value = obj[firstSegment];
	      if (value) {
	        if (!remaining && (typeof value === 'string' || typeof value === 'number')) {
	          list.push(value);
	        } else if (Utils.isArray(value)) {
	          // Search each item in the array.
	          for (var i = 0, len = value.length; i < len; i++) {
	            deepValueHelper(value[i], remaining, list);
	          }
	        } else if (remaining) {
	          // An object. Recurse further.
	          deepValueHelper(value, remaining, list);
	        }
	      }
	    }

	    return list;
	  };

	  var Utils = {
	    /**
	     * Traverse an object
	     * @param {Object} obj The object to traverse
	     * @param {String} path A . separated path to a key in the object. Example 'Data.Object.Somevalue'
	     * @return {Object}
	     */
	    deepValue: function(obj, path) {
	      return deepValueHelper(obj, path, []);
	    },
	    isArray: function(obj) {
	      return Object.prototype.toString.call(obj) === '[object Array]';
	    }
	  };

	  /**
	   * @param {Array} list
	   * @param {Object} options
	   * @public
	   */
	  function Fuse(list, options) {
	    this.list = list;
	    this.options = options = options || {};

	    var i, len, key, keys;
	    // Add boolean type options
	    for (i = 0, keys = ['sort', 'shouldSort'], len = keys.length; i < len; i++) {
	      key = keys[i];
	      this.options[key] = key in options ? options[key] : Fuse.defaultOptions[key];
	    }
	    // Add all other options
	    for (i = 0, keys = ['searchFn', 'sortFn', 'keys', 'getFn', 'include'], len = keys.length; i < len; i++) {
	      key = keys[i];
	      this.options[key] = options[key] || Fuse.defaultOptions[key];
	    }
	  };

	  Fuse.defaultOptions = {
	    id: null,

	    caseSensitive: false,

	    // A list of values to be passed from the searcher to the result set.
	    // If include is set to ['score', 'highlight'], each result
	    //   in the list will be of the form: `{ item: ..., score: ..., highlight: ... }`
	    include: [],

	    // Whether to sort the result list, by score
	    shouldSort: true,

	    // The search function to use
	    // Note that the default search function ([[Function]]) must conform to the following API:
	    //
	    //  @param pattern The pattern string to search
	    //  @param options The search option
	    //  [[Function]].constructor = function(pattern, options)
	    //
	    //  @param text: the string to search in for the pattern
	    //  @return Object in the form of:
	    //    - isMatch: boolean
	    //    - score: Int
	    //  [[Function]].prototype.search = function(text)
	    searchFn: BitapSearcher,

	    // Default sort function
	    sortFn: function(a, b) {
	      return a.score - b.score;
	    },

	    // Default get function
	    getFn: Utils.deepValue,

	    keys: []
	  };

	  /**
	   * Sets a new list for Fuse to match against.
	   * @param {Array} list
	   * @return {Array} The newly set list
	   * @public
	   */
	  Fuse.prototype.set = function(list) {
	    this.list = list;

	    return list;
	  };

	  /**
	   * Searches for all the items whose keys (fuzzy) match the pattern.
	   * @param {String} pattern The pattern string to fuzzy search on.
	   * @return {Array} A list of all serch matches.
	   * @public
	   */
	  Fuse.prototype.search = function(pattern) {
	    var searcher = new(this.options.searchFn)(pattern, this.options),
	      j, item,
	      list = this.list,
	      dataLen = list.length,
	      options = this.options,
	      searchKeys = this.options.keys,
	      searchKeysLen = searchKeys.length,
	      bitapResult,
	      rawResults = [],
	      resultMap = {},
	      existingResult,
	      results = [];

	    /**
	     * Calls <Searcher::search> for bitap analysis. Builds the raw result list.
	     * @param {String} text The pattern string to fuzzy search on.
	     * @param {String|Number} entity If the <data> is an Array, then entity will be an index,
	     *                            otherwise it's the item object.
	     * @param {Number} index
	     * @private
	     */
	    var analyzeText = function(text, entity, index) {
	      // Check if the text can be searched
	      if (text === undefined || text === null) {
	        return;
	      }

	      if (typeof text === 'string') {

	        // Get the result
	        bitapResult = searcher.search(text);

	        // If a match is found, add the item to <rawResults>, including its score
	        if (bitapResult.isMatch) {

	          // Check if the item already exists in our results
	          existingResult = resultMap[index];
	          if (existingResult) {
	            // Use the lowest score
	            existingResult.score = Math.min(existingResult.score, bitapResult.score);
	          } else {
	            // Add it to the raw result list
	            resultMap[index] = {
	              item: entity,
	              score: bitapResult.score
	            };
	            rawResults.push(resultMap[index]);
	          }
	        }
	      } else if (Utils.isArray(text)) {
	        for (var i = 0; i < text.length; i++) {
	          analyzeText(text[i], entity, index);
	        }
	      }
	    };

	    // Check the first item in the list, if it's a string, then we assume
	    // that every item in the list is also a string, and thus it's a flattened array.
	    if (typeof list[0] === 'string') {
	      // Iterate over every item
	      for (var i = 0; i < dataLen; i++) {
	        analyzeText(list[i], i, i);
	      }
	    } else {
	      // Otherwise, the first item is an Object (hopefully), and thus the searching
	      // is done on the values of the keys of each item.

	      // Iterate over every item
	      for (var i = 0; i < dataLen; i++) {
	        item = list[i];
	        // Iterate over every key
	        for (j = 0; j < searchKeysLen; j++) {
	          analyzeText(options.getFn(item, searchKeys[j]), item, i);
	        }
	      }
	    }

	    if (options.shouldSort) {
	      rawResults.sort(options.sortFn);
	    }

	    // Helper function, here for speed-up, which replaces the item with its value,
	    // if the options specifies it,
	    var replaceValue = options.id ? function(i) {
	      rawResults[i].item = options.getFn(rawResults[i].item, options.id)[0];
	    } : function() {
	      return; // no-op
	    };

	    // Helper function, here for speed-up, which returns the
	    // item formatted based on the options.
	    var getItem = function(i) {
	      var resultItem;

	      if(options.include.length > 0) // If `include` has values, put the item under result.item
	      {
	        resultItem = {
	          item: rawResults[i].item,
	        };

	        // Then include the includes
	        for(var j = 0; j < options.include.length; j++)
	        {
	          var includeVal = options.include[j];
	          resultItem[includeVal] = rawResults[i][includeVal];
	        }
	      }
	      else
	      {
	        resultItem = rawResults[i].item;
	      }

	      return resultItem;
	    };

	    // From the results, push into a new array only the item identifier (if specified)
	    // of the entire item.  This is because we don't want to return the <rawResults>,
	    // since it contains other metadata;
	    for (var i = 0, len = rawResults.length; i < len; i++) {
	      replaceValue(i);
	      results.push(getItem(i));
	    }

	    return results;
	  };

	  // Export to Common JS Loader
	  if (true) {
	    // Node. Does not work with strict CommonJS, but
	    // only CommonJS-like environments that support module.exports,
	    // like Node.
	    module.exports = Fuse;
	  } else if (typeof define === 'function' && define.amd) {
	    // AMD. Register as an anonymous module.
	    define(function() {
	      return Fuse;
	    });
	  } else {
	    // Browser globals (root is window)
	    global.Fuse = Fuse;
	  }

	})(this);


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(2);

	/**
	 * @todo support max display items
	 */

	var Button = React.createClass({
	    displayName: "SuperSelect.button",

	    getDefaultProps: function getDefaultProps() {
	        "use strict";

	        return {
	            label: "",
	            open: false,
	            value: null,
	            options: [],
	            allOptions: [],
	            valueKey: "id",
	            labelKey: "name",
	            multiple: true,
	            maxLabels: false,
	            noLabels: false,
	            contentLabelProvider: null
	        };
	    },

	    getClassName: function getClassName() {
	        "use strict";

	        return "super-select-button" + (this.props.open ? " open" : "");
	    },

	    getLabel: function getLabel() {
	        "use strict";

	        var label = this.props.label;
	        if (typeof this.props.contentLabelProvider === "function") {
	            label = this.props.contentLabelProvider();
	        }

	        return React.createElement(
	            "span",
	            {
	                className: "super-select-button-label",
	                id: "label",
	                key: "label-text"
	            },
	            label
	        );
	    },

	    render: function render() {
	        "use strict";

	        var self = this;
	        var className = this.getClassName();
	        var text = [];
	        var countValues = 0;
	        var value = this.props.value;

	        text.push(this.getLabel());

	        // @todo improve this
	        if (value && this.props.noLabels === false) {
	            if (this.props.multiple && this.props.value.length) {
	                text.push(": ");

	                if (this.props.value.length === this.props.allOptions.length) {
	                    text.push(React.createElement(
	                        "span",
	                        { className: "super-select-button-label-value", key: "all" },
	                        "todos"
	                    ));
	                } else if (this.props.noLabels === true) {
	                    text.push(React.createElement(
	                        "span",
	                        { className: "super-select-button-label-value", key: "allCount" },
	                        this.props.value.length
	                    ));
	                } else {
	                    this.props.value.map(function (item, index) {
	                        if (self.props.maxLabels === false || countValues < self.props.maxLabels) {
	                            text.push(React.createElement(
	                                "span",
	                                { className: "super-select-button-label-value", key: index },
	                                item[self.props.labelKey]
	                            ));
	                            countValues++;
	                        }
	                    });

	                    if (self.props.maxLabels !== false && self.props.maxLabels < self.props.value.length) {
	                        text.push(React.createElement(
	                            "span",
	                            { className: "super-select-button-label-value", key: "-1" },
	                            "mais ",
	                            self.props.value.length - self.props.maxLabels
	                        ));
	                    }
	                }
	            } else if (!this.props.multiple && this.props.value[this.props.labelKey]) {
	                text.push(React.createElement(
	                    "span",
	                    { className: "super-select-button-label-value", key: "selected" },
	                    this.props.value[this.props.labelKey]
	                ));
	            }
	        }

	        return React.createElement(
	            "label",
	            {
	                className: className,
	                onClick: this.props.toggle
	            },
	            text
	        );
	    }
	});

	module.exports = Button;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(2);

	var Option = __webpack_require__(6);

	var OptionsList = React.createClass({
	    displayName: "SuperSelect.OptionsList",

	    getDefaultProps: function getDefaultProps() {
	        "use strict";

	        return {
	            options: [],
	            isChecked: null,
	            handleChange: null,
	            currentHover: false,
	            multiple: false,
	            labelKey: "name"
	        };
	    },

	    renderOptions: function renderOptions() {
	        "use strict";

	        var self = this;
	        var options = this.props.options;
	        if (!options.length) {
	            return React.createElement(
	                "li",
	                {
	                    className: "super-select-options-list-item not-found",
	                    key: "not-found"
	                },
	                "Nada encontrado :/"
	            );
	        }

	        return options.map(function (item, index) {
	            var optionProps = {
	                index: index,
	                pseudoHover: index === self.props.currentHover,
	                checked: self.props.isChecked(item),
	                option: item,
	                onChange: self.props.handleChange,
	                labelKey: self.props.labelKey,
	                multiple: self.props.multiple
	            };

	            if (self.props.optionRender) {
	                return self.props.optionRender(optionProps);
	            }

	            return React.createElement(Option, _extends({}, optionProps, { key: index }));
	        });
	    },

	    render: function render() {
	        "use strict";

	        return React.createElement(
	            "div",
	            { className: "super-select-options-container" },
	            React.createElement(
	                "ul",
	                { className: "super-select-options-list" },
	                this.renderOptions()
	            )
	        );
	    }
	});

	module.exports = OptionsList;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(2);

	var Option = React.createClass({
	    displayName: "SuperSelect.Option",

	    getDefaultProps: function getDefaultProps() {
	        "use strict";

	        return {
	            pseudoHover: false,
	            checked: false,
	            onChange: null,
	            labelKey: "name",
	            multiple: false,
	            option: {}
	        };
	    },

	    handleChange: function handleChange() {
	        "use strict";

	        this.props.onChange(this.props.option);
	    },

	    render: function render() {
	        "use strict";

	        var className = "super-select-options-list-item";
	        var type = this.props.multiple ? "checkbox" : "radio";

	        if (this.props.pseudoHover) {
	            className += " hover";
	        }

	        return React.createElement(
	            "li",
	            { className: className },
	            React.createElement(
	                "label",
	                null,
	                React.createElement("input", {
	                    type: type,
	                    checked: this.props.checked,
	                    onChange: this.handleChange,
	                    tabIndex: "-1"
	                }),
	                this.props.option[this.props.labelKey]
	            )
	        );
	    }
	});

	module.exports = Option;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(2);
	var Action = __webpack_require__(8);

	var Actions = React.createClass({
	    displayName: "SuperSelect.Actions",

	    getDefaultProps: function getDefaultProps() {
	        "use strict";

	        return {
	            actions: []
	        };
	    },

	    render: function render() {
	        "use strict";

	        if (!this.props.actions.length) {
	            return React.createElement("div", null);
	        }

	        return React.createElement(
	            "ul",
	            { className: "super-select-actions" },
	            this.props.actions.map(function (action, index) {
	                return React.createElement(Action, _extends({}, action, { key: index }));
	            })
	        );
	    }
	});

	module.exports = Actions;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(2);

	var Action = React.createClass({
	    displayName: "SuperSelect.Action",

	    getDefaultProps: function getDefaultProps() {
	        "use strict";

	        return {
	            handler: function handler() {
	                console.log("action clicked ;)");
	            },
	            label: "Action",
	            content: null
	        };
	    },

	    getContent: function getContent() {
	        "use strict";

	        return this.props.content || this.props.label;
	    },
	    render: function render() {
	        "use strict";

	        return React.createElement(
	            "li",
	            {
	                className: "super-select-action",
	                onClick: this.props.handler
	            },
	            this.getContent()
	        );
	    }
	});

	module.exports = Action;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(2);

	var SearchBox = React.createClass({
	    displayName: "SuperSelect.SearchBox",

	    getDefaultProps: function getDefaultProps() {
	        "use strict";

	        return {
	            searchArgument: "",
	            searchArgumentChange: null
	        };
	    },

	    componentDidMount: function componentDidMount() {
	        "use strict";

	        this.refs.q.focus();
	    },

	    handleKeyPress: function handleKeyPress(e) {
	        "use strict";

	        if (["ArrowUp", "ArrowDown"].indexOf(e.key) > -1) {
	            e.preventDefault();
	        }
	    },

	    render: function render() {
	        "use strict";

	        return React.createElement(
	            "div",
	            { className: "super-select-options-search-container" },
	            React.createElement("input", {
	                className: "form-control",
	                type: "search",
	                value: this.props.searchArgument,
	                onChange: this.props.searchArgumentChange,
	                onKeyDown: this.handleKeyPress,
	                placeholder: "Digite para filtrar opção...",
	                ref: "q"
	            })
	        );
	    }
	});

	module.exports = SearchBox;

/***/ }
/******/ ])
});
;