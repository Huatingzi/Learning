describe('utility', function () {

    describe('noConflict', function () {
        it('can correct releace underscore', function () {
            var old = _;
            var underscore = _.noConflict();
            expect(_).toEqual(void 0);
            expect(underscore).toBe(old);
            _ = underscore;
        });

    });

    describe('noop', function () {
        it('should always return undefined', function () {
            expect(_.noop('curly', 'larry', 'moe')).toBe(void 0);
        });
    });

    describe('identity', function () {
        it('should always return self', function () {
            expect(_.identity('curly')).toBe('curly');
        });
    });

    describe('constant', function () {
        it('should always return constant', function () {
            var a = _.constant("test");
            expect(a()).toBe('test');
        });
    });

    describe('times', function () {
        it('collects return values', function () {
            expect([0, 1, 2]).toEqual(_.times(3, function (i) {
                return i;
            }));
        });
        it('can handle 0 time ', function () {
            expect(_.times(0, _.identity)).toEqual([]);
        });

        it('can handle negate time ', function () {
            expect(_.times(-1, _.identity)).toEqual([]);
        });
    });


    describe('random', function () {
        var array = _.range(1000);
        var min = Math.pow(2, 31);
        var max = Math.pow(2, 62);

        it('should produce a random number greater than or equal to the minimum number', function () {
            var result = _.every(array, function () {
                return _.random(min, max) >= min;
            });
            expect(result).toBe(true);
        });

        it('should has random 5 or 0 one thousand times', function () {
            var result1 = _.some(array, function () {
                var randomNum = _.random(0, 5);
                return randomNum == 5;
            });
            var result2 = _.some(array, function () {
                var randomNum = _.random(0, 5);
                return randomNum == 0;
            });
            expect(result1 && result2).toBe(true);
        });

        it('should produce a random number when passed `Number.MAX_VALUE', function () {
            var result = _.some(array, function () {
                return _.random(Number.MAX_VALUE) > 0;
            });
            expect(result).toBe(true);
        });
    });

    describe('mixin', function () {
        it('mixed in a function to _', function () {
            _.mixin({
                myReverse: function (string) {
                    return string.split('').reverse().join('');
                }
            });
            expect(_.myReverse('panacea')).toEqual('aecanap');
        });
    });

    describe('iteratee', function () {
        it('correct handle', function () {
            var stooges = [{name: 'curly', age: 25}, {name: 'moe', age: 21}, {name: 'larry', age: 23}];
            expect(_.map(stooges, _.iteratee('age'))).toEqual([25, 21, 23]);
        });
    });


    describe('uniqueId', function () {
        it('can generate a globally-unique stream of ids', function () {
            var ids = [], i = 0;
            while (i++ < 100) ids.push(_.uniqueId());
            expect(_.uniq(ids).length).toBe(ids.length);
        });
    });

    describe('escape', function () {
        it('can handle null', function () {
            expect(_.escape(null)).toEqual('');
        });
    });

    describe('now', function () {
        it('Produces the correct time in milliseconds',function () {
            var diff = _.now() - new Date().getTime();
            expect(diff <= 0 && diff > -5).toBe(true);
        });
    });

    describe('escape', function () {
        it('don\'t unescape unnecessarily', function () {
            var string = 'Curly & Moe';
            expect(_.unescape(_.escape(string))).toEqual(string);
            expect(_.unescape(string)).toEqual(string);
        });

        it('can handles & aka &amp;', function () {
            var str = 'some string & another string & yet another';
            var escaped = _.escape(str);
            expect(escaped.indexOf('&amp') !== -1).toBe(true);
            expect(_.unescape(str)).toEqual(str);
        });
    });
});