import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class ClassContextComponent extends Component {
    themeStyles(dark) {
        return {
            backgroundColor: dark ? '#333' : '#CCC',
            color: dark ? '#ccc' : '#333',
            // padding: 10,
            // margin: 10,
            height: 65,
            borderRadius: 10,
            justifyContent: 'center',
        }
    }

    textStyles(dark) {
        return {
            color: dark ? '#CCC' : '#333',
            alignSelf: 'center',
        }
    }

    render() {
        return (
            <ThemeContext.Consumer>
                {darkTheme => {
                    return (
                        <View style={this.themeStyles(darkTheme)}>
                            <Text style={this.textStyles(darkTheme)}>Class Theme</Text>
                        </View>
                    )
                }}
            </ThemeContext.Consumer>
        )
    }
}