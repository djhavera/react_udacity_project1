import React from 'react'
import * as BooksAPI from './BooksAPI'
//import * as Shelf from './Shelf'
import './App.css'
import {Link, Route} from 'react-router-dom'
import HomePage from "./HomePage.js";
import Search from "./Search.js"

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    showSearchPage: false,
    currentlyReading: [],
    currentlyReadingID: [],
    wantToRead: [],
    wantReadId: [],
    read: [],
    readId: []
  };

  async componentDidMount(){
    await this.fetchAPI()
    console.log(this.state.currentlyReadingID)
    console.log(this.state.wantReadId)
    console.log(this.state.readId)
  };

  fetchAPI = async () => {
    try{
        const books = await BooksAPI.getAll()
        console.log({books})
        const currentlyReading = await books.filter(book => book.shelf === "currentlyReading");
        const currentlyReadingID = await currentlyReading.map(book => book.id);
        //
        const wantToRead = await books.filter(book => book.shelf === "wantToRead")
        const wantToReadId = await wantToRead.map(book => book.id);
        //
        const read = await books.filter(book => book.shelf === "read"); 
        const readId = await read.map(book => book.id);

        this.setState(() => ({
          books: books,
          currentlyReading: currentlyReading,
          currentlyReadingID: currentlyReadingID,
          wantToRead: wantToRead,
          wantReadId: wantToReadId,
          read: read,
          readId: readId,
          }));                     
    } catch(error) {
          console.log(error)
    }
  };
//https://medium.com/@agm1984/reacts-setstate-is-a-special-function-and-it-helps-with-asynchronous-concurrency-669eddbe3dd1
//https://dev.to/cesareferrari/how-to-use-componentdidupdate-in-react-30en  
componentDidUpdate = async (prevProps, prevState)  => {
    if (
        JSON.stringify(prevState.readId) !== JSON.stringify(this.state.readId)
        ||
        JSON.stringify(prevState.wantReadId) !== JSON.stringify(this.state.wantReadId)
        ||
        JSON.stringify(prevState.currentlyReadingID) !== JSON.stringify(this.state.currentlyReadingID)
      ) 
      {
        await this.fetchAPI();
        console.log("component did update")
    }
  }

  changeShelf = async (event, book) => {
    try{
      //console.log(await event.target.value)
      let newShelf = await event.target.value;
      
      const bookObj = {
          id: book.id,
          imageURL: book.imageLinks.thumbnail,
          title: book.title,
          authors: book.authors
      };
     
        console.log(bookObj)
        let updatedBooks = await BooksAPI.update(bookObj, newShelf) 
                console.log({updatedBooks})
        this.setState(() => ({
                  readingsId: updatedBooks.currentlyReading,
                  wantToReadId: updatedBooks.wantToRead,
                  readId: updatedBooks.read}))
                  //() => {this.componentDidUpdate()}
       
      } catch(error) {
              console.log(error)
        }
                    
    };
  // used to return main page
  changeSearchPage = async () => {
    this.setState(() => ({
      showSearchPage: false
    }))
  };

  changeMainPage = async () => {
    this.setState(() => ({
      showSearchPage: true
    }))
  }

  onChangeSearchBook = async (book) => {
    if(this.state.readingsId.includes(book.id)){
      return("currentlyReading")
    } else if(this.state.wantReadId.includes(book.id)){
      return("wantToRead")
    } else if(this.state.readId.includes(book.id)){
      return("read")
    } else{
      return("none")
    }
  };

  render() {

    return (


      <div className="app">

         <Route exact path='/'>
            <HomePage 
              currentlyReading={this.state.currentlyReading}
              readingsId={this.state.readingsId}
              wantToRead={this.state.wantToRead}
              wantReadId={this.state.wantToReadId}
              read={this.state.read}
              readId={this.state.readId}
              changeShelf={this.changeShelf}
              fetchAPI={this.fetchAPI}
              />
            <Link to='/search' className="open-search">
              <button>Add a book</button>
            </Link>  
          </Route>
          <div>
          <Route exact path='/search'>
            <Search 
                  books={this.state.books}
                  changeShelf={this.changeShelf}
                  fetchAPI={this.fetchAPI}
            />
          </Route>
          </div>
     </div>
    )
  }
}

export default BooksApp
/*
               <Search
          search={this.changeSearchPage}
          currentlyReading={this.state.currentlyReading}
          changeShelf={this.changeShelf}
          onChangeSearchBook={this.onChangeSearchBook}
        />
*/
/*
<Link to={{
 pathname: '/courses',
 search: '?sort=name',
 hash: '#the-hash',
 state: { fromDashboard: true }
}}>
 Courses
</Link>*/
