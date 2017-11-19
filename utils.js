var subsy = require('subsy');
var Case = require('case');
var yaml = require('js-yaml');
var fs = require('fs');

module.exports = {
    demo() {
        console.log(this.substitute('This is a <%=test%>', {test:this.case.kebab('DemoTest')}, '<%=', '%>'));
    },
    substitute(string, options, prefix, suffix) {
        return string.replace(new RegExp(prefix+'+[\\w.]+'+suffix,'g'), subsy.json(options));
    },
    case: Case,
    loadYaml(path) {
        return yaml.load(fs.readFileSync(path, {encoding: 'utf-8'}));
    }
}