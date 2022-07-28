export const namespaced = true

export const state = {
    navbar_positions: ["nav_blog", "nav_digests", "nav_create"],
    navbar_dir: 'nav_blog'
}

export const mutations = {
    setNavbarPos(state, direction) {
        if (state.navbar_dir.includes(direction)) {
            state.navbar_dir = direction
        } else {
            state.navbar_dir = state.navbar_positions[0]
        }
    },
}

export const actions = {}

export const modules = {}