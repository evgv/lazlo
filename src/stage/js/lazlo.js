/**
 * lazlo v0.1.0
 * lazlo
 * https://github.com/evgv/lazlo
 *
 * Copyright 2017 Zubkov Eugene
 * Released under the MIT
 */

/**
 * Example
 * 
 * <img lazlo-src='//www.example.com/images/1.png' class='lazlo-img'/>
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
     * @throws {Error}  lazlo.js requires a `window` with a `document` object"
     * @param  {object} window
     */
    var factory = function (window) {


        
        /**
         * Check window object is exist
         */
        if (typeof window.document !== "object") {
            throw new Error("lazlo.js requires a `window` with a `document` object");
        }

        /**
         * Main instance
         */
        var lazlo = function() {

            /**
             * Load all ll images
             *
             * @returns {undefined}
             */
            this._load = function() {

                var self      = this,
                    imageList = document.getElementsByClassName("lazlo-img");

                Array.prototype.forEach.call(imageList, function(item) {    
                    item.setAttribute("src", item.getAttribute("lazlo-src"));
                });
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
        lazlo.initialize = function() {

            var self = new lazlo();
            
            document.addEventListener(document, "DOMContentLoaded");  //Dom parsing is finished
            document.addEventListener(window, "load"); //loading of all external stuff is done
            
            window.addEventListener("load", function() {
                self._load();
            }, false); 
        };

        /**
         * Return main instance
         */
        return lazlo;

    };

    /**
     * Create lazlo instance
     */
    var lazloExport = typeof global.document === "object" ? factory(global) : factory;


    /**
     * AMD support
     */
    if (typeof define === "function" && define.amd) {

        define(function () {
            return lazloExport;
        });

    /**
     * CommonJS / Node.js support
     */
    } else if (typeof exports === "object") {

       /**
        * Support Node.js specific `module.exports` (which can be a function)
        */
        if (typeof module === "object" && typeof module.exports === "object") {
            exports = module.exports = lazloExport;
        }

       /**
        * But always support CommonJS module 1.1.1 spec (`exports` cannot be a function)
        */
        exports.lazlo = lazloExport;

    /**
     * Native JS export
     */
    } else {

        global.lazlo = lazloExport;
    }

})(typeof window === "undefined" ? this : window);