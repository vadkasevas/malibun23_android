if(Meteor.isServer){
    var devices = JSON.parse( Assets.getText('server/devices.json') );

    _.each(devices,(device)=>{
       if(!AndroidDevices.findOne({model:device.model})){
           AndroidDevices.insert(device);
       }
    });

}
