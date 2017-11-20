var subsy = require('subsy');
var Case = require('case');
var yaml = require('js-yaml');
var fs = require('fs-extra');

module.exports = {
    demo() {
        console.log(this.substitute('This is a <%=test%>', {test:Case.kebab('DemoTest')}, '<%=', '%>'));
    },
    substitute(string, options, prefix, suffix) {
        //i.e. this.substitute('This is a <%=test%>', {test:'DemoTest' }, '<%=', '%>')
        return string.replace(new RegExp(prefix+'+[\\w.]+'+suffix,'g'), subsy.json(options));
    },
    caseProperties(props, key) {
        props[Case.camel(key)] = Case.camel(props[key]);
        props[Case.upper(key).replace(/ /g,'')] = Case.upper(props[key]).replace(/ /g,'');
        props[Case.kebab(key)] = Case.kebab(props[key]);
        props[Case.lower(key).replace(/ /g,'')] = Case.lower(props[key]).replace(/ /g,'');
        props[Case.pascal(key)] = Case.pascal(props[key]);
        props[Case.snake(key)] = Case.snake(props[key]);
    },
    loadYaml(path) {
        return yaml.load(fs.readFileSync(path, {encoding: 'utf-8'}));
    },
    appendCopy(src,dest,appendMarker,appendContent) {
        if (!fs.existsSync(dest)) {
            fs.copySync(src, dest);
        }
        fs.readFile(dest, 'utf-8', function(err, data){
            if (err) throw err;
            if (data.indexOf(appendContent) == -1) {
                var newData = data.replace(appendMarker, appendContent + '\n\n'+appendMarker);
                fs.writeFile(dest, newData, 'utf-8', function (err) {
                    if (err) throw err;
                });
            }
        });
    }
}