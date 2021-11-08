import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import { Storage } from 'aws-amplify'

class App extends Component {
  state = {fileUrl: '', file: '', filename: ''}
  handleChange = e => {
    const file = e.target.files[0]
    this.setState({
      fileUrl: URL.createObjectURL(file),
      file,
      filename: file.name
    })
  }

  saveFile = () =>{
    Storage.put(this.state.filename, this.state.file)
    .then(()=> {
      this.setState({fileUrl: '', file: '', filename: ''})
    })
    .catch(err => {
      console.log('error uploading file', err)
    })
  }
  render(){
  return (
    <div className="App">
      <form className="form-horizontal">
        <input type='file' onChange={this.handleChange}/>
        <img src={this.state.fileUrl}/>
        <button onClick={this.saveFile}>Save File</button>
      </form>
      <AmplifySignOut />
    </div>
  );
}
}

export default withAuthenticator(App);