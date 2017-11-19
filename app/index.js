'use strict';
var Generator = require('yeoman-generator');
var utils = require('../utils');
var rename = require("gulp-rename");


const questions = [
    'input', 'list', 'confirm'
];

module.exports = class extends Generator {

    initializing() {
        this.options.configuration = utils.loadYaml(this.templatePath('../configs/config.yaml'));
    }

    promptingZZZ() {        
        utils.demo();

        const prompts = [
            {
                type: 'input',
                name: 'input',
                message: 'Input',
                default: 'DefaultInput'
            },
            {
                type: 'list',
                name: 'list',
                message: 'List',
                default: 'Default Value',
                choices: [
                    { value: 'value1', name: 'Value 1' },
                    { value: 'value2', name: 'Value 2' },
                    { value: 'value3', name: 'Value 3' }
                ]
            },
            {
                type: 'confirm',
                name: 'confirm',
                message: 'Confirm?',
                default: true
            },
        ];

        //return this.prompt(prompts, questions);
    }

    configuring() {}
    writing() {
        var THAT = this;
        this.registerTransformStream(rename(function(path) {
            console.log(THAT.options.configuration);
            path.basename = utils.substitute(path.basename, THAT.options.configuration, '{{','}}');
            path.dirname = utils.substitute(path.dirname, THAT.options.configuration, '{{','}}');
            path.dirname = path.dirname.replace(/\./g, '/');
        }));
        this.fs.copyTpl(
            this.templatePath(),
            this.destinationPath(), 
            this.options.configuration
        );
    }
    end() {}
};