import { trimStart } from "lodash";
import React from "react";
import PanelHeader from "../PanelHeader/PanelHeader.js";
import Footer from "./Footer.js";
import Cookies from 'universal-cookie';

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleChecked_token = this.handleChecked_token.bind(this);
        this.handleChecked_sentence = this.handleChecked_sentence.bind(this);
        this.handleRemoveMark = this.handleRemoveMark.bind(this);
        this.state = {
            candidateSelected_token : false,
            candidateSelected_sentence : false,
        }
    }

    componentDidMount = () => {
        this.setState({json_obj:this.props.json_content})
    }

    handleClick(e) {
        var s = window.getSelection(),
        range = s.getRangeAt(0),
        mark = document.createElement("mark"),
        span = document.createElement("span");
        mark.style.cssText = "background-color:#ffe184; cursor:pointer;";
        span.style.cssText = "font-size:12px; font-weight:bold; color:purple; margin-left:5px; margin-right:5px;";
        
        if (range.toString().indexOf(' ') != 0){
            var textnode = document.createTextNode(e.target.innerHTML);
            var tag = document.createTextNode(" "+this.state.token);
            var json_objtostring = JSON.parse(this.state.json_obj);

            span.appendChild(tag)
            range.deleteContents();
            mark.appendChild(textnode)
            mark.appendChild(span)
            range.insertNode(mark);
            s.removeAllRanges();
            s.addRange(range);

            json_objtostring.sentences[this.props.indexloop].tokens[e.target.id-1]['tag']=this.state.token;
            console.log(json_objtostring.sentences[this.props.indexloop])
            this.setState({json_obj:JSON.stringify(json_objtostring)})
        }
    };

    handleRemoveMark(e){
        var s = window.getSelection(),
        range = s.getRangeAt(0),
        json_objtostring = JSON.parse(this.state.json_obj);
        
        if (e.target.tagName.toLowerCase() === 'mark'){
            var textinner = e.target.innerText,
            trimspac = textinner.trimStart(),
            firsttext = trimspac.split(" ")[0];

            var markinner = document.getElementById(e.target.parentNode.id);
            delete json_objtostring.sentences[this.props.indexloop].tokens[e.target.parentNode.id-1]['tag'];
            markinner.innerHTML = ' '+firsttext+' '
            console.log(json_objtostring.sentences[this.props.indexloop])
        }
    }

    handleChecked_token(e){
        this.setState({candidateSelected_token: !this.state.candidateSelected_token, token: e.target.value})
    }

    handleChecked_sentence(e){
        this.setState({candidateSelected_sentence: !this.state.candidateSelected_sentence, token: e.target.value})
    }

    callbackFunctionFooter = (childData) => {
        this.callbackWidget(childData)
    }

    callbackWidget = (childData) =>{
        this.props.callbackIndex(childData)
    }
    
    render(){
        const items = []
        for (const [index, value] of this.props.token_level.entries()) {
            items.push(<div style={{padding:"2px"}} key={index}><input onClick={this.handleChecked_token} type="radio" id={value} name="select_token" value={value} defaultChecked={this.state.candidateSelected_token || this.props.candidateSelected_token}></input>
                    <label style={{fontSize:"15px",marginBottom:"0px"}} htmlFor={value}>{value}</label></div>)
        }

        const text = []
        for (const [index, value] of this.props.data.tokens.entries()) {
            text.push(<span className="change-selection" style={{marginRight:"4px", marginLeft:"4px", display:"inline-block",
                whiteSpace:"pre-wrap", fontSize:"20px", lineHeight:2}} id={value.id} key={index+this.props.data.id}> {value.text} </span>)
        }

        const label = []
        for (const [index, value] of this.props.sentence_level_tags.entries()) {
            label.push(<div style={{padding:"2px"}} key={index}><input onClick={this.handleChecked_sentence} type="radio" id={value} name="select_sentences" value={value} defaultChecked={this.state.candidateSelected_sentence || this.props.candidateSelected_sentence}></input>
                    <label style={{fontSize:"15px",marginBottom:"0px", display:"block"}} htmlFor={value}>{value}</label></div>)
        }
        
        return(
            <>
            <PanelHeader size="sm" />
                <div className="content">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header" style={{backgroundColor:"#ffc107", display:"flex", padding:"8px 20px"}}>
                                    {items}
                                </div>
                                <div className="card-body change-selection" onDoubleClick={this.handleClick} onClick={this.handleRemoveMark}>
                                    {text}
                                </div>
                                <div className="card-body">
                                    {label}
                                </div>
                                <div className="card-body">
                                    Artikel id : {this.props.article_id}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer callbackFunction={this.callbackFunctionFooter} indexloop={this.props.indexloop}></Footer>
            </>
        )
    }
}

export default Content;
