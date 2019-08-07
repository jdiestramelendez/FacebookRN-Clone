import React, { Component } from "react";
import { View, StyleSheet, AsyncStorage } from "react-native";
import TimeAgo from 'react-native-timeago';
import StatusHeader from "./StatusHeader";
import Content from "./Content";
import Comment from "./Comment";
import FooterPost from "./FooterPost";
import axios from 'axios';

export default class Status extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            likecount: 10 
        };
    }

    async componentDidMount() {
        const token = await AsyncStorage.getItem('token')
        const headers = {
            'Authorization': 'Bearer ' + token
        }
        axios.get('http://192.168.0.26:3000/posts', { headers })
          .then(res => {
            const posts = res.data
            this.setState( { 
                posts: posts
            });
          })
      }

      addLikeCount = () => {
          this.setState({
              likecount: this.state.likecount + 1
          })
      }

    render() {
        const componentId = this.props.componentId
        return (
            <View>
                <View style={styles.lineBorder} />
                {this.state.posts.map((post, index) => {
                    return (
                        <View key={index}>
                            <View style={styles.peopleStatusContainer}>
                                <StatusHeader
                                    id={post.id}
                                    name={post.user.name}
                                    postTime={<TimeAgo time={post.createdAt} />}
                                    peopleImg={{uri: post.user.avatar}}
                                    componentId={componentId}
                                />
                                <Content fill={post.post} />
                                <Comment
                                    likeCount={this.state.likecount}
                                    commentCount="89 komentar"
                                />
                                <FooterPost />
                            </View>
                            <View style={styles.lineBorder} />
                        </View>
                    );
                })}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    peopleStatusContainer: {
        flex: 6,
        alignItems: "center",
        justifyContent: "center"
    },
    lineBorder: {
        borderColor: "#DDDDE4",
        borderWidth: 2
    }
});
