function Load3DFile(filename, basefolder) {
    if (basefolder === undefined) {
        basefolder = getBaseFolder();
    }
    var xhr = new XMLHttpRequest(); 
    xhr.open("GET",  getModelFolder()+filename);
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

function get3DFiles(cb) {
    $.ajax({
        url: "I2Configurator.php",
        type: "POST",
        data: {
            api: "get3DFilesByModelID",
            modelid: "1"
        },
        dataType: "json",
        success: function(data){
            cb(data);
        },
        error: function() { console.error("Error while getting 3d files by model id"); },
        complete: function() { }
    });
}

function LoadModelVariant() {
    get3DFiles(function(filenames) {
        var objectAddPromises = [];
        for(var i = 0; i < filenames.length; i++) {
            objectAddPromises.push(Load3DFile(filenames[i]));
        }

        $.when.apply($, objectAddPromises).done(function(){
            var action = JSON.parse(currentVariant.action);
            for(var j = 0; j < action.length; j++) {
                var sel = action[j].selector;
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
                var val = action[j].value;
                var propSel = new I2Conf.hierarchyPropertySelector(obj, prop);
                
                eval("obj."+prop+"_overridden = true;");
                eval("obj."+prop+"_propSel = propSel;");
                eval("obj."+prop+".copy(val)");
                eval("autoPropertyChangeList.addItem(obj."+prop+"_propSel, obj."+prop+");");
            }
        });
    });
}

function getBaseFolder() {
    var baseurl = window.location.href.substring(0, window.location.href.indexOf("?"));
    var basefolder = baseurl.substring(0, baseurl.lastIndexOf("/"));
    return basefolder;
}

function getModelFolder() {
    var basefolder = getBaseFolder();
    return basefolder+"/WebGL Models/"+getCurrentModel().path+"/";
}

function getCurrentVariantName() {
    var variantname = getParameterByName("variant");
    return variantname;
}

var currentVariant = {};
var currentModel = {};
function setCurrentModelAndVariant(cb) {
    var variantname = getCurrentVariantName();
    var basefolder = getBaseFolder();
    $.ajax({
        url: "I2Configurator.php",
        type: "POST",
        data: {
            api: "getModelByID",
            modelid: "1"
        },
        dataType: "json",
        success: function(data){
            currentModel = data;
            $.ajax({
                url: "I2Configurator.php",
                type: "POST",
                data: {
                    api: "getVariantByID",
                    variantid: "1"
                },
                dataType: "json",
                success: function(data){
                    currentVariant = data;
                    cb();
                },
                error: function() { console.error("error while loading variant by ID"); },
                complete: function() { }
            });
        },
        error: function() { console.error("error while loading model by ID"); },
        complete: function() { }
    });
}

function getCurrentVariant() {
    return currentVariant;
}

function getCurrentModel() {
    return currentModel;
}

function LoadCurrentVariant() {
    LoadModelVariant(currentModel, currentVariant);
}