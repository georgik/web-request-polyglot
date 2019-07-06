
const store = new Vuex.Store({
    state: {
        model: {
            url: 'https://georgik.rocks/web-request-command-line-generator',
            useOutputFile: true,
            outputFile: 'out.html',
            isSecure: true
        },
        commands: {
            curl: {
                command: 'curl',
                isInsecure: '-k',
                outputFile: '-o'
            },
            powershell: {
                command: 'Invoke-WebRequest -Uri',
                isInsecure: '',
                outputFile: '-OutFile'
            },
            wget: {
                command: 'wget',
                isInsecure: '--no-check-certificate',
                outputFile: '-O'
            }
        }
    },
    mutations: {
        url(state, url) {
            state.model.url = url;
        },
        secure(state, isSecure) {
            state.model.isSecure = isSecure;
        },
        outputFile(state, outputFilename) {
            state.model.outputFile = outputFilename;
        },
        useOutputFile(state, useOutputFile) {
            state.model.useOutputFile = useOutputFile;
        }

    }
});

Vue.component('definition', {
        template: '#definition-template',
        store,
        props: {},
        computed: {
            url() {
                return this.$store.state.model.url;
            },
            useOutputFile() {
                return this.$store.state.model.useOutputFile;

            },
            outputFile() {
                return this.$store.state.model.outputFile;
            }
        },
        methods: {
            updateUrl: function(url) {
                store.commit("url", url);
            },
            urlChanged: function(e) {
                this.updateUrl(e.target.value);
            },
            updateSecure: function(isSecure) {
                store.commit("secure", isSecure);
            },
            insecureCheckboxChanged: function(e) {
                this.updateSecure(!e.target.checked);
            },
            updateUseOutputFile: function (useOutputFile) {
                store.commit("useOutputFile", useOutputFile);
            },
            outputFileCheckboxChanged: function(e) {
                this.updateUseOutputFile(e.target.checked);
            },
            updateOutputFile: function(outputFilename) {
                store.commit("outputFile", outputFilename);
            },
            outputFileChanged: function(e) {
                this.updateOutputFile(e.target.value);
            }
        }
    });

Vue.component('commands', {
        template: '#commands-template',
        store,
        props: {},
        computed: {
            projections() {
                return [
                    {
                        key: 'curl',
                        name: 'cURL'
                    },
                    {
                        key: 'powershell',
                        name: 'PoweShell'
                    },
                    {
                        key: 'wget',
                        name: 'wget'
                    }
                ]
            },
            commands() {
                return {
                    curl: this.getCommand("curl"),
                    powershell: this.getCommand("powershell"),
                    wget: this.getCommand("wget")

                }
            }
        },
        methods: {
            getCommand: function(command) {
                let options = this.$store.state.commands[command];
                var result = options['command'];
                let model = this.$store.state.model;

                result += " " + model.url;
                
                if (!model.isSecure) {
                    result += " " + options['isInsecure'] +  " ";
                }

                if (model.useOutputFile) {
                    result += " " + options['outputFile'] + " " + model.outputFile;
                }

                return result;
            }
        }
    });


var polyglot = new Vue({
  el: '#polyglot',
  data: {}
});

