import { render } from "@testing-library/react";
import React from "react";

export default class Boxsection extends React.Component {
    constructor (props) {
        super(props)

        this.linkHref = props.link;
        this.imgSrc = props.img
        this.txt1 = props.txt1
        this.txt2 = props.txt2
        this.txt3 = props.txt3
        this.linkGit = props.github

        this.new = props.new
        
    }


    novo = ()=> {
        if(this.new) {
            return <img src="img/new.gif" className="new"/>
        }
    }


    render() {
        return (
            <a className="box_projeto" href={this.linkHref} target='_blank'>
                <img src={this.imgSrc} className='img_projeto'/>
                <h3>{this.txt1}<br/>{this.txt2}</h3>
                <p>{'--'+ this.txt3}</p>
                <a className="github" target='_blank' href={this.linkGit}><i class="bi bi-github" ></i></a>
                {this.novo()}
            </a>
        )
    }



}

