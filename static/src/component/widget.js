import React from "react";
import Sidebar from "./Sidebar/Sidebar.js"
import Content from "./Content/content.js"
import "regenerator-runtime";
import Cookies from 'universal-cookie';

class Widget extends React.Component {
    
    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {
            backgroundColor: "yellow",
            checkedStatus_token: false,
            checkedStatus_sentence: false,
            sentences: '',
            token_level_tags:'',
            indexloop:0,
            sentence_level_tags:'',
            article_id:''
        };
    }

    handleColorClick = (color) => {
        this.setState({ backgroundColor: color });
    };

    componentDidMount = () => {
        this._isMounted = true;
        this.callArticleJson(0)
    }

    callArticleJson = (index) => {
        let urls = "http://192.168.4.77:8200/api/get?user_id=12345678&article_id=5374016&category=Sentiment",
        json_artikel = null,
        index_loop = index;

        fetch(urls,{
            timeout: 20000,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Accept': 'application/json',
            },
        })
        .then(response => response.json())
        .then((data) => {
            json_artikel = data
            if (json_artikel !== null){
                if (index_loop >= 0 && index_loop < json_artikel.sentences.length){
                    var json_artikel_loop = json_artikel.sentences;
                    this._isMounted && this.setState({sentences:json_artikel_loop[index_loop],
                        token_level_tags:json_artikel.token_level_tags,
                        indexloop: index_loop, 
                        sentence_level_tags:json_artikel.sentence_level_tags,
                        article_id:json_artikel.article_id,
                        json_content:JSON.stringify(json_artikel)})
                        
                }
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }

    componentWillUnmount = () => {
        this._isMounted = false;
    }

    callbackIndex = (childData) => {
        // this.callArticle(childData)
        this.callArticleJson(childData)
    }

    render(){
        return(
            <div className="wrapper">
                <Sidebar
                    {...this.props}
                    backgroundColor={this.state.backgroundColor}
                />
                <div className="main-panel" ref={this.mainPanel}>
                {this.state.sentences != null && this.state.sentences.length != 0 ? <Content callbackIndex={this.callbackIndex} 
                candidateSelected_token={this.state.checkedStatus_token} 
                data={this.state.sentences}
                token_level={this.state.token_level_tags} 
                indexloop={this.state.indexloop} 
                sentence_level_tags={this.state.sentence_level_tags} 
                candidateSelected_sentence={this.state.checkedStatus_sentence}
                article_id={this.state.article_id}
                json_content={this.state.json_content}/> : ""}
                </div>
            </div>
        )
    }
}

export default Widget;