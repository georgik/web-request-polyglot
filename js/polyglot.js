
const store = new Vuex.Store({
    state: {
        model: {
            url: 'https://georgik.rocks/web-request-polyglot'
        }
    },
    mutations: {
        url(state, url) {
            state.model.url = url;
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
                    curl: "curl " + this.$store.state.model.url,
                    powershell: "Invoke-WebRequest " + this.$store.state.model.url,
                    wget: "wget " + this.$store.state.model.url

                }
                return this.$store.state.levelMap;
            }
        }
    });


var polyglot = new Vue({
  el: '#polyglot',
  data: {}
});

