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
    load
};