var React = require('react');
var ImageStore = require('../stores/image-store.jsx');
var Actions = require('../actions.jsx');
var Reflux = require('reflux');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var ImagePreview = require('./image-preview.jsx');

var ReactPaginate = require('react-paginate');


module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(ImageStore, 'onChange') 
    ],
    
    
    getInitialState: function() {
      return {
        images: [],
        pageNum: 10,
        offset: 1
      }  
    },
    
    componentWillMount: function() {
        
        Actions.getImages(this.props.params.id, this.state.offset);
           
    },
    
    componentWillReceiveProps: function(nextProps) {
        console.log('receiving props');
        Actions.getImages(nextProps.params.id, this.state.offset);
            
    },
    
    onChange: function(event, images) {
        this.setState({
            images : images 
        });
    },
    
    handlePageClick: function(data) {
        var newOffset = (data.selected + 1);
        Actions.getImages(this.props.params.id, newOffset);
        this.setState({
            offset : newOffset
        });
        
        //console.log(this.state.offset);
    },
    
    renderImages: function() {
        return this.state.images.slice(0, 20).map(function(image) {
            return <ImagePreview key={image.id} {...image} /> 
        });
    },
    
   render: function() {
       return <div><div className="topic">
       {this.renderImages()}
       </div>
           <div id="react-paginate">
       
       <ReactPaginate previousLabel={"previous"}
                       nextLabel={"next"}
                       breakLabel={<li className="break"><a href="">...</a></li>}
                       pageNum={this.state.pageNum}
                       marginPagesDisplayed={2}
                       pageRangeDisplayed={5}
                       clickCallback={this.handlePageClick}
                       containerClassName={"pagination"}
                       subContainerClassName={"pages pagination"}
                       activeClassName={"active"} />
       </div>
       </div>
   }
    
});