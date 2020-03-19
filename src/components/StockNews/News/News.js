import React from 'react';
import classes from './News.module.css'

const News = (props) => {

    return(
        <a href={props.url}>
            <div className= {classes.headlines}>
                <img className= {classes.image} 
                    src={props.urlToImage} alt="headline">
                </img>
                <div className={classes.details}>
                    <span className={classes.title}>
                        {props.title}
                    </span>
                    <div className={classes.content} 
                        dangerouslySetInnerHTML={{__html: props.content != null ?
                            props.content.replace(/\[\+[0-9]+.* chars\]/g, "") : 
                            null}}>
                    </div>
                </div>
            </div>
        </a>
    )
}

export default News;
