import * as React from 'react'
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';

const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

export default function Calculations() {
  const [showAge, setShowAge] = useState(false)
  const [showPrecision, setShowPrecision] = useState(false)
  const [showGenerating, setShowGenerating] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showReadability, setShowReadability] = useState(false)
  const [showVitalRecords, setShowVitalRecords] = useState(false)
  const [showBackgroundCheck, setShowBackgroundCheck] = useState(false)
  const [showBirthDatabase, setBirthDatabase] = useState(false)
  const [percentage, setPercentage] = useState(0)
  const [letter, setLetter] = useState('')
  const [optLetter, setOptLetter] = useState('')

  const cycleLetters = useCallback(() => {
    const val = alphabet[Math.floor(Math.random() * alphabet.length)] 
    setLetter(val)
  }, [letter, setLetter])

  const generateLyrics = useCallback(() => {
    setShowGenerating(true)
    const arr = 'HAPPYBIRTHDAYTOYOU'.split('')
    
    arr.forEach((l, i) => {
      setTimeout(() => {
        setOptLetter(l)
      }, i * 100)
    })
  }, [])

  const optimizeReadability = useCallback(() => {
    setShowReadability(true)
    for (let i = 0; i < 100; i++) {
      setTimeout(() => {
        setPercentage(i + 1)
      }, i * 40)
    }
  }, [percentage, setPercentage])
  
  useEffect(() => {
    const letterInterval = setInterval(cycleLetters, 50)
    setTimeout(optimizeReadability, 1000)
    setTimeout(generateLyrics, 2000)
    setTimeout(() => setShowAge(true), 3000)
    setTimeout(() => setShowPrecision(true), 3300)
    setTimeout(() => setShowVitalRecords(true), 3900)
    setTimeout(() => setShowBackgroundCheck(true), 5100)
    setTimeout(() => setBirthDatabase(true), 5800)
    setTimeout(() => setShowSuccess(true), 7000)
    return () => {
      clearInterval(letterInterval)
    }
  }, [])
  
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
      <View style={styles.row}>
          <Text>Cycling Letters...</Text>
          <Text>({letter})</Text>
        </View>
        {showGenerating && <View style={styles.row}>
          <Text>Generating Lyrics...</Text>
          <Text>{optLetter}</Text>
        </View>}
        {showReadability && <View style={styles.row}>
          <Text>Optimizing Readability...</Text>
          <Text>{percentage}%</Text>
        </View>}
        {showAge && <View style={styles.row}>
          <Text>Determining Age...</Text>
        </View>}
        {showPrecision && <View style={styles.row}>
          <Text>Bettering Precision...</Text>
        </View>}
        {showVitalRecords && <View style={styles.row}>
          <Text>Accessing Vital Records...</Text>
        </View>}
        {showBackgroundCheck && <View style={styles.row}>
          <Text>Background Check...</Text>
        </View>}
        {showBirthDatabase && <View style={styles.row}>
          <Text>Connecting to national birth registrar...</Text>
        </View>}
        {showSuccess && <View style={styles.row}>
          <Text style={styles.success}>Success!</Text>
        </View>}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20,
    backgroundColor: 'rgba(0,0,0,0)',
    height: '100%',
    width: '100%',
    paddingTop: 60,
    paddingHorizontal: 20
  },
  inner: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.8)',
    borderWidth: 1,
    borderColor: 'white',
    padding: 20
  },
  row: {
    backgroundColor: 'rgba(0,0,0,0)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  success: {
    color: 'chartreuse'
  }
})