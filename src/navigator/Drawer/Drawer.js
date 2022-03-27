import React from 'react'
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer'
import DrawerMenu from './DrawerMenu'
import TabNavigator from '../Tabs'
import Login from "../../pages/Auth/index";

const Drawer = createDrawerNavigator()

const DrawerMenuContainer = (props) => {
  const { state, ...rest } = props
  const newState = { ...state }
  newState.routes = newState.routes.filter((item) => item.name !== 'Home')
  return (
    <DrawerContentScrollView {...props}>
      <DrawerMenu {...props} />
      <DrawerItemList state={newState} {...rest} />
    </DrawerContentScrollView>
  )
}

export default (props) => (
  <Drawer.Navigator initialRouteName="Home" drawerContent={DrawerMenuContainer}>
    {props.loggedIn ? <Drawer.Screen name="Home" component={TabNavigator} />
      : <Drawer.Screen name="Login" component={Login} />}
  </Drawer.Navigator>
)
