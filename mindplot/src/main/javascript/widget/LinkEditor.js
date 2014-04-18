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

mindplot.widget.LinkEditor = new Class({
    Extends:BootstrapDialog,

    initialize:function (model) {
        $assert(model, "model can not be null");
        this.parent($msg("LINK"), {
            cancelButton: true,
            closeButton: true,
            acceptButton: true,
            removeButton: true
        });
        this._model = model;
        var panel = this._buildPanel(model);
        this.setContent(panel);
    },

    _buildPanel:function (model) {
        var result = $('<div></div>').css("padding-top", "5px");
        var form = $('<form></form>').attr({
            'action':'none',
            'id':'linkFormId'
        });
        var text = $('<p></p>').text("Paste your url here:");
        text.css('margin','0px 0px 10px');

        form.append(text);

        // Add Input

        var input = $('<input>').attr({
            'placeholder':'http://www.example.com/',
            'type':'url', //FIXME: THIS not work on IE, see workaround below
            'required':'true',
            'autofocus':'autofocus'
        });
        input.css('width','70%').css('margin','0px 20px');

        if (model.getValue() != null){
            input.val(model.getValue());
        }
//            type:Browser.ie ? 'text' : 'url', // IE workaround

        // Open Button
        var open = $('<input/>').attr({
                'type':'button',
                'value':$msg('OPEN_LINK')
        });

        open.click(function(){
            alert('clicked!');
        });

        form.append(input);
        form.append(open);

        $(document).ready(function () {
            var me = this;
            $(document).on('submit','#linkFormId',function (event) {
                event.stopPropagation();
                event.preventDefault();
                var inputValue = input.val();
                if (inputValue != null && inputValue.trim() != "") {
                    model.setValue(inputValue);
                }
                me.close();
            });

        });

        if (typeof model.getValue() != 'undefined'){
            this.showRemoveButton();
        }

        result.append(form);
        return result;
    },

    onAcceptClick: function() {
        $("#linkFormId").submit();
    },

    onRemoveClick: function() {
        this._model.setValue(null);
        this.close();
    },

    hideRemoveButton:function(){
        this.parent();
    },

    close:function () {
        this.parent();
    }
});
