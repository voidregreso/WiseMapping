/*
 *    Copyright [2012] [wisemapping]
 *
 *   Licensed under WiseMapping Public License, Version 1.0 (the "License").
 *   It is basically the Apache License, Version 2.0 (the "License") plus the
 *   "powered by wisemapping" text requirement on every single page;
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the license at
 *
 *       http://www.wisemapping.org/license
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */

mindplot.widget.image.MyImagesTab = new Class({
    Extends: mindplot.widget.image.AbstractTab,

    initialize: function(model, tabId, active) {
        this.dataImages = [];
        var i = 0;
        for (i; i< 20; i++) {
            var item = {
                id: i,
                src: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRMB3Sqwp80tLFb8uRhn0Qpfu0gwIBYbWb4zoySObEA37r30VgxRg"
            }
            this.dataImages.push(item);
        }
        this.parent(model, $msg("GALLERY"), tabId, active);
    },

    _buildContent: function() {
        var form = $('<form action="none" id="imageFormId"></form>');
        // Add Text
        form.append($('<p style="margin: 1em"></p>').text($msg("SELECT_IMAGE")));

        form.append(this._createGallery());
        return form;
    },
    
    submitData: function(){
        this.model.setValue(inputValue, resizeTopicImg,"url");

    },

    _createGallery: function() {
        var gallery = $('<div class="row"></div>');
        var me = this;
        _.each(me.dataImages,function(value) {
            gallery.append(me._createThumbnail(value));
        });
        return gallery;
    },

    _createThumbnail: function(value){
        var container = $('<div class="col-xs-6 col-md-3"></div>');
        var thumbnail = $('<a href="#" class="thumbnail"></a>');
        var img = $('<img>');
        img.attr('id',value.id);
        img.prop('src', value.src);
        thumbnail.append(img);
        container.append(thumbnail);
        return container;
    }
});