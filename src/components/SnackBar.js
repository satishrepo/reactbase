import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Alert from '@material-ui/lab/Alert'

export default function SimpleSnackbar(props) {

	const [open, setOpen] = useState(props.show)
	const message = props.message
	const type = props.type

	const handleClick = () => {
		setOpen(true);
	};

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};

	const simpleSnackbar = () => {
		return <div>
			{/* <Button onClick={handleClick}>Open simple snackbar</Button> */}
			<Snackbar
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				severity="error"
				open={open}
				autoHideDuration={6000}
				onClose={handleClose}
				message={message}
				action={
					<React.Fragment>
						{/* <Button color="secondary" size="small" onClick={handleClose}>
                UNDO
            </Button> */}
						<IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
							<CloseIcon fontSize="small" />
						</IconButton>
					</React.Fragment>
				}
			/>
		</div>
	}


	return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{
			vertical: 'bottom',
			horizontal: 'left',
		}}>
			<Alert onClose={handleClose} severity={type}>{message}</Alert>
		</Snackbar>
  );
}
