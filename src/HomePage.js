import React from "react";
import CurrentlyReading from "./CurrentlyReading"; 
import WantToRead from "./WantToRead";
import Read from "./Read";

class HomePage extends React.Component{


    render(){
        // https://blog.bitsrc.io/managing-derived-state-from-props-in-react-f26b5b15069
        // It is not advisable to store anything in a state that can be derived from props at any point in time
        const wantToReadId = this.props.wantToReadId;
        const readId = this.props.readId;
        const readingsId = this.props.readingsId;
        const currentlyReading = this.props.currentlyReading;
        const wantToRead = this.props.wantToRead;
        const read = this.props.read;

        return(
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <CurrentlyReading
                 onChange={this.props.changeShelf}
                 readingBooks={currentlyReading}
                 readingsId={readingsId} 
                 fetchAPI={this.props.fetchAPI}/>

                <Read
                 onChange={this.props.changeShelf}
                 read={read}
                 readId={readId}
                 fetchAPI={this.props.fetchAPI}
                />
                <WantToRead
                 onChange={this.props.changeShelf}
                 wantToRead={wantToRead} 
                 wantToReadId={wantToReadId}
                 fetchAPI={this.props.fetchAPI}/>     
              </div>
            </div>
            
            <div className="open-search">
              <button onClick={this.props.HomePage}>Add a book</button>
            </div>
          </div>
        )
    }
};

export default HomePage;