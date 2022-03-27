import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { authenticate } from 'slices/app.slice'

import DrawerNavigator from './Drawer'

const Navigator = () => {
  const { checked, loggedIn } = useSelector((state) => state.app)
  const dispatch = useDispatch()

  useEffect(() => {
    // dispatch(authenticate({ loggedIn: false, checked: true }))
  }, [])

  console.log('[##] loggedIn', loggedIn)

  return true ? (
    <NavigationContainer>
      <DrawerNavigator loggedIn={loggedIn} />
    </NavigationContainer>
  ) : (
    <Text>Loading...</Text>
  )
}

export default Navigator
