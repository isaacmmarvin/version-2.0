import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import Card from '../componets/Card';
import Input from '../componets/Input';
import NumberContainer from '../componets/NumberContainer';
import Colors from '../constants/colors';
import BodyText from '../componets/BodyText';
import TitleText from '../componets/TitleText';
import MainButton from '../componets/MainButton';
import RoundedButton from '../componets/RoundedButton';



const StartGameScreen = props => {
    const [enteredValue, setEnteredValue] = useState('');
    const [confimed, setConfirmed] = useState(false);
    const [selecetedNumber, setSelectedNumber] = useState();
    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    };
    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    };
    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Invalid number', 'Number has to be between 1 and 99', [{ text: 'okay', style: 'destructive', onPress: resetInputHandler }]);
            return;
        }
        setConfirmed(true);
        setEnteredValue('');
        setSelectedNumber(chosenNumber);
        Keyboard.dismiss();
    };
    let confirmedOutput;

    if (confimed) {
        confirmedOutput = (
            <View style={styles.outputText}>
                <Text style={styles.outputText}>chosen Number: <Text style={{ color: Colors.primary }}>{selecetedNumber} </Text>
                </Text>
                <MainButton style={styles.start} onPress={() => props.onStartGame(selecetedNumber)}>
                    START GAME
        </MainButton>
            </View>);

        // confirmedOutput= (
        // <Card style={styles.summaryConatainer}>
        //         <BodyText> you selected:</BodyText>
        // <NumberContainer> {selecetedNumber} </NumberContainer>  
        // <MainButton  onPress={()=> props.onStartGame(selecetedNumber)}>
        //         START GAME 
        //     </MainButton>

        // </Card>
        // );
    }
    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <View style={styles.screen}>
                <TitleText style={styles.title} >Start new game</TitleText>
                <Card style={styles.inputConatiner}>
                    <BodyText> choose a number</BodyText>
                    <Input
                        style={styles.input}
                        blurOnSubmit
                        keyboardType="numeric"
                        maxLength={2}
                        onChangeText={numberInputHandler}
                        value={enteredValue}
                    />
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}><MainButton style={styles.MainButton} textStyle={{ color: Colors.primary }} onPress={resetInputHandler} >reset</MainButton></View>
                        <View style={styles.button}><MainButton style={styles.MainButton2} onPress={confirmInputHandler} > confrim</MainButton></View>
                    </View>
                </Card>
                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'

    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'open-sans-bold'

    },
    inputConatiner: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    button: {
        width: 100,
        padding: 10
    },
    input: {
        width: 50,
        textAlign: 'center'
    },
    outputText: {
        marginTop: 30,
        color: Colors.accent,
        fontSize: 20,
        padding: 10,
        textTransform: 'uppercase',
        fontFamily: 'lato-bold'

    },
    summaryConatainer: {
        marginTop: 20,
        alignItems: 'center',

    },
    MainButton: {
        padding: 10,
        paddingHorizontal: 5,
        paddingVertical: 15,
        backgroundColor: Colors.accent
    },
    MainButton2: {
        padding: 10,
        paddingHorizontal: 5,
        paddingVertical: 15,
        backgroundColor: Colors.primary
    },
    start: {
        marginTop: 10
    }
});

export default StartGameScreen;