import React from 'react';
import * as BooksAPI from './BooksAPI';
import SearchPage from './SearchPage';
import {Link} from 'react-router-dom';


class Search extends React.Component
{
    state={
        query:'',
        value: '',
        queryResult: []
    }
    searchTerms=['Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS']
    
    handleChange = async (event) => {
        this.setState({value: event.target.value.trim()});
    }

      componentDidUpdate = async (prevProps, prevState) => {
        console.log('The following search was submitted: ' + this.state.value);
        if(this.state.value !== prevState.value){
            let books = await BooksAPI.search(this.state.value)
            debugger
            console.log(books)
            this.setState({ queryResult: books})
          }
          else {
              console.log("No Search")
          }
      };

    render(){
        const {query, value, queryResult} = this.state;
        return(
            <div className="bookshelf">
            <h2 className="bookshelf-title">Search Results</h2>
            <div>{this.state.value}</div>
            <div>
          <div className="search-books-bar">
            <div className="search-books-input-wrapper">
              <input type="text" placeholder="Search by title or author"
                value={value} onChange={this.handleChange}/>
            </div>
          </div>
            <Link
                to='/'
                className="close-search"
            >
                Close
            </Link>
            </div>
            <SearchPage
                 onChange={this.props.changeShelf}
                 books={queryResult}
                 fetchAPI={this.props.fetchAPI}
            />
            <div>
             
            </div>
          </div>
        )
    }

    }

export default Search;
/*

    
      handleSubmit = async (event) => {
        //const valueFilter= this.searchTerms.filter(term=>term.toLowerCase().includes(this.state.value.trim()))
        //console.log(valueFilter) 
        console.log('The following search was submitted: ' + this.state.value);
        debugger
        //alert('The following search was submitted: ' + this.state.value);
        let query = await BooksAPI.search("Art")
        debugger    
        //let queryResult// =  await query.map(book => (this.props.books.filter((b) => b.id === book.id).map(b => book.shelf = b.shelf)))
            //this.setState({ queryResult: queryResult,
              //              query:query})
           
            //console.log('The following search was fetched from API: ' + queryResult)
      console.log("Hi David")
      console.log('The following search was fetched from API: ' + await query)
        event.preventDefault();
    debugger
      }
            <div className="bookshelf-books">
              <ol className="books-grid">
                  {this.props.books.map((book) => (
                    <li key={book.id}>
                      <div className="book">
                        <div className="book-top">
                          <div className="book-cover" style={{ width: 128, height: 193, 
                            backgroundImage: `url(${book.imageLinks.thumbnail})`}}>
                          </div>
                          <div className="book-shelf-changer">
                            <select value="read" onChange={(event) => this.props.onChange(event, book)}>
                              <option value="move" disabled>Move to...</option>
                              <option value="currentlyReading">Currently Reading</option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                          </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">{book.authors}</div>
                      </div>
                    </li>
                  ))
                  }
              </ol>
            </div>
    handleSearch= async (e)=>{
 
        const queryFilter=this.searchTerms.filter(term=>term.toLowerCase().includes(this.state.query.trim()))
        if(this.state.query.length>0 && queryFilter.length!==0)
        {
            BooksAPI.search(this.state.query.trim())
                    .then((response) => 
                    {
                        if (!response.error && response.length!==undefined)
                        {
                            response.map(book => (this.props.books.filter((b) => b.id === book.id).map(b => book.shelf = b.shelf)))
                            this.setState({queryResult: response})
                        }
                    })
        }     
    }
                <input type="text" placeholder="Search by title or author"
                value={this.state.query}
                onChange={this.handleSearch}*/