var Api = require('../utils/api');
var Reflux = require('reflux');
var Actions = require('../actions');
var _ = require('lodash');


module.exports = Reflux.createStore({
    listenables: [Actions],
    
    getImages: function(topidId, offset) {
        return  Api.get('topics/'+topidId+'/viral/' + offset).then(function(json) {
            
            this.images = _.reject(json.data, function(image) { //close to 'yield' function to c#
                return image.is_album;
            });
            //console.log(json.data);
            this.triggerChange();
        }.bind(this));
    },
    
    find: function(id) {
       var image = _.find(this.images, {id: id});
        if(image) {
            //console.log('image found');
            return image;
        } else {
            this.getImage(id);
            //console.log('image NOT found');
            return null; 
        }
    },
    
    getImage: function(id) {
         return  Api.get('gallery/image/'+id).then(function(json) {
            
            if(this.images) {
                this.images.push(json.data);   
            } else {
                this.images = [json.data];   
            }

            this.triggerChange();
        }.bind(this));
    },
    
    triggerChange: function() {
        this.trigger('change', this.images);
    }
});
