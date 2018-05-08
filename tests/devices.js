import { assert } from 'meteor/practicalmeteor:chai';

describe('Devices',()=>{
    beforeEach(() => {});
    afterEach(() => {});

    it(`Устройства должны быть проимпортированы`, function(done){
        this.timeout(20000);
        Meteor.setTimeout(function(){
            var count = AndroidDevices.find({}).count();
            if(count==0){
                done(new Error('Не найдено устройств'));
            }
            return done();
        },10000);
    });
});