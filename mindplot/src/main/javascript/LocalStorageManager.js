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

mindplot.LocalStorageManager = new Class({
        Extends:mindplot.PersistenceManager,
        initialize:function (documentUrl) {
            this.parent();
            this.documentUrl = documentUrl;
        },

        saveMapXml:function (mapId, mapXml, pref, saveHistory, events) {
            localStorage.setItem(mapId + "-xml", mapXml);
        },

        discardChanges:function (mapId) {
            localStorage.removeItem(mapId + "-xml");
        },

        loadMapDom:function (mapId) {
            var xml = localStorage.getItem(mapId + "-xml");
            if (xml == null) {
                var xmlRequest = new Request({
                    url:this.documentUrl.replace("{id}", mapId),
                    headers:{"Content-Type":"text/plain","Accept":"application/xml"},
                    method:'get',
                    async:false,
                    onSuccess:function (responseText) {
                        xml = responseText;
                    }
                });
                xmlRequest.send();

                // If I could not load it from a file, hard code one.
                if (xml == null) {
                    throw new Error("Map could not be loaded");
                }
            }

            var parser = new DOMParser();
            return  parser.parseFromString(xml, "text/xml");
        },

        unlockMap:function (mindmap) {
            // Ignore, no implementation required ...
        }
    }
);


