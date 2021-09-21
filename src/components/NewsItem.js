import React from 'react'

const NewsItem = (props)=> {
    
    //title and description will be pulled from this.props
    let {title, description, imageUrl,newsUrl,author, date,source} = props;
    return (
        <div className="my-3">
            <div className="card" >
            {/* This div below is to set the badge */}
            <div style={{display:'flex', justifyContent:'flex-end',position:'absolute', right:'0'}}>   
                {/* Source is taken from bootstrape and it is a badge */}
            <span className="badge rounded-pill bg-danger" >{source}</span>
            </div>
                <img src={!imageUrl?"https://static.toiimg.com/photo/85898466.cms":imageUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    {/* new Date(date).toGMTString() : Converts the date format*/}
                    <p className="card-text"><small className="text-muted">By {!author?"Unknown": author} on {new Date(date).toGMTString()}</small></p>
                    {/* target="_blank" helps to open in a new tab */}
                    <a href={newsUrl}  rel="noreferrer" target="_blank" className="btn btn-sm btn-primary">Read More</a>
                </div>
            </div>
        </div>
    )
    
}

export default NewsItem
