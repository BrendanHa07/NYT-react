import axios from "axios";

export default {
    // get all articles
    getArticles: function() {
        return axios.get("/api/articles");
    },

    // get article with given id
    getArticle: function(id) {
        return axios.get("/api/articles/" + id);
    },

    // delete article with a given id
    deleteArticle: function(id) {
        return axios.delete("/api/articles/" + id);
    },

    // save article to database
    saveArticle: function(articleData) {
        return axios.post("/api/articles", articleData);
    },

    // update article to database
    updateArticle: function(articleData) {
        return axios.put("/api/articles/", articleData);
    },

    // get all saved articles
    getSavedArticles: function() {
        return axios.get("/api/articles/saved");
    }
};