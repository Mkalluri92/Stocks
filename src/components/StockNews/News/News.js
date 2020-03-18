import React from 'react';
import classes from './News.module.css'

const News = (props) => {

    return(
        <div className= {classes.headlines}>
            <img className= {classes.image} 
                src={props.urlToImage} alt="headline">
            </img>
            <div className={classes.details}>
                <a className={classes.title} 
                     href={props.url} target="_blank">
                    {props.title}
                </a>
                <div className={classes.content} 
                    dangerouslySetInnerHTML={{__html: props.content != null ?
                        props.content.replace(/\[\+[0-9]+.* chars\]/g, "") : 
                        null}}>
                    
                </div>
            </div>
        </div>
    )
}

export default News;
