import React, { useCallback, useEffect, useReducer } from "react";
import { StyleSheet, TouchableOpacity } from "react-native"
import ModifierButton from "./ModifierButton";
import { initialState, reducer, useCustomContext } from "./reducers/main";
import { Text, View } from "./Themed";

export default function ModifierButtons() {
  const { globalState, globalDispatch } = useCustomContext()

  const handleClearAll = useCallback(() => {
    globalDispatch({ type: 'chacha', value: false })
    globalDispatch({ type: 'monkey', value: false })
    globalDispatch({ type: 'spanish', value: false })
    globalDispatch({ type: 'manyMore', value: false })
  }, [])

  return (
    <View style={{ alignSelf: 'stretch' }}>
      <View style={styles.labelRow}>
        <Text>Choose a Modifier (optional)</Text>
        {(globalState.chacha || globalState.monkey || globalState.spanish || globalState.manyMore) &&
          <TouchableOpacity onPress={handleClearAll}>
            <Text>Clear All</Text>
          </TouchableOpacity>
          }
      </View>
      <View style={styles.spacerV} />
      <View style={styles.row}>
        <ModifierButton
          isActive={globalState.chacha}
          onPress={() => globalDispatch({ type: 'chacha', value: true })}
          text='Cha Cha Cha'
        />
        <View style={styles.spacerH} />
        <ModifierButton
          isActive={globalState.monkey}
          onPress={() => globalDispatch({ type: 'monkey', value: true })}
          text='Monkey'
        />
      </View>
      <View style={styles.spacerV} />
      <View style={styles.row}>
        <ModifierButton
          isActive={globalState.spanish}
          onPress={() => globalDispatch({ type: 'spanish', value: true })}
          text='Spanish'
        />
        <View style={styles.spacerH} />
        <ModifierButton
          isActive={globalState.manyMore}
          onPress={() => globalDispatch({ type: 'manyMore', value: true })}
          text='And Many More'
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  spacerV: {
    height: 10
  },
  spacerH: {
    width: 10
  }
})