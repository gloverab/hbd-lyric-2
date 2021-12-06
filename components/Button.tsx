import * as React from 'react';
import { useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from '../components/Themed';

interface IButtonProps {
  disabled?: boolean
  onClick: () => void,
  keyboardShowing?: boolean
}

export default function Button({ disabled, onClick, keyboardShowing }: IButtonProps) {
  const submitStyle = useMemo(() => {
    return {
      backgroundColor: '#006353',
      alignItems: 'center',
      borderRadius: 5,
      padding: 10,
      opacity: disabled ? .6 : 1,
      marginBottom: keyboardShowing ? 0 : 50
    }
  }, [disabled, keyboardShowing])
  
  return (
    <TouchableOpacity disabled={disabled} onPress={onClick} style={submitStyle}>
      <Text style={{ fontSize: 24 }}>Generate Lyrics</Text>
    </TouchableOpacity>
  )
}