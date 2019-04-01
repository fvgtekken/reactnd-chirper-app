import React, { Component } from 'react'
import  {connect} from 'react-redux'
import { handleAddTweet } from '../actions/tweets'

class NewTweet extends Component {

	state = {
		text:'',
	}

	handleChange = (e) => {
		const text = e.target.value
	
		this.setState(()=>({text}))
	}

	


	handleSubmit = (e) => {

		e.preventDefault()

		const { text } = this.state
		const {dispatch, id } = this.props
		
		dispatch(handleAddTweet(text, id))

		console.log('New Tweet: ', text)

		this.setState (()=>({text:''}))
	}


	render() {
		
		const { text } = this.state
		const tweetLeft = 280 - text.lenght

		return (<div>
				<h3 className='center'>Compose new Tweet</h3>
				<form className='new-tweet' onSubmit = {this.handleSubmit}>
					<textarea 
						placeholder="What's happenig?"
						value={text}
						onChange={this.handleChange}
						className = 'textarea'
						maxLenght={280} />
						{tweetLeft <= 100 && (<div className='tweet-lenght'>{tweetLeft}</div>)}
						<button className='btn' type='submit' disabled={text===''}>
						Submit
						</button>
				</form>
		</div>)

	}
}



export default connect()(NewTweet)