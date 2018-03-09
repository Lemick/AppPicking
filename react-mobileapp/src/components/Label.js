import React, { Component } from 'react';
 
import {
  StyleSheet,
  Text,
} from 'react-native';
 
const Label = (props) => {

    return (
        <Text style={styles.base} >
            {props.text}
        </Text>
    );
}
 
const styles = StyleSheet.create({
    base: {
        fontSize: 15,
        fontFamily: 'SFRegular',
        color: '#141823'
    }
});
 
export default Label;