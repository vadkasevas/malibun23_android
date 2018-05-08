/**@property {number} submission_id
 * @property {string} product
 * @property {string} device
 * @property {object} version
 * @property {string} version.release
 * @property {number} version.int
 *
 * @property {object} screen
 * @property {number} screen.x
 * @property {number} screen.y
 *
 * @property {string} model
 *
 * @property {string} manufacturer
 * @property {string} hardware
 * */
AndroidDevicesModel = class AndroidDevicesModel extends MalibunModel{

};

AndroidDevices = new MalibunCollection('androidDevices',{modelClass:AndroidDevicesModel});
AndroidDevices.schema = new SimpleSchema({
    submission_id:{type:Number,label:'ID на сайте'},
    product:{type:String,label:''},
    device:{type:String,label:'Build.DEVICE'},
    
    'version.release':{type:String,label:'Версия андроид'},
    'version.int':{type:Number,label:'Версия api'},
    'screen.x':{type:Number,label:'Ширина экрана'},
    'screen.y':{type:Number,label:'Высота экрана'},
    
    'model':{type:String,label:'Build.MODEL'},
    manufacturer:{type:String,label:'Build.MANUFACTURER'},
    hardware:{type:String,label:'Build.HARDWARE'} ,
    useragent:{type:String,label:'http.agent'}
});
AndroidDevices.models = [];
if(Meteor.isServer){
    AndroidDevices._ensureIndex({'model': 1});

    AndroidDevices.models = AndroidDevices.find();

    AndroidDevices.random = function(){
        return _.sample(AndroidDevices.models);
    }
}