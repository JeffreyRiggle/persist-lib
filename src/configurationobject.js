export class ConfigurationObject {
    constructor(name, value) {
        this.name = name;
        this.value = value;
        this.children = [];
        this.properties = new Map();
    }

    load(node) {
        node.childNodes.forEach((child, index, arr) => {
            if (child.nodeType === 1) {
                this._loadChild(child);
            }

            if (child.nodeType === 3) {
                this.value = child.textContent;
            }
        });

        this._loadAttributes(node);
    }

    _loadChild(node) {
        let conf = new ConfigurationObject(node.nodeName);
        conf.load(node);
        this.children.push(conf);
    }

    _loadAttributes(node) {
        for (let i = 0; i < node.attributes.length; i++) {
            let att = node.attributes[i];
            this.properties.set(att.name, att.value);
        }
    }
}