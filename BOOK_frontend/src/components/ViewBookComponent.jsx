import React, { Component } from 'react'
import BookService from '../services/BookService'

class ViewBookComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            book: {}
        }
    }

    componentDidMount(){
        BookService.getbookById(this.state.id).then( res => {
            this.setState({book: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Book Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Book Titel : </label>
                            <div> { this.state.book.booktitle }</div>
                        </div>
                        <div className = "row">
                            <label> Author Name : </label>
                            <div> { this.state.book.author }</div>
                        </div>
                        <div className = "row">
                            <label> Price : </label>
                            <div> { this.state.book.price }</div>
                        </div>
                    </div>
                     

                </div>
            </div>
        )
    }
}

export default ViewBookComponent
