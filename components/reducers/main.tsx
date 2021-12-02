import React from 'react';

export const initialState = {
  name: '',
  age: 0,
  chacha: false,
  monkey: false,
  spanish: false,
  manyMore: false
}

export interface IState {
  name: string
  age: number
  chacha: boolean
  monkey: boolean
  spanish: boolean
  manyMore: boolean
}

export function reducer(state: IState, action: { type: string, value: any }): IState {
  switch (action.type) {
    case 'chacha':
      return {...state, chacha: action.value}
    case 'monkey':
      return {...state, monkey: action.value}
    case 'spanish':
      return {...state, spanish: action.value}
    case 'manyMore':
      return {...state, manyMore: action.value}
    case 'name':
      return { ...state, name: action.value }
    case 'age':
      return { ...state, age: action.value }
    default:
      return state
  }
}

const CustomContext = React.createContext<IState>(initialState);

export function useCustomContext(): any {
  return React.useContext(CustomContext);
}

export default CustomContext;