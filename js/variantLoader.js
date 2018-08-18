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
        editor.loader.loadFile( params.currentTarget.response, basefolder+"/WebGL Models/"+getCurrentModel().getPath()+"/" , params.currentTarget.objectAddPromise);
    }
    xhr.objectAddPromise = $.Deferred()
    var objectAddPromise = xhr.objectAddPromise;
    xhr.send();
    return objectAddPromise;
}

async function LoadModelVariant() {
    let filenames = await getCurrentModel().get3DFiles();
    var objectAddPromises = [];
    for(var i = 0; i < filenames.length; i++) {
        objectAddPromises.push(Load3DFile(filenames[i]));
    }

    $.when.apply($, objectAddPromises).done(async() => {
        let actionsPromise = getCurrentVariant().getActions();
        actionsPromise.then((actions) => {
            actions.forEach((action) => {
                action.getObjectsSelector().setSceneRoot(editor.scene);
                action.execute();
            });
        }, () => {});
    });
}

function getBaseFolder() {
    var baseurl = window.location.href.substring(0, window.location.href.indexOf("?"));
    var basefolder = baseurl.substring(0, baseurl.lastIndexOf("/"));
    return basefolder;
}

function getModelFolder() {
    var basefolder = getBaseFolder();
    return basefolder+"/WebGL Models/"+getCurrentModel().getPath()+"/";
}

var currentVariant = {};
var currentModel = {};
async function setCurrentModelAndVariant(cb) {
    var modelid = getParameterByName("modelid");
    var variantid = getParameterByName("variantid");
    currentVariant = await i2VariantBuilder.getVariantByID(variantid);
    currentModel = await i2ModelBuilder.getModelByID(modelid);
    cb();
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