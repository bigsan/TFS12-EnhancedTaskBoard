declare var require;

module DefinitionGenerator {
    class Property {
        propName: string;
        propTypeName: string;
        propValue: any;
        isClass: boolean;
        isInstanceOfClass: boolean;
        isStatic: boolean;

        constructor(name, val) {
            this.propName = name;
            this.propValue = val;

            this.propTypeName = Property.getTypeName(val);
            this.isClass = val != null && typeof (val) === "function" && (Object.keys(val).length > 0 || val.prototype && Object.keys(val.prototype).length > 0);
            this.isInstanceOfClass = $.inArray(this.propTypeName, ['number', 'boolean', 'string', 'array', 'Object', 'object', 'null']) == -1;
        }

        static getTypeName(obj): string {
            var typeName = ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
            return (typeName === 'object') ? obj.constructor.name : typeName;
        }

        toString() {
            if (this.isClass) {
                var className = this.propValue.toString().match(/function\s+([^(]+)\s*\(/)[1];
                var classArgs = this.propValue.toString().match(/(\([^)]*\))/)[1];
                if (this.propName == 'constructor') {
                    return StringUtils.format('constructor{0};', classArgs);
                }
                return StringUtils.format('{0}: any; /* {1} */', this.propName, className);
            }

            switch (this.propTypeName) {
                case "number":
                case "boolean":
                case "string":
                    return StringUtils.format('var {0}: {1};', this.propName, this.propTypeName);
                case "array":
                    return StringUtils.format('var {0}: any[];', this.propName);
                case "function":
                    return StringUtils.format('function {0}{1};', this.propName, this.propValue.toString().match(/(\([^)]*\))/)[1]);
                case "Object":
                    var indent = '    ';
                    var lines = ObjectUtils.generateInstanceDefinitionLines(this, StringUtils.repeat(indent, 2));
                    return StringUtils.format('var {0}: {\n{1}\n{2}}', this.propName, lines.join('\n'), indent);
                default:
                    return StringUtils.format('var {0}: any; /* {1} */', this.propName, this.propTypeName);
            }
        }
    }

    class StringUtils {
        static format(format, ...args: any[]): string {
            var sprintfRegex = /\{(\d+)\}/g;

            var sprintf = function (match, number) {
                return number in args ? args[number] : match;
            };
            return format.replace(sprintfRegex, sprintf);
        }

        static repeat(pattern, count) {
            return new Array(count + 1).join(pattern);
        }
    }

    class ObjectUtils {
        private static getMembers(obj, includePrivateMembers: boolean = false, excludeMembers = ['_base']) {
            if (obj == null) return [];

            var memberNames = Object.keys(obj).filter((s, i, arr) => $.inArray(s, excludeMembers) == -1);
            if (!includePrivateMembers) { memberNames = memberNames.filter((s, i, arr) => s[0] != "_"); }

            return $.map(memberNames, function (v, k) {
                var name = v;
                var val = obj[name];
                return new Property(name, val);
            });
        }

        static getModuleMembers(module) {
            return ObjectUtils.getMembers(module);
        }

        static getClassMembers(theClass) {
            var staticMembers = ObjectUtils.getMembers(theClass);
            staticMembers.forEach((v, i, a) => v.isStatic = true);

            var instanceMembers = ObjectUtils.getMembers(theClass.prototype);
            if (instanceMembers.every((v, i, arr) => v.propName != 'constructor')) {
                instanceMembers.push(new Property('constructor', theClass));
            }

            var allMembers = staticMembers.concat(instanceMembers);

            return allMembers;
        }

        static generateInstanceDefinitionLines(prop: Property, indent = '    '): string[] {
            if (prop.isClass || prop.isInstanceOfClass) { throw new Error("property is like a class type or is an instance of other class."); }

            var defs = ObjectUtils.getMembers(prop.propValue);
            var members = $.map(defs, (v, k) => {
                return indent + v.toString().replace(/^(function|var) /, '');
            });
            return members;
        }

        static generateClassDefinitionLines(prop: Property, indent = '    '): string[] {
            if (!prop.isClass) { throw new Error("property is not like a class type."); }

            var defs = ObjectUtils.getClassMembers(prop.propValue);
            var members = $.map(defs, (v, k) => {
                var replacement = v.isStatic ? 'static ' : '';
                return indent + v.toString().replace(/^(function|var) /, replacement);
            });

            var lines = [];
            lines.push(StringUtils.format('class {0} {', prop.propName));
            lines.push.apply(lines, members);
            lines.push('}');
            return lines;
        }
    }

    function generateModuleDefinition(moduleName) {
        var module = require(moduleName);
        var defs = ObjectUtils.getModuleMembers(module);

        var defsWithoutClass = defs.filter((value, index, arr) => !value.isClass);
        var classes = $.grep(defs, (d, i) => d.isClass);


        var indent = '    ';
        var memberLines = $.map(defsWithoutClass, (v, k) => v.toString());
        $.each(classes, (i, e) => [].push.apply(memberLines, ObjectUtils.generateClassDefinitionLines(e, indent)));

        memberLines.forEach((s, i, all) => all[i] = indent + s);
        return StringUtils.format('declare module "{0}" {\n{1}\n}', moduleName, memberLines.join('\n'));
    }

    var moduleNames = [
        'Presentation/Scripts/TFS/TFS',
        'Presentation/Scripts/TFS/TFS.Core',
        'Presentation/Scripts/TFS/TFS.Host',
        'Presentation/Scripts/TFS/TFS.OM',
        'Presentation/Scripts/TFS/Resources/TFS.Resources.Common',
        'Presentation/Scripts/TFS/TFS.UI.Controls',
        'Presentation/Scripts/TFS/TFS.UI.Controls.Menus',
        'Presentation/Scripts/TFS/TFS.UI.Controls.Navigation',
        'WorkItemTracking/Scripts/TFS.WorkItemTracking'
    ];
    //moduleNames = moduleNames.slice(7, 8);
    var outputs = $.map(moduleNames, (v, k) => generateModuleDefinition(v));

    console.clear();
    console.log(outputs.join('\n'));
    $("<div/>").append(
        $('<textarea />')
            .text(outputs.join('\n'))
            .css({ width: '100%', height: '100%' })
    )['dialog']({ width: 800, height: 600 });
}