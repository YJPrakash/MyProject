// Functions to create xhrs
function createStandardXHR() {
  try {
    return new window.XMLHttpRequest();
  } catch (e) {}
}

function createActiveXHR() {
  try {
    return new window.ActiveXObject("Microsoft.XMLHTTP");
  } catch (e) {}
}

function formatParams(params) {
  return "?" + Object.keys(params).map(function(key) {
    return key + "=" + params[key]
  }).join("&");
}

function isJson(item) {
  item = typeof item !== "string" ?
    JSON.stringify(item) :
    item;

  try {
    item = JSON.parse(item);
  } catch (e) {
    return false;
  }

  if (typeof item === "object" && item !== null) {
    return true;
  }

  return false;
}

function Ajax() {
  var parseXml;

  var options = arguments[0];
  var param = JSON.stringify(options.data)
  // var param = isJSON(options.data) ? JSON.stringify(options.data) : options.data
  // param = JSON.parse(param)
  var xhr = window.XMLHttpRequest === undefined ?
    // Support: IE6+
    function() {

      // XHR cannot access local files, always use ActiveX for that case
      // return !this.isLocal &&

      // Support: IE7-8
      // oldIE XHR does not support non-RFC2616 methods (#13240)
      // See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
      // and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
      // Although this check for six methods instead of eight
      // since IE also does not support "trace" and "connect"
      return /^(get|post|head|put|delete|options)$/i.test(options.method) &&

        createStandardXHR() || createActiveXHR();
    } :
    // For all other browsers, use the standard XMLHttpRequest object
    createStandardXHR();

  if (typeof options.data != "undefined") {
    var url = options.url + formatParams(options.data);
  } else {
    var url = options.url;
  }
  // var url = formatParams(param);
  if (typeof options.async != "undefined") {
    var asyncVal = options.async;
  } else {
    var asyncVal = false;
  }

  xhr.open(options.method, url, asyncVal);
  if (options.contentType !== undefined) {
    xhr.setRequestHeader("Content-type", options.contentType);
  }
  if (options.crossorigin !== undefined && options.crossorigin) {
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.setRequestHeader("Access-Control-Allow-Credentials", true);
    xhr.setRequestHeader("Access-Control-Allow-Methods", "GET");
    xhr.setRequestHeader("Access-Control-Allow-Headers", "Content-Type");
  }
  // xhr.setRequestHeader("Cache-Control","max-age=18000;");
  // xhr.setRequestHeader("Cache-Control","max-age=2592000;"); // 30 days
  xhr.setRequestHeader("Cache-Control", "no-cache, max-age=18000;");
  // if("withCredentials" in xhr){
  //     console.log("1");
  // }
  // xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  // xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
  // xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
  // xhr.setRequestHeader("Content-type", "text/plain; charset=utf-8");
  // xhr.setRequestHeader("Content-length", param.length);
  // xhr.setRequestHeader("connection", "close");

  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var retstr = "";
      if (options.contentType !== undefined && options.contentType == "application/json") {
        // retstr = eval(this.responseText);
        retstr = JSON.parse(this.responseText);
      } else {
        retstr = this.responseText;
      }
      options.success(retstr, xhr);
      // options.success(this.responseText);
    } else if (this.readyState == 4 && this.status != 200) {
      // console.log(this.status);
      // options.error(this.status);
    }
  };
  // xhr.send(param);
  // xhr.send(url);
  // xhr.send(options.data)
  xhr.send();
  // return true;

  // if (typeof window.DOMParser != "undefined") {
  //     parseXml = function(xmlStr) {
  //         return (new window.DOMParser()).parseFromString(xmlStr, "text/xml");
  //     };
  // } else if (typeof window.ActiveXObject != "undefined" &&
  //     new window.ActiveXObject("Microsoft.XMLDOM")) {
  //     parseXml = function(xmlStr) {
  //         var xmlDoc = new window.ActiveXObject("Microsoft.XMLDOM");
  //         xmlDoc.async = "false";
  //         xmlDoc.loadXML(xmlStr);
  //         return xmlDoc;
  //     };
  // } else {
  //     throw new Error("No XML parser found");
  // }
  // this.parseXML = parseXML;

}


// function ajaxSettings(){
//   this.url  = this.options.url;
//   this.method = this.options.method;
//   this.async = this.options.async;
//   this.contentType = this.options.contentType;
// }

var dates = {
  convert: function(d) {
    // Converts the date in d to a date-object. The input can be:
    //   a date object: returned without modification
    //  an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
    //   a number     : Interpreted as number of milliseconds
    //                  since 1 Jan 1970 (a timestamp)
    //   a string     : Any format supported by the javascript engine, like
    //                  "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
    //  an object     : Interpreted as an object with year, month and date
    //                  attributes.  **NOTE** month is 0-11.
    return (
      d.constructor === Date ? d :
      d.constructor === Array ? new Date(d[0], d[1], d[2]) :
      d.constructor === Number ? new Date(d) :
      d.constructor === String ? new Date(d) :
      typeof d === "object" ? new Date(d.year, d.month, d.date) :
      NaN
    );
  },
  compare: function(a, b) {
    // Compare two dates (could be of any type supported by the convert
    // function above) and returns:
    //  -1 : if a < b
    //   0 : if a = b
    //   1 : if a > b
    // NaN : if a or b is an illegal date
    // NOTE: The code inside isFinite does an assignment (=).
    return (
      isFinite(a = this.convert(a).valueOf()) &&
      isFinite(b = this.convert(b).valueOf()) ?
      (a > b) - (a < b) :
      NaN
    );
  },
  inRange: function(d, start, end) {
    // Checks if date in d is between dates in start and end.
    // Returns a boolean or NaN:
    //    true  : if d is between start and end (inclusive)
    //    false : if d is before start or after end
    //    NaN   : if one or more of the dates is illegal.
    // NOTE: The code inside isFinite does an assignment (=).
    return (
      isFinite(d = this.convert(d).valueOf()) &&
      isFinite(start = this.convert(start).valueOf()) &&
      isFinite(end = this.convert(end).valueOf()) ?
      start <= d && d <= end :
      NaN
    );
  }
}

/**
 * [JSDOMParser description]
 * @method      JSDOMParser
 * @constructor
 */
function JSDOMParser() {
  this.urlString = "";
  this.obj_contentType = "";
  this.lastUpdateTime = 0;
  this.timStamp = 0;
}

/**
 * [description]
 * @method
 * @param       {[String]}    urlString       [file location]
 * @param       {[String]}    obj_contentType [textstring parse from the Object model]
 * @param       {[String]}    panel           [PanelType]
 * @return      {[String]}    domString       []
 */
JSDOMParser.prototype.getDOMString = function(urlString, obj_contentType, panel) {
  this.url = urlString;
  this.contentType = obj_contentType;
  this.panel = panel;
  this.lastUpdateTime = this.fetchRespHedrParm(this, "Last-Modified");
  this.lastUpdateTime = new Date(this.lastUpdateTime).getTime();
  if (eleObj.LayoutPanel[panel].timStamp === undefined) {
    eleObj.LayoutPanel[panel].timStamp = this.timStamp;
    eleObj.LayoutPanel[panel].lastUpdateTime = this.timStamp;
  }
  if (this.lastUpdateTime == 0){
    this.lastUpdateTime = 1;
  }
  eleObj.LayoutPanel[panel].lastUpdateTime = this.lastUpdateTime;

  // console.log("this.lastUpdateTime");
  // console.log(this.lastUpdateTime);

  if (this.isUpdated(eleObj.LayoutPanel[panel])) {
    Ajax({
      url: this.url + "?v=" + eleObj.LayoutPanel[panel].timStamp,
      contentType: this.contentType,
      async: false,
      method: "GET",
      success: function(retstr) {
        // console.log(retstr);
        // console.log(panel);
        
        eleObj.LayoutPanel[panel].domStr = retstr;
      }
    });
  }
  var domStr = eleObj.LayoutPanel[panel].domStr
  if (panel !== undefined && this.isUpdated(eleObj.LayoutPanel[panel])) {
    var domStr = eleObj.LayoutPanel[panel].domStr;
  }
  return domStr;
};

JSDOMParser.prototype.getDomFragment = function(domStr) {
  // var range = document.createRange();
  // // make the parent of the first div in the document becomes the context node
  // range.selectNode(document.getElementsByTagName("div").item(0));
  // // var documentFragment = range.createContextualFragment(tagString);
  // var docFrag = range.createContextualFragment(domStr);

  var doc = document.createElement('div');
  doc.innerHTML = domStr;
  // doc.appendChild(docFrag);
  return doc;
};

/**
 * [description]
 * @method
 * @param  {[type]} domStr [description]
 * @return {[type]}        [description]
 */

JSDOMParser.prototype.getDOMObject = function(domStr, contentType) {
  var parser = "",
    parseDom = "";
  contentType = this.contentType === undefined ? contentType : this.contentType;
  if (window.DOMParser) {
    // code for modern browsers
    parser = new DOMParser();
    parseDom = parser.parseFromString(domStr, contentType);
  } else {
    // code for old IE browsers
    parseDom = new ActiveXObject("Microsoft.XMLDOM");
    parseDom.async = false;
    parseDom.loadXML(domStr);

  }
  return parseDom;
};

JSDOMParser.prototype.fetchRespHedrParm = function(obj, hdrParam) {
  var paramVal = ""
  Ajax({
    url: obj.url,
    async: false,
    contentType: obj.contentType,
    method: "HEAD",
    success: function(retstr, req) {
      paramVal = req.getResponseHeader(hdrParam);
    }
  });
  return paramVal
}

JSDOMParser.prototype.isUpdated = function(obj) {
  var timStamp = obj.timStamp;
  var lastUpdateTime = obj.lastUpdateTime;
  // console.log("timStamp");
  // console.log(timStamp);
  // console.log(lastUpdateTime);
  if (dates.compare(timStamp, lastUpdateTime) == -1) {
    obj.timStamp = obj.lastUpdateTime;
    // console.log("true");
    return true;
  } else {
    // this.timStamp = 0;
    // console.log("false");
    return false;
  }
}
JSDOMParser.prototype.addFiles = function(filesArr, fileType) {
  var fileObj = eleObj[fileType + "List"];
  var fragment = document.createDocumentFragment();
  if (typeof filesArr !== undefined) {
    for (var j = 0; j < filesArr.length; j++) {
      var splitPath = filesArr[j].split("/");
      var keyFile = splitPath[splitPath.length - 1];
      if (fileObj[keyFile] === undefined) {
        fileObj[keyFile] = {
          url: filesArr[j],
          lastUpdateTime: 0,
          timStamp: 0,
          fileType: fileType
        }
      }
      fileObj[keyFile].lastUpdateTime = this.fetchRespHedrParm(fileObj[keyFile], "Last-Modified");
      fileObj[keyFile].lastUpdateTime = new Date(fileObj[keyFile].lastUpdateTime).getTime();
      if (this.isUpdated(fileObj[keyFile])) {
        this.loadFiles(fileObj[keyFile], fragment);
      }
    }
    document.head.appendChild(fragment);
    fragment = {};
  }
};
JSDOMParser.prototype.loadFiles = function(obj, fragment) {
  if (obj.fileType == "script") {
    var script = document.createElement('script');
    script.src = obj.url + "?v=" + obj.timStamp;
    script.type = "text/javascript";
    script.async = true;
    obj.elem = script;
  } else if (obj.fileType == "styles") {
    var link = document.createElement('link');
    link.href = obj.url + "?v=" + obj.timStamp;
    link.rel = "stylesheet";
    obj.elem = link;
  }
  fragment.appendChild(obj.elem);
};
