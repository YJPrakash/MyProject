(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            global.moment = factory()
}(this, function () {
    'use strict';
    var global = window;
    global.doc = document;
    global.rootPanel = doc.body;

    var docFrame = doc.createElement('iframe');
    doc.body.appendChild(docFrame);
    docFrame.style["visibility"] = "hidden";
    docFrame.style["height"] = "0";
    docFrame.style["width"] = "0";
    docFrame.style["display"] = "none";
    docFrame.onload = function(){
        // console.log(docFrame.contentWindow.document)
        var domObj = docFrame.contentWindow.document;
        var uiObj = domObj.querySelector("uibinder").cloneNode(true); 
        JS[uiObj.getAttribute("id")] = JS.createUi(uiObj);
        var panel = JS[uiObj.getAttribute("id")]
        // console.log(panel)
        var contentPanelScript = JS.contentPanel.querySelector('script');
        panel.removeChild(contentPanelScript);
        contentPanelScript.type = "text/javascript";
        doc.body.appendChild(panel);
        panel.style.display = "block";
        var script = doc.createElement('script');
        script.type = "text/javascript";
        script.innerText = contentPanelScript.textContent;
        doc.head.appendChild(script);
        doc.head.removeChild(script)

        document.body.appendChild(panel);
        // panel.footer.style.margin = "0 auto";
        // panel.footer.style.textAlign = "center";
        // panel.footer.innerText = "&copy; 2018 All rights reserved. JS Tool Kit."
    }
    docFrame.src = "uibinder/contentPanel.html";

    function setProperty(_proto, tagName) {
        var obj = (_prpoperties[tagName] === undefined) ? _prpoperties["TextBox"] : _prpoperties[tagName];
        Object.keys(obj).map(function (key) {
            Object.defineProperty(_proto, key, obj[key]);
        });
    }

    global.JS = {
        createUiBase: function (obj) {
            var hasUiBase = obj.querySelectorAll("*[ui-base]").length;
            var uiBase = obj.querySelectorAll("*[ui-base]");
            for (var j = 0; j < hasUiBase; j++) {
                var el = JS.createUi(uiBase[j].getAttribute("ui-base"));
                uiBase[j].append(el);
            }
            return obj;
        },
        createUiField: function (obj, isCreateUiBase, tagName) {
            var uiField = obj.querySelectorAll("*[ui-field]");
            var hasUiField = uiField.length;
            for (var j = 0; j < hasUiField; j++) {
                obj[uiField[j].getAttribute("ui-field")] = uiField[j];
            }
            return (isCreateUiBase !== false) ? this.createUiBase(obj) : obj;
        },
        createUi: function (obj, tagName) {
            // var elements1 = JS.layoutPanel.elements
            // var domStr = elements1["domStr"];
            // var domObj = elements1["domObj"];
            // var obj = domObj.body.querySelector("uibinder").cloneNode(true);
            obj = this.createUiField(obj, true, tagName);
            var _proto = obj;
            // setProperty(_proto, tagName);
            return obj;
        },
        layoutPanel: {
            "elements": {
                url: "./uibinder/Elements.html",
                type: "uidata"
            },
            "contentPanel": {
                url: "./uibinder/contentPanel.html",
                type: "uibinder"
            },
        },
        createUiString: function (panel, domObj) {
            var elements = JS.layoutPanel[panel];
            var nodes = domObj.childNodes;
            for (var i = 0; i < nodes.length; i++) {
                if (nodes[i].nodeName == "#text" || nodes[i].nodeName == "#comment") {

                } else {
                    elements[nodes[i].nodeName] = nodes[i].outerHTML;
                    // console.log(nodes[i].outerHTML);
                }

            }
        },
        UiBinder: function (panel) {
            var url = JS.layoutPanel[panel].url;
            var type = JS.layoutPanel[panel].type;
            var ui_obj = new JSDOMParser(), ui_obj1 = {};
            if (JS.layoutPanel[panel] !== undefined) {
                JS.layoutPanel[panel]["domStr"] = ui_obj.getDOMString(url, "text/html", panel);
                var domStr = JS.layoutPanel[panel].domStr;
                JS.layoutPanel[panel]["domObj"] = ui_obj.getDOMObject(domStr);
                var domObj = JS.layoutPanel[panel].domObj;
            } else {
            }

            if (type == "uibinder") {
                ui_obj1 = domObj.body.find("uibinder")[0].cloneNode(true);
            } else if (type == "uidata") {
                ui_obj1 = domObj.body.cloneNode(true);
            } else if (type == "ui") {

            }
            if (ui_obj1.find("script").length > 0) {
                var script = ui_obj1.find("script");
                for (var j = 0; j < script.length; j++) {
                    var tmp_str = script[j].textContent;
                    var tmp_str2 = "";
                    tmp_str2 += "JS.createUiField(ui_obj1,false);";
                    tmp_str2 += "JS." + panel + " = ui_obj1;";
                    tmp_str = tmp_str2 + tmp_str;
                    script[j].textContent = tmp_str;
                }
            }
            return ui_obj1;
        }
    }

    global.onload = function () {

    }


}));
