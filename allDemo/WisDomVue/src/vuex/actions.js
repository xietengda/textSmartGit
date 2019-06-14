//不改变状态，只提交(commit) mutation。

//更改音乐对象
export const changeBgm = ({commit,para}) => commit('changeBgm',para)

//更改音乐播放状态
export const changePlay = ({commit,para}) => commit('changePlay',para)

//更改音乐播放状态
export const changeBgm2 = ({commit,para}) => commit('changeBgm2',para)
