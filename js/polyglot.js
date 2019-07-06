
const store = new Vuex.Store({
    state: {
        model: {
            url: 'https://georgik.rocks/web-request-command-line-generator',
            isSecure: true
        },
        commands: {
            curl: {
                command: 'curl',
                isInsecure: '-k'
            },
            powershell: {
                command: 'Invoke-WebRequest',
                isInsecure: ''
            },
            wget: {
                command: 'wget',
                isInsecure: '--no-check-certificate'
            }
        }
    },
    mutations: {
        url(state, url) {
            state.model.url = url;
        },
        secure(state, isSecure) {
            state.model.isSecure = isSecure;
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

                if (!this.$store.state.model.isSecure) {
                    result += " " + options['isInsecure'] +  " ";
                }

                result += " " + this.$store.state.model.url;
                return result;
            }
        }
    });


var polyglot = new Vue({
  el: '#polyglot',
  data: {}
});

