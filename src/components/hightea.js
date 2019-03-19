import React, { Component } from "react";
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import {
    View,
    Dimensions,
    TextInput,
    StyleSheet,
    Image
} from 'react-native'
import firebase from 'react-native-firebase'
const { width, height, fontScale } = Dimensions.get('window');
import { Container, Header, Title, Content, Button, Icon, Left, Right, Body, Text, Card, CardItem } from "native-base";
export default class HeaderTransparent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            HightTea: [],
            h0: false,
            h1: false,
            h2: false,
            HightTeaOpen: false,
            f0: 1,
            f1: 1,
            f2: 1,
            qty: 1,
        }
    }
    UNSAFE_componentWillMount() {
        firebase.database().ref('HighTea').once("value").then(success => {
            const product1 = success.val();
            const keys1 = Object.keys(product1);
            const array1 = [];
            for (let i = (keys1.length - 1); i >= 0; i--) {
                array1.push(product1[keys1[i]])
            }
            this.setState({ HightTea: array1 });
        })
            .catch(err => {
                alert(err)
            })
    }
    render() {
        return (
            <Container style={{ backgroundColor: "#87cefa" }}>
                <Header transparent>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate('Dashboard')}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>High Tea</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            {/* <Text>Cancel</Text> */}
                        </Button>
                    </Right>
                </Header>
                <Content padder>
                    {
                        this.state.HightTea.map((mu, index) => {
                            return (
                                <Card style={{ backgroundColor: "green", margin: 0, padding: 0 }}>
                                    <CardItem header bordered>
                                        <TouchableOpacity style={{ width: width / 1.5, height: width / 15 }}>
                                            <Text>{mu.menuName}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ width: width / 4, height: width / 11, display: "flex", flexDirection: "row", justifyContent: "center" }} onPress={() => this.setState({ ["h" + index]: !this.state["h" + index] })}>
                                            {
                                                this.state["h" + index] ?
                                                    <Text style={{ fontSize: 30 }}>-</Text>
                                                    :
                                                    <Text style={{ fontSize: 30 }}>+</Text>
                                            }
                                        </TouchableOpacity>
                                    </CardItem>

                                    {this.state["h" + index] ?
                                        <CardItem bordered>
                                            <Body>
                                                <View>
                                                    {
                                                        mu.items.map((numbers) => {
                                                            return (
                                                                <Text style={{ fontFamily: "AguafinaScript-Regular" }}>
                                                                    {numbers}
                                                                </Text>
                                                            )
                                                        })
                                                    }
                                                </View>
                                            </Body>
                                        </CardItem>
                                        : null
                                    }
                                    <CardItem footer bordered>
                                        <Text style={{ width: width / 2.2 }}>{mu.price} / Person</Text>
                                        <TextInput
                                            style={{ fontWeight: "bold", fontWeight: "bold", height: width / 8, width: width / 6, color: "red", fontSize: 19, display: "flex", flexDirection: "row", textAlign: "center" }}
                                            onChangeText={(qty) => this.setState({ ["f" + index]: qty })}
                                            value={this.state["f" + index]}
                                            name={"f" + index}
                                            placeholder="1"
                                            placeholderTextColor="red"
                                            autoCapitalize='none'
                                        />
                                        <Button style={{ alignSelf: "center" }} onPress={() => { this.props.card(mu, this.state["f" + index]); this.clear("f" + index); }}><Text>ORDER</Text></Button>
                                    </CardItem>
                                </Card>
                            )
                        })
                    }
                </Content>
            </Container>
        );
    }
}