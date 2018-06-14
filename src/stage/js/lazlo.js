/**
 * Lazy Load Image v0.1.0
 * lli
 * https://github.com/evgv/lli
 *
 * Copyright 2018 Zubkov Eugene
 * Released under the MIT
 */

/**
 * Example
 * 
 * <img src="" data-src='//www.example.com/images/image-1.png'/>
 */

/**
 *
 * Create scope
 * 
 * @param {object}    global      - window
 * @param {undefined} undefined   - undefined
 */
(function (global, undefined) {

    "use strict";

    /**
     * Factory method
     *
     * @throws {Error}  lli.js requires a `window` with a `document` object"
     * @param  {object} window
     */
    var factory = function (window) {


        
        /**
         * Check window object is exist
         */
        if (typeof window.document !== "object") {
            throw new Error("lli.js requires a `window` with a `document` object");
        }

        /**
         * Main instance
         */
        var lli = function() {

            /**
             * Load all images
             *
             * @returns {undefined}
             */
            this._load = function() {

                /**
                 * @type NodeList
                 */
                var images = document.querySelectorAll('[data-src]');
                
                if (images.length) {
                    Array.prototype.forEach.call(images, function(image) {    
                        image.setAttribute("src", image.getAttribute("data-src"));
                    });
                }

            };

            /**
             * Check MSIE
             * @todo remove
             * @deprecated from 0.0.4
             *
             * @returns boolean
             */
            this._isMcie = function() {

                var agent = window.navigator.userAgent;

                if ( 
                    agent.indexOf("MSIE") > 0 || 
                    !! agent.match(/Trident.*rv\:11\./)
                ) {
                    return true;
                }

                return false;
            };
        };

        /**
         * Initialize object variables
         */
        lli.initialize = function() {

            var self = new lli();
            
            document.addEventListener(document, "DOMContentLoaded");  //Dom parsing is finished
            document.addEventListener(window, "load"); //loading of all external stuff is done
            
            window.addEventListener("load", function() {
                self._load();
            }, false); 
        };

        /**
         * Return main instance
         */
        return lli;

    };

    /**
     * Create lli instance
     */
    var lliExport = typeof global.document === "object" ? factory(global) : factory;


    /**
     * AMD support
     */
    if (typeof define === "function" && define.amd) {

        define(function () {
            return lliExport;
        });

    /**
     * CommonJS / Node.js support
     */
    } else if (typeof exports === "object") {

       /**
        * Support Node.js specific `module.exports` (which can be a function)
        */
        if (typeof module === "object" && typeof module.exports === "object") {
            exports = module.exports = lliExport;
        }

       /**
        * But always support CommonJS module 1.1.1 spec (`exports` cannot be a function)
        */
        exports.lli = lliExport;

    /**
     * Native JS export
     */
    } else {

        global.lli = lliExport;
    }

})(typeof window === "undefined" ? this : window);
