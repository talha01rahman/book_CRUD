import React, { Component } from 'react'
import BookService from '../services/BookService'

class ListBookComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                employees: []
        }
        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteBook = this.deleteBook.bind(this);
    }

    deleteBook(id){
        BookService.deleteBook(id).then( res => {
            this.setState({employees: this.state.employees.filter(book => book.id !== id)});
        });
    }
    viewEmployee(id){
        this.props.history.push(`/view-book/${id}`);
    }
    editEmployee(id){
        this.props.history.push(`/add-book/${id}`);
    }

    componentDidMount(){
        BookService.getBook().then((res) => {
            this.setState({ employees: res.data});
        });
    }

    addEmployee(){
        this.props.history.push('/add-book/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">Book Managemen System</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addEmployee}> Add Book</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Book Title</th>
                                    <th> Authour </th>
                                    <th> Price</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.employees.map(
                                        book => 
                                        <tr key = {book.id}>
                                             <td> { book.booktitle} </td>   
                                             <td> {book.author}</td>
                                             <td> {book.price}</td>
                                             <td>
                                                 <button onClick={ () => this.editEmployee(book.id)} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteBook(book.id)} className="btn btn-danger">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewEmployee(book.id)} className="btn btn-info">View </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
        )
    }
}

export default ListBookComponent
