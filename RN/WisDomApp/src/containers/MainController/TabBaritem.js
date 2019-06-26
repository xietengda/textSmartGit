import React, {PureComponent} from 'react'
import {StyleSheet, View, Image, Text} from 'react-native'

type Props = {
    normalImage:any,
    selectedImage:any,
    focused:boolean,
    tintColor:any,
    isClassmate:boolean,
}

type State ={

}

class TabBaritem extends PureComponent<Props, State> {
  render () {
    let {normalImage, selectedImage, focused, isClassmate} = this.props
    return (
      <Image
        source = {focused ? selectedImage : normalImage}
        style={isClassmate ? styles.iconClassmateStyle : styles.iconStyle}
      />
    )
  }
}

const styles = StyleSheet.create({
  iconStyle: {
    marginTop:globalStyles.exchange(6),
    width: globalStyles.SIZE.space_60,
    height: globalStyles.SIZE.space_60,
  },
  iconClassmateStyle: {
    width: globalStyles.exchange(144),
    height: globalStyles.exchange(144),
      marginBottom:globalStyles.exchange(7)
  }
})

export default TabBaritem
