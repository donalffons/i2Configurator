var I2Conf = {};

I2Conf.propertyChangeList = function () {
    this.propChangeList = [];
}

I2Conf.propertyChangeList.prototype.addItem = function(selector, value) {
    this.propChangeList.push({"selector": selector, "value": value});
}

I2Conf.propertyChangeList.prototype.removeItem = function(selector) {
    var item = this.propChangeList.find(function(propchange){
        if(propchange.selector == selector) {
            return true;
        }
        return false;
    })[0];
    this.propChangeList.pop(item);
}

I2Conf.propertyChangeList.prototype.toJSON = function() {
    var json = "[";
    for (var i = 0; i < this.propChangeList.length; i++) {
        json += "{\n";
        json += "    "+this.propChangeList[i].selector.toJSON()+",\n";
        json += "    \"value\": ";
        json += JSON.stringify(this.propChangeList[i].value)+"\n";
        json += "}";
        if (i < this.propChangeList.length -1) {
            json += ",\n";
        }
    }
    json += "]";
    return json;
}

I2Conf.hierarchyPropertySelector = function (obj, prop) {
    this.obj = obj;
    this.type = "hierarchy";
    this.prop = prop;
    this.hierarchy = [];
    var currentO = this.obj;
    while(currentO != null) {
        this.hierarchy.push(currentO.name);
        currentO = currentO.parent;
    }
    this.hierarchy = this.hierarchy.reverse();
}

I2Conf.hierarchyPropertySelector.prototype.toJSON = function () {
    var json = "\"selector\": {\n";
    json        += "\"type\": \"hierarchy\",\n";
    json        += "\"hierarchy\": [\n";
    for(var i = 0; i < this.hierarchy.length; i++) {
        json        += "\""+this.hierarchy[i]+"\""
        if(i < this.hierarchy.length-1) {json += ",";}
        json        += "\n";
    }
    json        += "],\n";
    json        += "\"property\": \""+this.prop+"\"\n";
    json    += "}";
    return json;
}

I2Conf.change = function () {
    //...
}

I2Conf.propertyChange = function (type) {
    //...
}

var autoPropertyChangeList = new I2Conf.propertyChangeList();