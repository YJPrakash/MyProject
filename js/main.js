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
	docFrame.onload = function () {
		// console.log(docFrame.contentWindow.document)
		var domObj = docFrame.contentWindow.document;
		var uiObj = domObj.querySelectorAll("uibinder");
		uiObj.forEach(element => {
			var panel_id = element.getAttribute("id");
			JS.layoutPanel[panel_id].uiObj = element;
			JS.UiBinder(panel_id);
		});

	}

	docFrame.src = "uibinder/uibinder.html";
	// docFrame.src = "uibinder/contentPanel.html";
	// docFrame.src = "uibinder/helloworld.html";
	// docFrame.src = "uibinder/Elements.html";

	function setProperty(_proto, tagName) {
		var obj = (_prpoperties[tagName] === undefined) ? _prpoperties["TextBox"] : _prpoperties[tagName];
		Object.keys(obj).map(function (key) {
			Object.defineProperty(_proto, key, obj[key]);
		});
	}

	global.JS = {
		createUiBase: function (obj, tagName) {
			var query_str = "*[ui-base]"
			var uiBase = obj.querySelectorAll(query_str);
			var hasUiBase = uiBase.length;
			for (var j = 0; j < hasUiBase; j++) {
				var el = JS.createUi(uiBase[j].getAttribute("ui-base"));
				uiBase[j].append(el);
			}
			return obj;
		},
		createUiField: function (obj, isCreateUiBase, tagName) {
			// if(!isCreateUiBase){
			// 	obj = obj.cloneNode(true);
			// }
			var query_str = "*[ui-field]";
			var uiField = obj.querySelectorAll(query_str);
			var hasUiField = uiField.length;
			for (var j = 0; j < hasUiField; j++) {
				obj[uiField[j].getAttribute("ui-field")] = uiField[j];
			}
			return (!isCreateUiBase) ? obj : this.createUiBase(obj, tagName);
		},
		createUi: function (tagName) {
			var domObj = JS.layoutPanel.elements.domObj;
			var obj = domObj.querySelector(tagName).cloneNode(true);
			obj = JS[tagName] = this.createUiField(obj, true, tagName);
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
			"helloworld": {
				url: "./uibinder/helloworld.html",
				type: "uibinder"
			}
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
			var type = JS.layoutPanel[panel].type
			var uiObj = JS.layoutPanel[panel].uiObj;
			var evalString = "JS.createUi"
			if (type == "uibinder") {
				evalString += "Field(uiObj,false,null);";
				uiObj = uiObj.cloneNode(true);
				// doc.body.appendChild(uiObj);
			} else if (type == "uidata") {
				// evalString += "(uiObj);";
				evalString = ""
				uiObj = uiObj.cloneNode(true);
			} else if (type == "ui") {

			}
			uiObj.style.display = "block";
			if (uiObj.querySelectorAll("script").length > 0) {
				var script = uiObj.querySelectorAll("script");
				// var scriptFragment = doc.createDocumentFragment();
				for (var j = 0; j < script.length; j++) {
					var script1 = script[j];
					script1.type = "text/javascript";
					script1 = script1.cloneNode(true);
					var tmp_str = script1.textContent;
					var tmp_str2 = "";
					tmp_str2 += "console.log(uiObj);\nalert('asdfads');";
					tmp_str2 += evalString;
					tmp_str2 += "JS['" + panel + "'] = uiObj;";
					tmp_str = tmp_str2 + tmp_str;
					script1.textContent = tmp_str;
					// scriptFragment.append(script[j]);
					// eval(tmp_str);
					// doc.body.appendChild(script1);
					// doc.head.appendChild(script1);
				}
			}
			return uiObj;
		}
	}

	global.onload = function () {

	}


}));