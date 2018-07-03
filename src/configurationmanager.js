import ConfigurationObject from './configurationobject';

const load = (data, type) => {
    if (type.toLowerCase().includes('json')) {
        return loadJSON(data);
    }

    if (type.toLowerCase().includes('xml')) {
        return loadXML(data);
    }

    throw 'Invalid data type';
};

const convertConfigJSONToXML = (configJSON) => {
    let docString = `<${configJSON.name}></${configJSON.name}>`;
    let doc = (new DOMParser()).parseFromString(docString, 'text/xml');

    let root = doc.documentElement;

    if (configJSON.value) {
        root.innerHTML = configJSON.value;
    }

    configJSON.properties.forEach((value, key) => {
        root.setAttribute(key, value);
    });

    configJSON.children.forEach((child) => {
        convertConfigChildToXML(doc, root, child);
    });

    return doc;
};

function convertConfigChildToXML(doc, parent, child) {
    let el = doc.createElement(child.name);
    
    if (child.value) {
        el.innerHTML = child.value;
    }

    child.properties.forEach((value, key) => {
        el.setAttribute(key, value);
    });

    parent.appendChild(el);

    child.children.forEach((child) => {
        convertConfigChildToXML(doc, el, child);
    });
};

function loadJSON(rawData) {
    //TODO
    let data = JSON.parse(rawData);
};

function loadXML(rawData) {
    let data = (new DOMParser()).parseFromString(rawData, 'text/xml');

    let root = new ConfigurationObject(data.documentElement.tagName);

    data.documentElement.childNodes.forEach((child, index, arr) => {
        let conf = new ConfigurationObject(child.tagName);
        conf.load(child);

        root.children.push(conf);
    });

    return root;
};

export {
    load,
    convertConfigJSONToXML
};