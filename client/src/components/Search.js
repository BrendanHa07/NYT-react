import React, {Component} from "react";
import SaveBtn from "./SaveBtn";
import { List, ListItem } from "./List"
import axios from "axios";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "./Grid"
import { Input, FormBtn } from "./Form";


class Search extends Component {
    // Setting intial values
    state = {
        articles: [],
        topic: "",
        start_year: "",
        end_year: ""
    };

    // // Load articles
    // componentDidMount () {
    //     this.loadArticles();
    // }

    // loadArticles = () => {
    //     API.getArticles()
    //         .then(res =>
    //             this.setState({ articles: res.data, topic: "", start_year: "", end_year: ""})
    //         )
    //         .catch(err => console.log(err));
    // };

    // handle any changes to input field
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    // Form subit
    handleFormSubmit = event  => {
        event.preventDefault();

        // Form fields
        const topic = this.state.topic;
        let startYear = this.state.start_year;
        let endYear = this.state.end_year;
        let queryResult = [];

        // API URL with api key
        const apiKey = "e497d9b362d54fbfa57fcc3c48800b95";
        let queryURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${apiKey}&q=${topic}`;

         // Appends month/day to startYear
        if (startYear) {
            startYear += "0101";
            queryURL = `${queryURL}&begin_date=${startYear}`;
        };
  
      // Appends month/day to endYear
        if (endYear) {
            endYear += "0101";
            queryURL = `${queryURL}&end_date=${endYear}`;
        };

        // Get request
        axios.get(queryURL)
           .then( response => {
            //    console.log(response.data.response.docs);
               response.data.response.docs.map(function(docs) {
                 var entry = {
                     title: docs.headline.main,
                     date: docs.pub_date,
                     url: docs.web_url,
                     id: docs._id
                 }
                 console.log(entry);
                 queryResult.push(entry);
                 console.log(queryResult);
               })
               this.setState({ articles: queryResult});
           })
           .catch( err => console.log(err));
    };


    saveArticle = (title, date, url) => {
        API.saveArticle({
          title: title,
          date: date,
          url: url,
          saved: true
        })
        .then(res => console.log(res))
        .catch(err => console.log(err))
      };

    // Delete article
    deleteArticle = id => {
        API.deleteArticle(id)
            .then( res => this.loadArticles())
            .catch( err => console.log(err));
    };


    render() {
        return(
            <Container fluid>
                <Row>
                <Col size="md-12">
                <div className="card" style={{textAlign: "center"}}>
                    <div className="card-header"  style={{backgroundColor: "#334b72"}}>
                        <p style={{color: "#fff", textAlign: "center"}}>Search Articles</p>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                            <input type="text" className="form-control" id="topic" name="topic" value={this.state.topic} onChange={this.handleInputChange} placeholder="Topic (required)" />
                            </div>
                            <div className="form-group">
                                <input id="start_year" type="text" name="start_year" className="form-control" value={this.state.start_year} onChange={this.handleInputChange} placeholder="Start Year (required)"/>
                            </div>
                            <div className="form-group">
                                <input id="end_year" type="text" name="end_year" className="form-control" value={this.state.end_year} onChange={this.handleInputChange} placeholder="End Year (required)"/>
                            </div>  
                            <button type="submit" className="btn btn-primary" onClick={this.handleFormSubmit}>Search</button>
                        </form>
                    </div>  
                </div>
                </Col>
                </Row>


                <Row>
                    <Col size="md-12" style={{textAlign: "center"}}>
                        <div className="card" style={{marginTop: "50px"}}>
                            <div className="card-header" style={{backgroundColor: "#334b72"}}>
                                <p style={{color: "#fff", textAlign: "center"}}>Search Results</p>
                            </div>
                            {this.state.articles.length ? (
                                <List>
                                  {this.state.articles.map(article => (
                                    <ListItem key={article.id}>
                                        <strong>
                                          {article.title}
                                        </strong>
                                      <SaveBtn onClick={() => this.saveArticle(article.title, article.date, article.url)} />
                                    </ListItem>
                                  ))}
                                </List>
                              ) : (
                                  <div className="card-body">
                                        <p> No Results to Display</p>
                                  </div>
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>   
        );
    }
}

export default Search;