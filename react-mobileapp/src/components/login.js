import { ScrollView, TextInput } from "react-native-gesture-handler";
import Container from "./Container";
import Label from "./Label";

export default class Login extends Component {
    render() {
        return (
            <ScrollView style={styles.scroll}>
                <Container>
                    <Label text="Utilisateur" />
                    <TextInput
                        style={styles.textInput}
                    />    
                </Container>
                <Container>
                    <Label text="Mot de passe" />
                    <TextInput
                        secureTextEntry={true}
                        style={styles.textInput}
                    />
                </Container>    
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    scroll: {
        backgroundColor : '#E1D7D8',
        padding: 30,
        flexDirection: 'column'
    },
    label: {
        color: '#0d8898',
        fontSize: 20
    },
    alignRight: {
        alignSelf: 'flex-end'
    },
    textInput: {
        heigth: 80,
        fontSize: 30,
        backgroundColor: '#FFF'
    }    
});