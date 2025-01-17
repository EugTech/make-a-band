import React, { Component } from 'react';
import { NowPlayingBottomBar, BaseView, Placemat, Button } from './common';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import { currentBandFetch, fetchArtists, fetchBands, fetchSponsors } from '../actions';
import { Actions } from 'react-native-router-flux';


class HomeView extends Component{

    componentWillMount(){
        this.props.currentBandFetch();
        this.manageCurrentBand(this.props);
    }

    componentWillUpdate(){
        
    }

    componentWillReceiveProps(nextProps){
        this.manageCurrentBand(nextProps);
    }

    manageCurrentBand( { currentBand }){
        this.currentBand = currentBand;
    }

    onBandsPressed(){
        this.props.fetchBands();
        Actions.listData({title: "Bands"});
    }

    onArtistsPressed(){
        this.props.fetchArtists();
        Actions.listData({title: "Artists"});
    }

    onSponsorsPressed(){
        this.props.fetchSponsors();
        Actions.listData({title: "Sponsors"});
    }

    render(){

        return(
            <BaseView baseViewStyle={{backgroundColor: '#ddd'}}>
                <Placemat style={{padding: 0}}>
                    <Image style={{flex: 1, resizeMode: "stretch", height: 120}} source={require('../image/mab_banner.png')} />
                </Placemat>
                
                <View style={styles.viewContainerStyle}>
                    <View style={{flex:1}}>
                        <TouchableOpacity style={styles.buttonStyle} onPress={this.onBandsPressed.bind(this)} >
                            <Image style={{resizeMode: "stretch", height: 50, justifyContent:'center', alignItems: 'center'}} source={require('../image/bands_icon.png')} />
                            <Text style={styles.textStyle}>
                                Bands
                            </Text>
                        </TouchableOpacity>
                        
                    </View>

                    <View style={{flex:1}}>
                        <TouchableOpacity style={styles.buttonStyle} onPress={this.onArtistsPressed.bind(this)} >
                            <Image style={{resizeMode: "stretch", height: 50, justifyContent:'center', alignItems: 'center'}} source={require('../image/artists_icon.png')} />
                            <Text style={styles.textStyle}>
                                Artists
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{flex:1}}> 
                        <TouchableOpacity style={styles.buttonStyle} onPress={this.onSponsorsPressed.bind(this)} >
                            <Image style={{resizeMode: "stretch", height: 50, justifyContent:'center', alignItems: 'center'}} source={require('../image/sponsors_icon.png')} />
                            <Text style={styles.textStyle}>
                                Sponsors
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                
            

                <NowPlayingBottomBar bandName={this.currentBand}>
                    Now playing:
                </NowPlayingBottomBar>
            </BaseView>
        );
    }
}

const styles = {
    viewContainerStyle:{
        flex: 5,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    textStyle:{
        alignSelf: 'center',
        color: '#111111',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    },
    buttonStyle:{
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderRadius: 0,
        borderWidth: 1,
        borderColor: '#111',
        marginLeft: 0,
        marginRight: 0,
        justifyContent: 'center',
        activeOpacity: .1,
        alignItems: 'center'
    }
}

const mapStateToProps = state => {
    const { currentBand } = state.band;
    return { currentBand };
};

export default connect(mapStateToProps, {   currentBandFetch, 
                                            fetchArtists, 
                                            fetchBands,
                                            fetchSponsors })(HomeView);