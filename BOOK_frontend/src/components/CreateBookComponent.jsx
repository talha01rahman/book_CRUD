import React, { Component } from 'react'
import BookService from '../services/BookService';

class CreateBookComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            booktitle: '',
            author: '',
            price: ''
        }
        this.changebooktitleHandler = this.changebooktitleHandler.bind(this);
        this.changeauthorHandler = this.changeauthorHandler.bind(this);
        this.saveOrUpdatebook = this.saveOrUpdatebook.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            BookService.getbookById(this.state.id).then( (res) =>{
                let book = res.data;
                this.setState({booktitle: book.booktitle,
                    author: book.author,
                    price : book.price
                });
            });
        }        
    }
    saveOrUpdatebook = (e) => {
        e.preventDefault();
        let book = {booktitle: this.state.booktitle, author: this.state.author, price: this.state.price};
        console.log('book => ' + JSON.stringify(book));

        // step 5
        if(this.state.id === '_add'){
            BookService.createBook(book).then(res =>{
                this.props.history.push('/employees');
            });
        }else{
            BookService.updateBook(book, this.state.id).then( res => {
                this.props.history.push('/employees');
            });
        }
    }
    
    changebooktitleHandler= (event) => {
        this.setState({booktitle: event.target.value});
    }

    changeauthorHandler= (event) => {
        this.setState({author: event.target.value});
    }

    changeEmailHandler= (event) => {
        this.setState({price: event.target.value});
    }

    cancel(){
        this.props.history.push('/employees');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Book</h3>
        }else{
            return <h3 className="text-center">Update Book</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Book Title: </label>
                                            <input placeholder="Book Title" name="booktitle" className="form-control" 
                                                value={this.state.booktitle} onChange={this.changebooktitleHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Author: </label>
                                            <input placeholder="Author" name="author" className="form-control" 
                                                value={this.state.author} onChange={this.changeauthorHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Price: </label>
                                            <input placeholder="Price" name="price" className="form-control" 
                                                value={this.state.price} onChange={this.changeEmailHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.saveOrUpdatebook}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default CreateBookComponent
