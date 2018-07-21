function Load3DFile(filename, basefolder) {
    if (basefolder === undefined) {
        basefolder = getBaseFolder();
    }
    var xhr = new XMLHttpRequest(); 
    xhr.open("GET", basefolder+"/WebGL Models/"+getParameterByName("model")+"/"+filename);
    xhr.responseType = "blob";
    xhr.filename = filename;
    xhr.onload = function(params) {
        params.currentTarget.response.name = params.currentTarget.filename;
        editor.loader.loadFile( params.currentTarget.response, basefolder+"/WebGL Models/"+getParameterByName("model")+"/" , params.currentTarget.objectAddPromise);
    }
    xhr.objectAddPromise = $.Deferred()
    var objectAddPromise = xhr.objectAddPromise;
    xhr.send();
    return objectAddPromise;
}

function LoadVariant(currentVariant, basefolder) {
    if (basefolder === undefined) {
        basefolder = getBaseFolder();
    }
    var objectAddPromises = [];
    if(currentVariant.filenames == null) {
        return;
    }
    for(var i = 0; i < currentVariant.filenames.length; i++) {
        objectAddPromises.push(Load3DFile(currentVariant.filenames[i]));
    }

    $.when.apply($, objectAddPromises).done(function(){
        var propertyChange = JSON.parse(currentVariant.propertyChange);
        for(var j = 0; j < propertyChange.length; j++) {
            var sel = propertyChange[j].selector;
            if(sel.type == "hierarchy") {
                var obj = editor.scene;
                for(var k = 1; k < sel.hierarchy.length; k++) {
                    obj = obj.children.find(function(e) {
                        if(e.name == sel.hierarchy[k]) {
                            return true;
                        }
                        return false;
                    })
                }
            }
            var prop = sel.property;
            var val = propertyChange[j].value;
            var propSel = new I2Conf.hierarchyPropertySelector(obj, prop);
            
            eval("obj."+prop+"_overridden = true;");
            eval("obj."+prop+"_propSel = propSel;");
            eval("obj."+prop+".copy(val)");
            eval("autoPropertyChangeList.addItem(obj."+prop+"_propSel, obj."+prop+");");
        }
    });
}

function getBaseFolder() {
    var baseurl = window.location.href.substring(0, window.location.href.indexOf("?"));
    var basefolder = baseurl.substring(0, baseurl.lastIndexOf("/"));
    return basefolder;
}

function getCurrentVariantName() {
    var variantname = getParameterByName("variant");
    return variantname;
}

var currentVariant = {};
function setCurrentVariant(cb) {
    var variantname = getCurrentVariantName();
    var basefolder = getBaseFolder();
    $.getJSON(basefolder+"/WebGL Models/"+getParameterByName("model")+"/db/variants.json?"+Math.floor(Math.random()*1000), function(data) {
        for(var i = 1; i < data.data.length; i++) {
            if(data.data[i].name == variantname) {
                currentVariant = data.data[i];
                var jsonPropChange = JSON.parse(currentVariant.propertyChange);
                currentVariant.propertyChange = jsonPropChange;
                cb();
                break;
            }
        }
    });
    
    return currentVariant;
}

function getCurrentVariant() {
    return currentVariant;
}

function LoadFromRequestURL() {
    var variantname = getCurrentVariantName();
    var basefolder = getBaseFolder();
    $.getJSON(basefolder+"/WebGL Models/"+getParameterByName("model")+"/db/variants.json?"+Math.floor(Math.random()*1000), function(data) {
        for(var i = 1; i < data.data.length; i++) {
            if(data.data[i].name == variantname) {
                LoadVariant(data.data[i], basefolder);
                break;
            }
        }
    });
}