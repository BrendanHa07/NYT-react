import React, {Component} from "react";
import SaveBtn from "./SaveBtn";
import { List, ListItem } from "./List"
import axios from "axios";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "./Grid"
import { Input, FormBtn } from "./Form";


class Saved extends Component {

    state= {
        articles: []
    };

    componentDidMount() {
        this.loadArticles();
    }

     // Load Saved Articles
  loadArticles = () => {
    API.getArticles()
    .then(res =>
      this.setState({ articles: res.data })
    )
    .catch(err => console.log(err));
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
                    <Col size="md-12" >
                    <div className="card" >
                        <div className="card-header" style={{backgroundColor: "#334b72"}}>
                            <p style={{color: "#fff", textAlign: "center"}}>Saved Articles</p>
                        </div>
                        {this.state.articles.length ? (
                                <List>
                                    {this.state.articles.map(article => (
                                        <ListItem key={article._id}>
                                            <strong>
                                                <div>
                                                    {article.title}
                                                </div>
                                                <div>
                                                    <Link to={article.url}>{article.url}</Link>
                                                 </div>  
                                            </strong>
                                            <button className="btn btn-default" onClick={() => this.deleteArticle(article._id)} style={{float: "right"}}>Delete Article</button>
                                        </ListItem>
                                     ))}
                                </List>
                            ) : (
                                <div className="card-body">
                                    <p> No Results to Display </p>
                                </div>
                                
                            )}
                    </div>
                    </Col>
                </Row>
            </Container>
        )
    }
};

export default Saved;