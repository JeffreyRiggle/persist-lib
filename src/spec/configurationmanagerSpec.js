import {load, convertConfigJSONToXML} from '../configurationmanager';

describe('configuration manager', function() {
    var data;

    describe('when xml is loaded', function() {
        var xml;

        beforeEach(function() {
            xml = '<foo><bar test="value">test</bar><baz>other child</baz></foo>';
            data = load(xml, 'text/xml');
        });

        it('should have the correct children', function() {
            expect(data.children.length).toBe(2);
        });

        it('should have the correct child names', function() {
            expect(data.children[0].name).toBe('bar');
            expect(data.children[1].name).toBe('baz');
        });

        it('should have the correct child value', function() {
            expect(data.children[0].value).toBe('test');
            expect(data.children[1].value).toBe('other child');
        });

        it('should have the correct child properties', function() {
            expect(data.children[0].properties.get('test')).toBe('value');
            expect(data.children[1].properties.size).toBe(0);
        });
    });

    describe('when json config is converted', function() {
        var json;

        beforeEach(function() {
            json = {
                name: 'foo',
                properties: new Map(),
                children: [
                    {
                        name: 'bar',
                        value: 'test',
                        properties: new Map(),
                        children: []
                    },
                    {
                        name: 'baz',
                        value: 'other child',
                        properties: new Map(),
                        children: []
                    }
                ]
            }

            json.children[0].properties.set('test', 'value');

            data = convertConfigJSONToXML(json);
        });

        it('should serialize to an expected string', function() {
            let ser = new XMLSerializer();
            expect(ser.serializeToString(data)).toBe('<foo><bar test="value">test</bar><baz>other child</baz></foo>');
        });
    });
});