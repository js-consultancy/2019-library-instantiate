'use strict';

module.exports.instantiate = (clazz) => {
	return (...args) => {
		return Reflect.construct(clazz, args);
	}
}
