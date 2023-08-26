/**
* @license Apache-2.0
*
* Copyright (c) 2023 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var resolve = require( 'path' ).resolve;
var bench = require( '@stdlib/bench' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var filled2dBy = require( '@stdlib/array/base/filled2d-by' );
var unary2d = require( '@stdlib/array/base/unary2d' );
var zeros2d = require( '@stdlib/array/base/zeros2d' );
var array = require( '@stdlib/ndarray/array' );
var uniform = require( '@stdlib/random/base/uniform' ).factory;
var base = require( '@stdlib/math/base/special/abs' );
var abs = require( '@stdlib/math/special/abs' );
var tryRequire = require( '@stdlib/utils/try-require' );
var pkg = require( './../package.json' ).name;


// VARIABLES //

var mathjs = tryRequire( resolve( __dirname, '..', 'node_modules', 'mathjs' ) );
var opts = {
	'skip': ( mathjs instanceof Error )
};


// MAIN //

bench( pkg+'::stdlib:math/special/abs:value=ndarray,dtype=generic,size=100,shape=(10,10)', opts, function benchmark( b ) {
	var x;
	var y;
	var i;

	x = array( filled2dBy( [ 10, 10 ], uniform( -100.0, 100.0 ) ), {
		'dtype': 'generic'
	});

	b.tic();
	for ( i = 0; i < b.iterations; i++ ) {
		y = abs( x );
		if ( typeof y !== 'object' ) {
			b.fail( 'should return an object' );
		}
	}
	b.toc();
	if ( isnan( y.get( 0, 0 ) ) || isnan( y.get( 9, 9 ) ) ) {
		b.fail( 'should not return NaN' );
	}
	b.pass( 'benchmark finished' );
	b.end();
});

bench( pkg+'::stdlib:array/base/unary2d:value=nested_array,dtype=generic,size=100,shape=(10,10)', opts, function benchmark( b ) {
	var sh;
	var x;
	var y;
	var i;

	sh = [ 10, 10 ];
	x = filled2dBy( sh, uniform( -100.0, 100.0 ) );

	b.tic();
	for ( i = 0; i < b.iterations; i++ ) {
		y = zeros2d( sh );
		unary2d( [ x, y ], sh, base );
		if ( isnan( y[ 0 ][ 0 ] ) || isnan( y[ 9 ][ 9 ] ) ) {
			b.fail( 'should not return NaN' );
		}
	}
	b.toc();
	if ( isnan( y[ 1 ][ 1 ] ) || isnan( y[ 8 ][ 8 ] ) ) {
		b.fail( 'should not return NaN' );
	}
	b.pass( 'benchmark finished' );
	b.end();
});

bench( pkg+'::mathjs:abs:value=matrix,dtype=generic,size=100,shape=(10,10)', opts, function benchmark( b ) {
	var x;
	var y;
	var i;

	x = mathjs.matrix( filled2dBy( [ 10, 10 ], uniform( -100.0, 100.0 ) ) );

	b.tic();
	for ( i = 0; i < b.iterations; i++ ) {
		y = mathjs.abs( x );
		if ( typeof y !== 'object' ) {
			b.fail( 'should return an object' );
		}
	}
	b.toc();
	if ( isnan( y.get( [ 0, 0 ] ) ) || isnan( y.get( [ 9, 9 ] ) ) ) {
		b.fail( 'should not return NaN' );
	}
	b.pass( 'benchmark finished' );
	b.end();
});
