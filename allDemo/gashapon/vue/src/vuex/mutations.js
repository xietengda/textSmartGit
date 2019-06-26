//用于操作state的唯一途径

//改变音乐对象
export const changeBgm = (state,para) => {
    state.bgm = para;
}

//改变音乐播放对象
export const changePlay = (state,para) => {
    state.bgPlay = para;
}


