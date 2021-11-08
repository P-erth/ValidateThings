import React, {Component} from 'react';
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
      console.log('todo bien cargando imagen')
      this.setState({fileUrl: '', file: '', filename: ''})
    })
    .catch(err => {
      console.log('error uploading file', err)
    })
  }
  render(){
  return (
    <div className="App">
      <text> Ingrese CBU </text>
      <input type='text'/>
      <form className="form-horizontal">
        <input type='file' onChange={this.handleChange}/>
        <img src={this.state.fileUrl}/>
      </form>
        <button onClick={this.saveFile}>Confirmar</button>
      <AmplifySignOut />
    </div>
  );
}
}

export default withAuthenticator(App);