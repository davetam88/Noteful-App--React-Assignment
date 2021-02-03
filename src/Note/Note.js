import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Note.css'
import NotefulContext from '../App/NotefulContext';
import config from '../App/config';
import PropTypes from 'prop-types';

function deleteNote(NoteId, callback) {
	const url = config.API_ENDPOINT + `/notes/${NoteId}`;
	fetch(url, {
		method: 'DELETE',
		headers: {
			'content-type': 'application/json'
		},
	})
		.then(res => {
			if (!res.ok)
			{
				return res.json().then(error => {
					// then throw it
					throw error
				})
			}
			return res.json()
		})
		.then(data => {
			callback(NoteId)
		})
		.catch(error => {
			alert(error);
			// console.error(error)
		})
}

export default function Note(props) {
	return (
		<NotefulContext.Consumer>
			{(context) => {

				return (
					< div className='Note'>
						<h2 className='Note__title'>
							<Link to={`/note/${props.id}`}>
								{props.name}
							</Link>
						</h2>

						<button className='Note__delete'
							type='button'
							onClick={() => {
								deleteNote(
									props.id,
									context.deleteNote,
								)
							}}
						>
							<FontAwesomeIcon icon='trash-alt' />
							{' '}
			remove
			</button>
						<div className='Note__dates'>
							<div className='Note__dates-modified'>
								Modified
				{' '}
								<span className='Date'>
									{format(props.modified, 'Do MMM YYYY')}
								</span>
							</div>
						</div>
					</div >
				)
			}
			}
		</NotefulContext.Consumer>
	)
}

Note.propTypes = {
	id: PropTypes.string,
	name: PropTypes.string,
	modified: PropTypes.string
}
