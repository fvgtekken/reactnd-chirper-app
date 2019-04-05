import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatTweet, formatDate } from '../utils/helpers'
import { TiArrowBackOutline, TiHeartOutline, TiHeartFullOutline} from 'react-icons/ti/index'
import { handleToggleTweet } from '../actions/tweets'
import { Link, withRouter } from 'react-router-dom'


class Tweet extends Component {


		handleLike = (e) => {
			e.preventDefault()
			// todo: Handle like Tweet
			const {dispatch, tweet, authedUser } = this.props
			dispatch(handleToggleTweet({
				id:tweet.id,
				hasLinked: tweet.hasLinked,
				authedUser
			}))

		}

		toParent = (e, id) => {
			e.preventDefault()
			this.props.history.push(`/tweet/${id}`)
			// todo: Redirect to parent Tweet.

		}


		render () {
			const { tweet } = this.props
			
			if(tweet === null ) {
				return <p>This Tweet dosen't exist</p>
			}

			const { name, avatar, timestamp, text, hasLinked, likes, replies, id, parent } = tweet

			console.log(this.props);

			return (
				<Link to={`/tweet/${id}`} className='tweet'>
					
						<img src={avatar}
						alt={`Avatar of ${name}`} 
						className='avatar' />
							<div className='tweet-info'>
								<span>{name}</span>
								<div>{formatDate(timestamp)}</div>
								{parent && (<button className='replying-to' onClick={(e)=>this.toParent(e, parent.id)}>
								Replying to @{parent.author}</button>)}
								<p>{text}</p>
							</div>
					
					<div className = 'tweet-icons'>
						<TiArrowBackOutline className='tweet-icon' />
						<span>{replies !==0 && replies }</span>
						<button className='heart-button' onClick={this.handleLike}>
							{hasLinked===true?<TiHeartFullOutline color='#e0245e'className='tweet-icon' />:
							<TiHeartFullOutline className='tweet-icon' />}
						</button>
						<span>{likes!==0 && likes }</span>
					</div>
			  	
			  </Link>
			)
		}

}

function mapStateToProps ({authedUser, users, tweets},{id}) {

	const tweet = tweets[id]
	const parentTweet = tweet ? tweets[tweet.replyingTo]:null

	return {
		authedUser,
		tweet:tweet?formatTweet(tweet, users[tweet.author], authedUser, parentTweet):null

	}

}

export default withRouter(connect(mapStateToProps)(Tweet));