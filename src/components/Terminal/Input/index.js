import React from 'react';

export default class Input extends React.Component {
	constructor(props) {
		super(props);
		this.user = props.user;
		this.historyIndex = 0;
	}
	handleChange(e) {
		this.props.setValue(e.target.value);
	}
	handleKeyDown(e) {
		switch (e.keyCode) {
			case 13: //Enter
				e.preventDefault();
				this.newCommand();
				break;
			case 38: //Up
				e.preventDefault();
				if (this.props.commandCount > 0 && this.historyIndex < this.props.commandCount) {
					this.props.prevCommand(this.props.commandCount-this.historyIndex-1);
					this.historyIndex++;
				}
				break;
			case 40: //down
				e.preventDefault();
				if (this.props.commandCount > 0 && this.historyIndex-1 > 0) {
					this.props.prevCommand(this.props.commandCount-this.historyIndex+1);
					this.historyIndex--;
				} else if (this.historyIndex == 1) {
					this.props.clearCommand();
					this.historyIndex--;
				}
				break;
		}
	}
	newCommand() {
		switch (this.props.value) {
			case 'clear':
				this.historyIndex = 0;
				this.props.clearHistory();
				break;
			default:
				this.props.newCommand();
		}
	}
	render() {
		return(
			<div className="terminal__command">
				<span className="terminal__command__user">{this.user}</span>
				<input
					className="terminal__command__input"
					type="text"
					value={this.props.value}
					onChange={this.handleChange.bind(this)}
					onKeyDown={this.handleKeyDown.bind(this)}
					autoComplete={false}
					autoFocus
				/>
			</div>
		);
	}
}