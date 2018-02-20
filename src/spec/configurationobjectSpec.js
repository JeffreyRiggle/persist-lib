import ConfigurationObject from '../configurationobject';

describe('configuration object', function() {
    var conf, node, childNode1, childNode2, nestedChildNode;

    beforeEach(function() {
        childNode1 = {
            nodeName: 'child1',
            nodeType: 1,
            childNodes: [
                {
                    nodeType: 3,
                    textContent: 'foo'
                }
            ],
            attributes: []
        };

        nestedChildNode = {
            nodeName: 'nested',
            nodeType: 1,
            childNodes: [
                {
                    nodeType: 3,
                    textContent: 'testchild'
                }
            ],
            attributes: [{name: 'test', value: 'val'}, {name: 'test2', value: 'var'}]
        };

        childNode2 = {
            nodeName: 'child2',
            nodeType: 1,
            childNodes: [nestedChildNode],
            attributes: []
        };

        node = {
            childNodes: [ childNode1, childNode2 ],
            attributes: [{name: 'att', value: 'test'}]
        };

        conf = new ConfigurationObject('test');
    });

    it('should have the correct name', function() {
        expect(conf.name).toBe('test');
    });

    describe('when object is loaded', function() {
        beforeEach(function() {
            conf.load(node);
        });

        it('should have the correct value', function() {
            expect(conf.value).toBe(undefined);
        });

        it('should have the correct children', function() {
            expect(conf.children.length).toBe(2);
        });

        it('should have the correct first child', function() {
            expect(conf.children[0].name).toBe('child1');
            expect(conf.children[0].value).toBe('foo');
            expect(conf.children[0].properties.size).toBe(0);
        });

        it('should have the correct second child', function() {
            expect(conf.children[1].name).toBe('child2');
            expect(conf.children[1].value).toBe(undefined);
            expect(conf.children[1].properties.size).toBe(0);
            expect(conf.children[1].children.length).toBe(1);
        });

        it('should have the correct nested child', function() {
            expect(conf.children[1].children[0].name).toBe('nested');
            expect(conf.children[1].children[0].value).toBe('testchild');
            expect(conf.children[1].children[0].children.length).toBe(0);
            expect(conf.children[1].children[0].properties.get('test')).toBe('val');
            expect(conf.children[1].children[0].properties.get('test2')).toBe('var');
        });

        it('should have the correct properties', function() {
            expect(conf.properties.get('att')).toBe('test');
        });
    });
})