var expect = require('expect.js'),
    qrcode = require('./../lib/main'),
    sinon = require('sinon');

describe('in the main module', function() {
    describe('the generate method', function () {
        describe('when not providing a callback', function () {
            it('logs to the console', function () {
                var consoleLogStub = sinon.stub(console, 'log');
                qrcode.generate('test');
                expect(consoleLogStub.called).to.be(true);
                consoleLogStub.restore();
            });
        });

        describe('when providing a callback', function () {
            it('will call the callback', function () {
                var cb = sinon.spy();
                qrcode.generate('test', cb);
                expect(cb.called).to.be(true);
            });

            it('will not call the console.log method', function () {
                var consoleLogStub = sinon.stub(console, 'log');
                qrcode.generate('test', sinon.spy());
                expect(consoleLogStub.called).to.be(false);
                consoleLogStub.restore();
            });
        });

        describe('the QR Code', function () {
            it('should be a string', function (done) {
                qrcode.generate('test', function(result) {
                    expect(result).to.be.a('string');
                    done();
                });
            });

            it('should not end with a newline', function (done) {
                qrcode.generate('test', function(result) {
                    expect(result).not.to.match(/\n$/);
                    done();
                });
            });
        });

        describe('the error level', function () {
            it('should default to 1', function() {
                expect(qrcode.error).to.be(1);
            });

            it('should not allow other levels', function() {
                qrcode.setErrorLevel = 'something';
                expect(qrcode.error).to.be(1);
            });
        });
    });
});
