/*
* @Created by liqihui on 2019-04-15.
* @Desc MacroDefined
* 定义枚举类型，宏变量。。。
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

const MEMBER = 'member';//会员
const BIGSPECIALCOLUMN = 'bigspecial'; //大专栏
const SPECIALCOLUMN = 'special'; //专栏
const VIDEO = 'video';//视频
const VOICE = 'voice';//音频
const IMAGETEXT = 'imagetext';//图文
const LIVESTREAN = 'livestream';//直播
const OFFLINE = 'offline';//线下活动

const listDict = [
    {key:'member',popTo:'MemberDetailScreen'},
    {key:'bigspecial',popTo:'BigSpecColuDetailScreen'},
    {key:'special',popTo:'SpecColuDetailScreen'},
    {key:'video',popTo:'VideoScreen'},
    {key:'voice',popTo:'VoiceScreen'},
    {key:'imagetext',popTo:'ImageTextScreen'},
    {key:'livestream',popTo:'LiveStreDetailScreen'},
    {key:'offline',popTo:'OfflineActivityScreen'},
];

function itemType(item) {
    switch (item) {
        case MEMBER:
            return 'MemberDetailScreen';
            break
        case BIGSPECIALCOLUMN:
            return 'BigSpecColuDetailScreen';
            break
        case SPECIALCOLUMN:
            return 'SpecColuDetailScreen';
            break
         case VIDEO:
            return 'VideoScreen';
            break
         case VOICE:
            return 'VoiceScreen';
            break
         case IMAGETEXT:
            return 'ImageTextScreen';
            break
         case LIVESTREAN:
            return 'LiveStreDetailScreen';
            break
         case OFFLINE:
            return 'OfflineActivityScreen';
            break
    }
}

export default {
    itemType,
};
