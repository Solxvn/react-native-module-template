/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import React from "react"
import { useColorScheme } from "react-native"
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
// import { Demo, HomeScreen, } from "../screens"
import { navigationRef, useBackButtonHandler } from "./navigation-utilities"
import HomeScreen from "../screens/Home";
import { DemoScreen } from "react-native-module-template"


/**
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 */


// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator()

const AppStack = () => {
    return (
        <Stack.Navigator

            screenOptions={{
                headerShown: false,
            }}
            initialRouteName="home"
        >
            <Stack.Screen name="home" component={HomeScreen} />
            <Stack.Screen name="demo" component={DemoScreen} />
            {/** 🔥 Your screens go here */}
        </Stack.Navigator>
    )
}


export const AppNavigator = (props) => {
    const colorScheme = useColorScheme()
    useBackButtonHandler(canExit)
    return (
        <NavigationContainer
            ref={navigationRef}
            theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
            {...props}
        >
            <AppStack />
        </NavigationContainer>
    )
}

AppNavigator.displayName = "AppNavigator"

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["welcome"]
export const canExit = (routeName) => exitRoutes.includes(routeName)