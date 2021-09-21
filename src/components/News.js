import React,{useEffect,useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


const News = (props)=> {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    
    const capitalizeFirstLetter = (string)=>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews = async()=>{
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data= await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json();
        props.setProgress(70);
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        
        props.setProgress(100);
    }
    //this function will run after rendering
    //async function waits for the promise to get resolved
    useEffect(() => {
        updateNews();
        // eslint-disable-next-line
        document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`
    }, [])

    // handlePreviousClick = async ()=>{
    //     setPage(page-1);
    //     updateNews()
    // }
    // handleNextClick = async ()=>{
    //     setPage(page+1);
    //     updateNews()
    // }   

    const fetchMoreData = async() => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page+1);                                          //page is incremented later bcoz it takes time to set and before that the api is updates the page
        let data= await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles));                      //Concatinating the articles to the recent articles
        setTotalResults(parsedData.totalResults);
        
    };

    return (
        <>
            <h1 className="text-center" style={{marginTop:'78px'}}>NewsMonkey-Top Headlines</h1>
            <h3 className="text-center">{"[ " + capitalizeFirstLetter(props.category) + " ]"}</h3>
            {/* Below syntax means when loading is true only then spinner will be seen */}
            {loading && <Spinner/>}

            {/* IMPLEMENTING INFINITE SCROLL FEATURE */}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner/>} 
            >          
                {/* Adding an extra container for infinite scroll */}
                <div className="container">

                    <div className="row">
                        {/* Through 'MAP' function we are Iterating the objects of the news articles */}
                        {/* When loading is false only then the news will be seen */}
                        {articles.map((element)=>{
                            // We need to give the key to the one that is returning 
                            return <div className="col-md-4" key={element.url}>
                            <NewsItem  title={element.title?element.title:""} description={element.description?element.description:""} 
                            imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}
                            source={element.source.name}/>
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>

            {/* <div className="container d-flex justify-content-between">
                {/* disabled is used to keep Previous button disabled for the required condition */}
                {/* &larr; = html code for left arrow */}
                {/* <button disabled={this.state.page<=1} type="button" class="btn btn-success" onClick={this.handlePreviousClick}>&larr; Previous</button>
                <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/props.pageSize)} type="button" class="btn btn-success" onClick={this.handleNextClick}>Next &rarr;</button>
            </div> */}
        </>
    )
    
}

News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: "general"
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News
