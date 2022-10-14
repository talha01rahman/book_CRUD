import React, { Component } from 'react'
import BookService from '../services/BookService';

class UpdateBookComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            booktitle: '',
            author: '',
            price: ''
        }
        this.changebooktitleHandler = this.changebooktitleHandler.bind(this);
        this.changeauthorHandler = this.changeauthorHandler.bind(this);
        this.updateBook = this.updateBook.bind(this);
    }

    componentDidMount(){
        BookService.getbookById(this.state.id).then( (res) =>{
            let book = res.data;
            this.setState({booktitle: book.booktitle,
                author: book.author,
                price : book.price
            });
        });
    }

    updateBook = (e) => {
        e.preventDefault();
        let book = {booktitle: this.state.booktitle, author: this.state.author, price: this.state.price};
        console.log('book => ' + JSON.stringify(book));
        console.log('id => ' + JSON.stringify(this.state.id));
        BookService.updateBook(book, this.state.id).then( res => {
            this.props.history.push('/employees');
        });
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

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update Book</h3>
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
                                            <input placeholder="Email Address" name="price" className="form-control" 
                                                value={this.state.price} onChange={this.changeEmailHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.updateBook}>Save</button>
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

export default UpdateBookComponent
