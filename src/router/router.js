import { createRouter, createWebHistory } from 'vue-router'
import Main from "@/pages/Main"
import CreatePageStart from "@/pages/CreatePageStart"
import CreatePage from "@/pages/CreatePage"
import CreateAccount from "@/pages/CreateAccount"
import ConnectWallet from "@/pages/ConnectWallet"
import Marketplace from "@/pages/Marketplace"
import MyAccount from "@/pages/MyAccount"
import Profile from '@/pages/Profile'

// DIGESTS
import DigestsFeed from '@/pages/digests/DigestsFeed'
import DigestFeed from '@/pages/digests/DigestFeed'

// #################################################
// ADMINS ONLY                                     #
// #################################################
import PostingPanel from '@/pages/admin/PostingPanel'
import LogInDashboard from '@/pages/admin/LogInDashboard'
// DIGESTS
import CreateDigestGroup from '@/pages/digests/CreateDigestGroup'
import CreateDigestPost from '@/pages/digests/CreateDigestPost'
import CreateCollection from '@/pages/CreateCollection'
import DigestUpdatePostsFeed from '@/pages/digests/DigestUpdatePostsFeed'
// POSTS
import CreatePost from '@/pages/posts/CreatePost'
import Blog from '@/pages/posts/Blog'
import PostTab from '@/pages/posts/PostTab'
////////////////////////////////////////////////////
const routes = [{
        path: '/',
        component: Main
    },
    {
        path: '/admin_panel',
        component: PostingPanel
    },
    {
        path: '/admin-log-in',
        component: LogInDashboard
    },
    // ############################################
    // DIGESTS                                    #
    // ############################################
    {
        path: '/create_digest_group',
        component: CreateDigestGroup
    },
    {
        path: '/create_digest_post',
        component: CreateDigestPost
    },
    {
        path: '/digest_update/:id',
        component: DigestUpdatePostsFeed
    }, {
        path: '/digest/:id',
        component: DigestFeed
    }, {
        path: '/digests',
        component: DigestsFeed
    },
    // ############################################
    // POSTS                                      #
    // ############################################
    {
        path: '/blog',
        component: Blog
    },
    {
        path: '/blog_post/:id',
        component: PostTab
    },
    {
        path: '/create_post',
        component: CreatePost
    },
    // ############################################
    // WEB 3                                      #
    // ############################################
    {
        path: '/create/start',
        component: CreatePage
    },
    {
        path: '/create/erc721',
        component: CreatePageStart
    },
    {
        path: '/create',
        component: CreatePage
    },
    {
        path: '/create_collection',
        component: CreateCollection
    },
    {
        path: '/create_account',
        component: CreateAccount
    },
    {
        path: '/wallet',
        component: ConnectWallet
    },
    {
        path: '/marketplace',
        component: Marketplace
    },
    {
        path: '/my_account',
        component: MyAccount
    },
    // ############################################
    // PROFILE                                    #
    // ############################################
    {
        path: '/profile',
        component: Profile
    },
    {
        path: '/more',
        component: Marketplace
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((routeTo, routeFrom) => {
    console.log(`Routing from: '${routeFrom.path}' to: '${routeTo.path}'`)
})

export default router