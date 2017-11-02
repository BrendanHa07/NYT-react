import React, {Component} from "react";
import axios from "axios";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Input, FormBtn } from "./Form";


class Search extends Component {
    // Setting intial values
    state = {
        articles: [],
        topic: "",
        start_year: "",
        end_year: ""
    };

    // Load articles
    componentDidMount () {
        this.loadArticles();
    }

    loadArticles = () => {
        API.getArticles()
            .then(res =>
                this.setState({ articles: res.data, topic: "", start_year: "", end_year: ""})
            )
            .catch(err => console.log(err));
    };

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

        // API URL with api key
        const apiKey = "e497d9b362d54fbfa57fcc3c48800b95";
        let queryURL = `http://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${apiKey}&q=${topic}`;

        // Get request
        axios.get(queryURL)
            .then(function(response) {
                console.log(response);
               API.saveArticle({
                   title: this.state.headline.main,
                   url: this.state.web_url
               })
               .then( res => this.loadArticles())
               .catch(err => console.log("Error with submit"))
            })
            .catch( err => console.log(err));
    };

    // Delete article
    deleteArticle = id => {
        API.deleteArticle(id)
            .then( res => this.loadArticles())
            .catch( err => console.log(err));
    };

    // Load saved articles
    loadSavedArticles = () => {
        API.getSavedArticles()
            .then(res => 
                this.setState({ articles: res.data, topic: "", start_year: "", end_year: ""})
            )
            .catch(err => console.log(err))
    };

    render() {
        return(
            <div>
                <div className="card">
                    <div className="card-header text-center">
                        <p>Search Articles</p>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                            <input type="text" class="form-control" id="topic" name="topic" value={this.state.topic} onChange={this.handleInputChange} placeholder="Topic (required)" />
                            </div>
                            <div className="form-group">
                                <input id="start_year" type="text" name="start_year" className="form-control" value={this.state.start_year} onChange={this.handleInputChange}placeholder="Start Year (required)"/>
                            </div>
                            <div className="form-group">
                                <input id="end_year" type="text" name="end_year" className="form-control" value={this.state.end_year} onChange={this.handleInputChange}placeholder="End Year (required)"/>
                            </div>  
                            <button type="submit" className="btn btn-primary" onClick={this.handleFormSubmit}>Search</button>
                        </form>
                    </div>  
                </div>
            </div>
        )
    }
}

export default Search;