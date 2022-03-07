import { reqPostlikes } from '../../api'

const state = {

}
const actions = {
    async PostLikes({commit}, data){
        console.log(data)
        let result = await reqPostlikes(data)
        console.log(result)  
    }
}
const mutations = {
   
}
const getters = {}

export default{
    state,
    actions,
    mutations,
    getters
}