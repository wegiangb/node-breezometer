'use strict'
const should    = require('should');
const sinon     = require('sinon');
const r         = require('random-js')();
const _         = require('underscore');
const moment    = require('moment');

describe('getHistoricalAirQuaility', ()=>{
    let sandbox = undefined;
    let client = undefined;
    let defaultsStub = undefined; 
    let sendStub = undefined;
    beforeEach((done)=>{
        sandbox = sinon.createSandbox();
        let request = require('request-promise-native');
        sendStub = sandbox.stub().resolves({statusCode:200, body:{}});
        defaultsStub = sandbox.stub(request, 'defaults').returns(sendStub);
        let breezometer   = require('../index.js');
        client = breezometer({ apiKey:'foobar' });
        done();
    });
    afterEach((done)=>{
        sandbox.restore();
        done();
    });
    describe('options callback', ()=>{
        it('undefined err', (done)=>{
            client.getHistoricalAirQuaility(undefined, (err)=>{
                should.exist(err);
                done();
            });
        });
        it('null err', (done)=>{
            client.getHistoricalAirQuaility(null, (err)=>{
                should.exist(err);
                done();
            });
        });
        it('not obj err', (done)=>{
            client.getHistoricalAirQuaility(99, (err)=>{
                should.exist(err);
                done();
            });
        });
    });
    describe('options promises', ()=>{
        it('undefined err', async ()=>{
            let threw = false;
            try {
                await client.getHistoricalAirQuaility(undefined);
            } catch (err){
                threw = true;
            }

            threw.should.equal(true);
        });
        it('null err', async ()=>{
            let threw = false;
            try {
                await client.getHistoricalAirQuaility(null);
            } catch (err){
                threw = true;
            }

            threw.should.equal(true);
        });
        it('not obj err', async ()=>{
            let threw = false;
            try {
                await client.getHistoricalAirQuaility(99);
            } catch (err){
                threw = true;
            }

            threw.should.equal(true);
        });
    });
    describe('lat callback', ()=>{
        it('undefined err', (done)=>{
            client.getHistoricalAirQuaility({
                lon: -89.392808,
                dateTime: new Date(Date.now() - 864000000)
            }, (err)=>{
                should.exist(err);
                done();
            });
        });
        it('null err', (done)=>{
            client.getHistoricalAirQuaility({
                lat:null,
                lon: -89.392808,
                dateTime: new Date(Date.now() - 864000000)
            }, (err)=>{
                should.exist(err);
                done();
            });
        });
        it('not number err', (done)=>{
            client.getHistoricalAirQuaility({
                lat:'foo',
                lon: -89.392808,
                dateTime: new Date(Date.now() - 864000000)
            }, (err)=>{
                should.exist(err);
                done();
            });
        });
        it('< -90 err', (done)=>{
            client.getHistoricalAirQuaility({
                lat:-91,
                lon: -89.392808,
                dateTime: new Date(Date.now() - 864000000)
            }, (err)=>{
                should.exist(err);
                done();
            });
        });
        it('> 90 err', (done)=>{
            client.getHistoricalAirQuaility({
                lat:91,
                lon: -89.392808,
                dateTime: new Date(Date.now() - 864000000)
            }, (err)=>{
                should.exist(err);
                done();
            });
        });
        it('string number', function(done){
            this.timeout(60000);
            client.getHistoricalAirQuaility({
                lat:'43.067475',
                lon: -89.392808,
                dateTime: new Date(Date.now() - 864000000)
            }, (err)=>{
                should.not.exist(err);
                sendStub.calledWith(sinon.match({ qs:{ lat: 43.067475 }  })).should.equal(true);
                done();
            });
        });
        it('matches', (done)=>{
            let lat = r.real(-90, 90, true);
            client.getHistoricalAirQuaility({
                lat:lat,
                lon: -89.392808,
                dateTime: new Date(Date.now() - 864000000)
            }, (err)=>{
                should.not.exist(err);
                sendStub.calledWith(sinon.match({ qs:{ lat: lat }  })).should.equal(true);
                done();
            });
        });
    });
    describe('lat promises', ()=>{
        it('undefined err', async ()=>{
            let threw = false;

            try {
                await client.getHistoricalAirQuaility({
                    lon: -89.392808,
                    dateTime: new Date(Date.now() - 864000000)
                });    
            } catch (err){
                threw = true;
            }
            threw.should.equal(true);
        });
        it('null err', async ()=>{
            let threw = false;

            try {
                await client.getHistoricalAirQuaility({
                    lat: null,
                    lon: -89.392808,
                    dateTime: new Date(Date.now() - 864000000)
                });    
            } catch (err){
                threw = true;
            }
            threw.should.equal(true);
        });
        it('not number err', async ()=>{
            let threw = false;

            try {
                await client.getHistoricalAirQuaility({
                    lat: 'foo',
                    lon: -89.392808,
                    dateTime: new Date(Date.now() - 864000000)
                });    
            } catch (err){
                threw = true;
            }
            threw.should.equal(true);
        });
        it('< -90 err', async ()=>{
            let threw = false;

            try {
                await client.getHistoricalAirQuaility({
                    lat: -91,
                    lon: -89.392808,
                    dateTime: new Date(Date.now() - 864000000)
                });    
            } catch (err){
                threw = true;
            }
            threw.should.equal(true);
        });
        it('> 90 err', async ()=>{
            let threw = false;

            try {
                await client.getHistoricalAirQuaility({
                    lat: 91,
                    lon: -89.392808,
                    dateTime: new Date(Date.now() - 864000000)
                });    
            } catch (err){
                threw = true;
            }
            threw.should.equal(true);
        });
        it('string number', async ()=>{
            await client.getHistoricalAirQuaility({
                lat:'43.067475',
                lon: -89.392808,
                dateTime: new Date(Date.now() - 864000000)
            });
            sendStub.calledWith(sinon.match({ qs:{ lat: 43.067475 }  })).should.equal(true);
        });
        it('matches', async ()=>{
            let lat = r.real(-90, 90, true);
            await client.getHistoricalAirQuaility({
                lat:lat,
                lon: -89.392808,
                dateTime: new Date(Date.now() - 864000000)
            });
            sendStub.calledWith(sinon.match({ qs:{ lat: lat }  })).should.equal(true);
        });
    });
    describe('lon callback', ()=>{
        it('undefined err', (done)=>{
            client.getHistoricalAirQuaility({
                lat: 43.067475,
                dateTime: new Date(Date.now() - 864000000)
            }, (err)=>{
                should.exist(err);
                done();
            });
        });
        it('null err', (done)=>{
            client.getHistoricalAirQuaility({
                lat: 43.067475,
                lon:null,
                dateTime: new Date(Date.now() - 864000000)
            }, (err)=>{
                should.exist(err);
                done();
            });
        });
        it('not number err', (done)=>{
            client.getHistoricalAirQuaility({
                lat: 43.067475,
                lon:'foo',
                dateTime: new Date(Date.now() - 864000000)
            }, (err)=>{
                should.exist(err);
                done();
            });
        });
        it('< -180 err', (done)=>{
            client.getHistoricalAirQuaility({
                lat: 43.067475,
                lon: -181,
                dateTime: new Date(Date.now() - 864000000)
            }, (err)=>{
                should.exist(err);
                done();
            });
        });
        it('> 180 err', (done)=>{
            client.getHistoricalAirQuaility({
                lat: 43.067475,
                lon: 181,
                dateTime: new Date(Date.now() - 864000000)
            }, (err)=>{
                should.exist(err);
                done();
            });
        });
        it('string number', (done)=>{
            client.getHistoricalAirQuaility({
                lat:43.067475,
                lon: '-89.392808',
                dateTime: new Date(Date.now() - 864000000)
            }, (err)=>{
                should.not.exist(err);
                sendStub.calledWith(sinon.match({ qs:{ lon: -89.392808 }  })).should.equal(true);
                done();
            });
        });
        it('matches', (done)=>{
            let lon = r.real(-90, 90, true);
            client.getHistoricalAirQuaility({
                lat:43.067475,
                lon: lon,
                dateTime: new Date(Date.now() - 864000000)
            }, (err)=>{
                should.not.exist(err);
                sendStub.calledWith(sinon.match({ qs:{ lon: lon }  })).should.equal(true);
                done();
            });
        });
    });
    describe('lon promises', ()=>{
        it('undefined err', async ()=>{
            let threw = false;
            try {
                await client.getHistoricalAirQuaility({
                    lat: 43.067475,
                    dateTime: new Date(Date.now() - 864000000)
                });
            } catch (err){
                threw = true;
            }
            threw.should.equal(true);
        });
        it('null err', async ()=>{
            let threw = false;
            try {
                await client.getHistoricalAirQuaility({
                    lat: 43.067475,
                    lon: null,
                    dateTime: new Date(Date.now() - 864000000)
                });
            } catch (err){
                threw = true;
            }
            threw.should.equal(true);
        });
        it('not number err', async ()=>{
            let threw = false;
            try {
                await client.getHistoricalAirQuaility({
                    lat: 43.067475,
                    lon: 'foo',
                    dateTime: new Date(Date.now() - 864000000)
                });
            } catch (err){
                threw = true;
            }
            threw.should.equal(true);
        });
        it('< -180 err', async ()=>{
            let threw = false;
            try {
                await client.getHistoricalAirQuaility({
                    lat: 43.067475,
                    lon: -181,
                    dateTime: new Date(Date.now() - 864000000)
                });
            } catch (err){
                threw = true;
            }
            threw.should.equal(true);
        });
        it('> 180 err', async ()=>{
            let threw = false;
            try {
                await client.getHistoricalAirQuaility({
                    lat: 43.067475,
                    lon: 181,
                    dateTime: new Date(Date.now() - 864000000)
                });
            } catch (err){
                threw = true;
            }
            threw.should.equal(true);
        });
        it('string number', async ()=>{
            await client.getHistoricalAirQuaility({
                lat:43.067475,
                lon: '-89.392808',
                dateTime: new Date(Date.now() - 864000000)
            });
            sendStub.calledWith(sinon.match({ qs:{ lon: -89.392808 }  })).should.equal(true);
        });
        it('matches', async ()=>{
            let lon = r.real(-90, 90, true);
            await client.getHistoricalAirQuaility({
                lat:43.067475,
                lon: lon,
                dateTime: new Date(Date.now() - 864000000)
            });
            sendStub.calledWith(sinon.match({ qs:{ lon: lon }  })).should.equal(true);
        });
    });
    describe('dateTime callback', ()=>{
        it('future err', (done)=>{
            client.getHistoricalAirQuaility({
                lat:43.067475,
                lon: -89.392808,
                dateTime: new Date(Date.now() + 864000000)
            }, (err)=>{
                should.exist(err);
                done();
            });
        });
        it('not date err', (done)=>{
            client.getHistoricalAirQuaility({
                lat:43.067475,
                lon: -89.392808,
                dateTime: 'foo'
            }, (err)=>{
                should.exist(err);
                done();
            });
        });
        it('undefined & range undefined err', (done)=>{
            client.getHistoricalAirQuaility({
                lat:43.067475,
                lon: -89.392808
            }, (err)=>{
                should.exist(err);
                done();
            });
        });
        it('set & ranges set err', (done)=>{
            client.getHistoricalAirQuaility({
                lat:43.067475,
                lon: -89.392808,
                dateTime: new Date(Date.now() + 864000000),
                startDate: new Date(Date.now() + 864000000),
                endDate: new Date(Date.now() + 864000000)
            }, (err)=>{
                should.exist(err);
                done();
            });
        });
        it('matches', (done)=>{
            let dateTime = moment.utc().subtract(r.integer(60000, 864000000), 'millisecond').endOf('minute').toDate();
            client.getHistoricalAirQuaility({
                lat:43.067475,
                lon: -89.392808,
                dateTime: dateTime
            }, (err)=>{
                should.not.exist(err);
                sendStub.calledWith(sinon.match({ qs:{ datetime: moment.utc(dateTime).format("YYYY-MM-DDTHH:mm:ss") }  })).should.equal(true);
                done();
            });
        });
    });
    describe('dateTime promises', ()=>{
        it('future err', async ()=>{
            let threw = false;

            try {
                await client.getHistoricalAirQuaility({
                    lat:43.067475,
                    lon: -89.392808,
                    dateTime: new Date(Date.now() + 864000000)
                });
            } catch (err){
                threw = true;
            }

            threw.should.equal(true);
        });
        it('not date err', async ()=>{
            let threw = false;

            try {
                await client.getHistoricalAirQuaility({
                    lat:43.067475,
                    lon: -89.392808,
                    dateTime: 'foo'
                });
            } catch (err){
                threw = true;
            }

            threw.should.equal(true);
        });
        it('undefined & range undefined err', async ()=>{
            let threw = false;

            try {
                await client.getHistoricalAirQuaility({
                    lat:43.067475,
                    lon: -89.392808
                });
            } catch (err){
                threw = true;
            }

            threw.should.equal(true);
        });
        it('set & ranges set err', async ()=>{
            let threw = false;

            try {
                await client.getHistoricalAirQuaility({
                    lat:43.067475,
                    lon: -89.392808,
                    dateTime: new Date(Date.now() + 864000000),
                    startDate: new Date(Date.now() + 864000000),
                    endDate: new Date(Date.now() + 864000000)
                });
            } catch (err){
                threw = true;
            }
            threw.should.equal(true);
        });
        it('matches', async ()=>{
            let dateTime = moment.utc().subtract(r.integer(60000, 864000000), 'millisecond').endOf('minute').toDate();
            await client.getHistoricalAirQuaility({
                lat:43.067475,
                lon: -89.392808,
                dateTime: dateTime
            });
            sendStub.calledWith(sinon.match({ qs:{ datetime: moment.utc(dateTime).format("YYYY-MM-DDTHH:mm:ss") }  })).should.equal(true);
        });
    });
    describe('startDate callback', ()=>{
        it('future err', (done)=>{
            client.getHistoricalAirQuaility({
                lat:43.067475,
                lon: -89.392808,
                startDate: new Date(Date.now() + 60000),
                endDate: new Date(Date.now() - 60000)
            }, (err)=>{
                should.exist(err);
                done();
            });
        });
        it('not date err', (done)=>{
            client.getHistoricalAirQuaility({
                lat:43.067475,
                lon: -89.392808,
                startDate: 'foo',
                endDate: new Date(Date.now() - 60000)
            }, (err)=>{
                should.exist(err);
                done();
            });
        });
        it('undefined & endDate set', (done)=>{
            client.getHistoricalAirQuaility({
                lat:43.067475,
                lon: -89.392808,
                endDate: new Date(Date.now() - 60000)
            }, (err)=>{
                should.exist(err);
                done();
            });
        });
        it('set & dateTime set', (done)=>{
            client.getHistoricalAirQuaility({
                lat:43.067475,
                lon: -89.392808,
                dateTime: new Date(Date.now() - 120000),
                startDate: new Date(Date.now() - 120000),
                endDate: new Date(Date.now() - 60000)
            }, (err)=>{
                should.exist(err);
                done();
            });
        });
        it('matches', (done)=>{
            let startDate = moment.utc().subtract(r.integer(60000, 864000000), 'millisecond').startOf('minute').toDate();
            client.getHistoricalAirQuaility({
                lat:43.067475,
                lon: -89.392808,
                startDate: startDate,
                endDate: new Date(startDate.getTime() + 1)
            }, (err)=>{
                should.not.exist(err);
                sendStub.calledWith(sinon.match({ qs:{ start_datetime: moment.utc(startDate).format("YYYY-MM-DDTHH:mm:ss") }  })).should.equal(true);
                done();
            });
        });
    });
    describe('startDate promises', ()=>{
        it('future err', async ()=>{
            let threw = false;

            try {
                await client.getHistoricalAirQuaility({
                    lat:43.067475,
                    lon: -89.392808,
                    startDate: new Date(Date.now() + 60000),
                    endDate: new Date(Date.now() - 60000)
                });
            } catch (err){
                threw = true;
            }
            threw.should.equal(true);
        });
        it('not date err', async ()=>{
            let threw = false;

            try {
                await client.getHistoricalAirQuaility({
                    lat:43.067475,
                    lon: -89.392808,
                    startDate: 'foo',
                    endDate: new Date(Date.now() - 60000)
                });
            } catch (err){
                threw = true;
            }
            threw.should.equal(true);
        });
        it('undefined & endDate set', async ()=>{
            let threw = false;

            try {
                await client.getHistoricalAirQuaility({
                    lat:43.067475,
                    lon: -89.392808,
                    endDate: new Date(Date.now() - 60000)
                });
            } catch (err){
                threw = true;
            }
            threw.should.equal(true);
        });
        it('set & dateTime set', async ()=>{
            let threw = false;

            try {
                await client.getHistoricalAirQuaility({
                    lat:43.067475,
                    lon: -89.392808,
                    dateTime: new Date(Date.now() - 120000),
                    startDate: new Date(Date.now() - 120000),
                    endDate: new Date(Date.now() - 60000)
                });
            } catch (err){
                threw = true;
            }
            threw.should.equal(true);
        });
        it('matches', async ()=>{
            let startDate = moment.utc().subtract(r.integer(60000, 864000000), 'millisecond').startOf('minute').toDate();
            await client.getHistoricalAirQuaility({
                lat:43.067475,
                lon: -89.392808,
                startDate: startDate,
                endDate: new Date(startDate.getTime() + 1)
            });
            sendStub.calledWith(sinon.match({ qs:{ start_datetime: moment.utc(startDate).format("YYYY-MM-DDTHH:mm:ss") }  })).should.equal(true);
        });
    });
    describe('endDate callback', ()=>{
        it('future err', (done)=>{
            client.getHistoricalAirQuaility({
                lat:43.067475,
                lon: -89.392808,
                startDate: new Date(Date.now() - 60000),
                endDate: new Date(Date.now() + 60000)
            }, (err)=>{
                should.exist(err);
                done();
            });
        });
        it('not date err', (done)=>{
            client.getHistoricalAirQuaility({
                lat:43.067475,
                lon: -89.392808,
                startDate: new Date(Date.now() - 60000),
                endDate: 'foo'
            }, (err)=>{
                should.exist(err);
                done();
            });
        });
        it('undefined & startDate set', (done)=>{
            client.getHistoricalAirQuaility({
                lat:43.067475,
                lon: -89.392808,
                startDate: new Date(Date.now() - 60000)
            }, (err)=>{
                should.exist(err);
                done();
            });
        });
        it('set & dateTime set', (done)=>{
            client.getHistoricalAirQuaility({
                lat:43.067475,
                lon: -89.392808,
                dateTime: new Date(Date.now() - 120000),
                startDate: new Date(Date.now() - 120000),
                endDate: new Date(Date.now() - 60000)
            }, (err)=>{
                should.exist(err);
                done();
            });
        });
        it('matches', (done)=>{
            let endDate = moment.utc().subtract(r.integer(60000, 864000000), 'millisecond').endOf('minute').toDate();
            client.getHistoricalAirQuaility({
                lat:43.067475,
                lon: -89.392808,
                startDate: new Date(endDate.getTime() - 1),
                endDate: endDate
            }, (err)=>{
                should.not.exist(err);
                sendStub.calledWith(sinon.match({ qs:{ end_datetime: moment.utc(endDate).format("YYYY-MM-DDTHH:mm:ss") }  })).should.equal(true);
                done();
            });
        });
    });
    describe('endDate promises', ()=>{
        it('future err', async ()=>{
            let threw = false;
            try {
                await client.getHistoricalAirQuaility({
                    lat:43.067475,
                    lon: -89.392808,
                    startDate: new Date(Date.now() - 60000),
                    endDate: new Date(Date.now() + 60000)
                });
            } catch (err){
                threw = true;
            }

            threw.should.equal(true);
        });
        it('not date err', async ()=>{
            let threw = false;
            try {
                await client.getHistoricalAirQuaility({
                    lat:43.067475,
                    lon: -89.392808,
                    startDate: new Date(Date.now() - 60000),
                    endDate: 'foo'
                });
            } catch (err){
                threw = true;
            }

            threw.should.equal(true);
        });
        it('undefined & startDate set', async ()=>{
            let threw = false;
            try {
                await client.getHistoricalAirQuaility({
                    lat:43.067475,
                    lon: -89.392808,
                    startDate: new Date(Date.now() - 60000)
                });
            } catch (err){
                threw = true;
            }

            threw.should.equal(true);
        });
        it('set & dateTime set', async ()=>{
            let threw = false;
            try {
                await client.getHistoricalAirQuaility({
                    lat:43.067475,
                    lon: -89.392808,
                    dateTime: new Date(Date.now() - 120000),
                    startDate: new Date(Date.now() - 120000),
                    endDate: new Date(Date.now() - 60000)
                });
            } catch (err){
                threw = true;
            }

            threw.should.equal(true);
        });
        it('matches', async ()=>{
            let endDate = moment.utc().subtract(r.integer(60000, 864000000), 'millisecond').endOf('minute').toDate();
            await client.getHistoricalAirQuaility({
                lat:43.067475,
                lon: -89.392808,
                startDate: new Date(endDate.getTime() - 1),
                endDate: endDate
            });
            sendStub.calledWith(sinon.match({ qs:{ end_datetime: moment.utc(endDate).format("YYYY-MM-DDTHH:mm:ss") }  })).should.equal(true);
        });
    });
    describe('interval callback', ()=>{
        it('not a number err', (done)=>{
            client.getHistoricalAirQuaility({
                lat:43.067475,
                lon: -89.392808,
                startDate: new Date(Date.now() - 60000),
                endDate: new Date(Date.now() - 60000),
                interval: 'foo'
            }, (err)=>{
                should.exist(err);
                done();
            });
        });
        it('included w/o range err', (done)=>{
            client.getHistoricalAirQuaility({
                lat:43.067475,
                lon: -89.392808,
                dateTime: new Date(Date.now() - 60000),
                interval: 1
            }, (err)=>{
                should.exist(err);
                done();
            });
        });
        it('matches', (done)=>{
            let interval = r.integer(1, 24);
            client.getHistoricalAirQuaility({
                lat:43.067475,
                lon: -89.392808,
                startDate: new Date(Date.now() - 60000),
                endDate: new Date(Date.now() - 60000),
                interval: interval
            }, (err)=>{
                should.not.exist(err);
                sendStub.calledWith(sinon.match({ qs:{ interval: interval }  })).should.equal(true);
                done();
            });
        });
    });
    describe('interval promises', ()=>{
        it('not a number err', async ()=>{
            let threw = false;
            
            try {
                await client.getHistoricalAirQuaility({
                    lat:43.067475,
                    lon: -89.392808,
                    startDate: new Date(Date.now() - 60000),
                    endDate: new Date(Date.now() - 60000),
                    interval: 'foo'
                });
            } catch (err){
                threw = true;
            }

            threw.should.equal(true);
        });
        it('included w/o range err', async ()=>{
            let threw = false;
            try {
                await client.getHistoricalAirQuaility({
                    lat:43.067475,
                    lon: -89.392808,
                    dateTime: new Date(Date.now() - 60000),
                    interval: 1
                });
            } catch (err){
                threw = true;
            }

            threw.should.equal(true);
        });
        it('matches', async ()=>{
            let interval = r.integer(1, 24);
            await client.getHistoricalAirQuaility({
                lat:43.067475,
                lon: -89.392808,
                startDate: new Date(Date.now() - 60000),
                endDate: new Date(Date.now() - 60000),
                interval: interval
            });
            sendStub.calledWith(sinon.match({ qs:{ interval: interval }  })).should.equal(true);
        });
    });
    describe('lang callback', ()=>{
        it('undefined works', (done)=>{
            client.getHistoricalAirQuaility({
                lat:43.067475,
                lon: -89.392808,
                dateTime: new Date(Date.now() - 864000000)
            }, (err)=>{
                should.not.exist(err);
                sendStub.calledOnce.should.equal(true);
                done();
            });
        });
        it('invalid err', (done)=>{
            client.getHistoricalAirQuaility({
                lat:43.067475, 
                lon: -89.392808, 
                lang:'foo',
                dateTime: new Date(Date.now() - 864000000)
            }, (err)=>{
                should.exist(err);
                done();
            });
        });
        it('matches', (done)=>{
            let lang = _.sample(['en','he']);
            client.getHistoricalAirQuaility({lat:43.067475, lon: -89.392808, lang:lang, dateTime: new Date(Date.now() - 864000000)}, (err)=>{
                should.not.exist(err);
                sendStub.calledWith(sinon.match({ qs:{ lang: lang }  })).should.equal(true);
                done();
            });
        });
    });
    describe('lang promises', ()=>{
        it('undefined works', async ()=>{
            await client.getHistoricalAirQuaility({
                lat:43.067475,
                lon: -89.392808,
                dateTime: new Date(Date.now() - 864000000)
            });
            sendStub.calledOnce.should.equal(true);
        });
        it('invalid err', async ()=>{
            let threw = true;

            try {
                await client.getHistoricalAirQuaility({
                    lat:43.067475, 
                    lon: -89.392808, 
                    lang:'foo',
                    dateTime: new Date(Date.now() - 864000000)
                });
            } catch (err){
                threw = true;
            }
            threw.should.equal(true);
        });
        it('matches', async function(){
            let lang = _.sample(['en','he']);
            await client.getHistoricalAirQuaility({lat:43.067475, lon: -89.392808, lang:lang, dateTime: new Date(Date.now() - 864000000)});
            sendStub.calledWith(sinon.match({ qs:{ lang: lang }  })).should.equal(true);
        });
    });
});