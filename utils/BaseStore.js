/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = 'change';


/**
 * @class BaseStore
 * @extends EventEmitter
 */
var BaseStore = Object.create(EventEmitter.prototype);

/**
 * Creates a new instance
 * @param dispatcher The dispatcher interface
 * @constructor
 */
BaseStore.create = function create(dispatcher) {
    var obj = Object.create(this);
    obj.dispatcher = dispatcher;
    obj._hasChanged = false;
    if (obj.initialize) {
        obj.initialize();
    }

    return obj;
}

/**
 * Convenience method for getting the store context object.
 * @method getContext
 * @return {Object} Returns the store context object.
 */
BaseStore.getContext = function getContext() {
    return this.dispatcher.getContext();
};

/**
 * Add a listener for the change event
 * @method addChangeListener
 * @param {Function} callback
 */
BaseStore.addChangeListener = function addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
};

/**
 * Remove a listener for the change event
 * @method removeChangeListener
 * @param {Function} callback
 */
BaseStore.removeChangeListener = function removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
};

/**
 * Determines whether the store should dehydrate or not. By default, only dehydrates
 * if the store has emitted an update event. If no update has been emitted, it is assumed
 * that the store is in its default state and therefore does not need to dehydrate.
 * @method shouldDehydrate
 * @returns {boolean}
 */
BaseStore.shouldDehydrate = function shouldDehydrate() {
    return this._hasChanged;
};

/**
 * Emit a change event
 * @method emitChange
 * @param {*} param=this
 */
BaseStore.emitChange = function emitChange(param) {
    this._hasChanged = true;
    this.emit(CHANGE_EVENT, param || this);
};

module.exports = BaseStore;
