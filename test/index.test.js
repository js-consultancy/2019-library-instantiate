'use strict';

const assert = require('assert');
const { instantiate } = require('../index');

class TestOne {
	iAmOkay() {
		return true;
	}
}

class TestTwo {
	constructor(config) {
		this.prop = config.prop;
	}

	tellProp() {
		return this.prop;
	}
}

class TestThree {
	constructor(config, dependencies) {
		this.prop = config.prop;
		this.lib = dependencies.lib;
	}

	useLib() {
		return this.lib.use(this.prop);
	}
}

describe('The instantiation', () => {
	it('should instantiate the class', () => {
		const result = instantiate(TestOne)();
		assert(result);
		assert(result.iAmOkay());
		assert.deepStrictEqual(result.iAmOkay(), true);
	});

	it('should pass the constructor params', () => {
		const result = instantiate(TestTwo)({ prop: 'Hello World' });
		assert(result);
		assert(result.tellProp());
		assert.deepStrictEqual(result.tellProp(), 'Hello World');
	});

	it('Should use dependencies', () => {
		const result = instantiate(TestThree)({ prop: 'Something' }, { lib: { use: (x) => (x) }});
		assert(result);
		assert.deepStrictEqual(result.useLib(), 'Something');
	});
});
