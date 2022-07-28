export const namespaced = true

export const state = {
    token: "",
    isAuthentificated: false
}

export const mutations = {
    initializeStore(state) {
        // read the cookie
        let cookies = document.cookie.split(';')
        for (let i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].split('=')
            if ('gf-token' == cookie[0].trim()) {
                state.token = decodeURIComponent(cookie[1])
                state.isAuthentificated = true
            } else {
                state.token = ''
                state.isAuthentificated = false
            }
        }
    },
    setToken(state, token) {
        state.token = token
        state.isAuthentificated = true

        // Setting the coockie
        let expire = new Date()
        expire = new Date(expire.getTime() + 1000 * 60 * 60);
        document.cookie = 'gf-token=' + token + ';expires=' + expire + ';'
    },
    removeToken(state) {
        state.token = ''
        state.isAuthentificated = false
        document.cookie = "gf-token=''; expires=Sat, 20 Jan 1980 12:00:00 UTC";
    }
}

export const actions = {}

export const modules = {}