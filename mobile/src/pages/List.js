import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client';
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, Text, Image, AsyncStorage, Alert } from 'react-native';

import SpotList from '../components/SpotList';
import logo from '../assets/logo.png';

export default function List(){
    const [techs, setTechs] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio('http://192.168.0.11:3333', {
                query: { user_id }
            })

            socket.on('booking_response', booking => {
                Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'}`);
            })
        })
    }, []);

    useEffect(() => {
        AsyncStorage.getItem('techs').then(storagedTechs => {
            const techsArray = storagedTechs.split(',').map(tech => tech.trim());
            
            setTechs(techsArray);
        })
    }, []); 

    List.navigationOptions = {
        title: 'List',
      }

    return (
        <>
            <SafeAreaView style={styles.container}>
                <Image style={styles.logo} source={logo}/>

                <ScrollView>
                    {techs.map(tech => <SpotList key={tech} tech={tech} /> )}
                </ScrollView>

                <TouchableOpacity style={styles.button}>
                        <Text style={styles.logout}>Sair</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    logo: {
        height:32,
        resizeMode: "contain",
        alignSelf: 'center',
        marginTop:30
    },

    logout: {
        marginTop:10
    },

    button:{
        height:42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
    },

    buttonLogout:{
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});