import Vue from 'vue'
import VueX from 'vuex'


Vue.use(VueX)

//封装数据项
const state={
    token:null,
    role:null,
    roleList:[]
}

//计算属性
const getters={
    getToken(state){
        return state.token
    },
    getRole(state){
        return state.role
    },
    getRoleList(state){
        return state.roleList
    }
}

//封装对数据的直接操作
const mutations={
    LOGIN(state,token){
        state.token=token
    },
    LOGOUT(state){
        state.token=null
    },
    SETROLE(state,role){
        state.role=role
    },
    SETROLELIST(state,roleList){
        state.roleList=roleList
    }
}

//封装前台对store数据的操作逻辑
const actions={
    login({commit}){
        commit('LOGIN')
    },
    logout({commit}){
        commit('LOGOUT')
    }
}

export default new VueX.Store({
    state,
    getters,
    mutations,
    actions
})