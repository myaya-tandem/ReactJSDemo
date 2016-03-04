var React = require('react');
var Reflux = require('reflux');
var ImageStore = require('../stores/image-store.jsx');
var CommentStore = require('../stores/comment-store.jsx');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var Actions = require('../actions');
var CommentBox = require('./comment-box');


module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(ImageStore, 'onChange'),
        Reflux.listenTo(CommentStore, 'onChange')
    ],
    
    getInitialState: function() {
        return {
            image: null,
            comments: null
        }  
    },
    
    componentWillMount: function() {
        Actions.getImage(this.props.params.id);
        
    },
    
    onChange: function(event, image) {
        this.setState({
            image : ImageStore.find(this.props.params.id),
            comments: CommentStore.comment
        });   
    }, 
    
    renderContent: function() {
        return <div>
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h4>{this.state.image.title}</h4>
                    <div className="panel-body">
                        {this.renderImage()}
                    </div>
                    <div className="panel-footer">
                        <h5>{this.state.image.description}</h5>
                    </div>
                    
                    
                </div>
            </div>
            <h3>Comments</h3>
            {this.renderComments()}
        </div>
    },
    
    renderImage: function() {
        if(this.state.image.animated) {
            return <video preload='auto' autoPlay='autoplay' loop='loop' webkit-playsinline>
              <source src={this.state.image.mp4} type="video/mp4" />
            </video>
        } else {
            return <img src={this.state.image.link} />   
        }
    },
    
    renderComments : function() {
        if(!this.state.comments) {
            return null;   
        }
        
        return <CommentBox comments={this.state.comments} />
    },
    
    render: function() {
        return <div className="image-detail">
            {(this.state.image) ? this.renderContent() : null }
        </div>
    }  
});
