import React, {useState, useContext, useEffect} from 'react'
import EventContext from '../../context/event/eventContext'
// import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
// import CloseIcon from '@material-ui/icons/Close'
// import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import {FormControlLabel, TextField} from '@material-ui/core'
import Button from '@material-ui/core/Button'
import {Send} from '@material-ui/icons'
import {KeyboardDateTimePicker, MuiPickersUtilsProvider} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import Checkbox from '@material-ui/core/Checkbox'

const EventForm = () => {
    const eventContext = useContext(EventContext)
    const {addEvent, updateEvent, clearCurrent, current} = eventContext

    useEffect(() => {
        if (current !== null) {
            setEvent(current)
        } else {
            setEvent({
                name: '',
                description: '',
                startDate: undefined,
                finishDate: undefined,
                location: '',
                image: undefined,
            })
        }
    }, [eventContext, current])

    const [event, setEvent] = useState({
        name: '',
        description: '',
        startDate: undefined,
        finishDate: undefined,
        location: '',
        image: undefined,
    })
    const {name, description, startDate, finishDate, location, image} = event

    const [links, setLinks] = useState([{
        name: '',
        url: '',
    }])

    const onChange = e =>
        setEvent({...event, [e.target.name]: e.target.value})
    const onStartDateChange = date =>
        setEvent({...event, startDate: new Date(date)})
    const onFinishDateChange = date =>
        setEvent({...event, finishDate: new Date(date)})

    const onSubmit = e => {
        e.preventDefault()
        if (!checked) {
            setEvent({...event, finishDate: undefined})
        }
        if (current === null) {
            addEvent(event)
        } else {
            updateEvent(event)
        }
        clearAll()
    }

    const clearAll = () => clearCurrent()

    const [checked, setChecked] = React.useState(false)
    const handleCheck = e => setChecked(e.target.checked)

    return (
        <div className="panel form events">
            <form className="event" onSubmit={onSubmit} encType="multipart/form-data">
                <div className="header">
                    <div className="background" />
                    <span className="title">Event</span>
                </div>
                {/*{error !== '' ?*/}
                {/*    <div className="row alert error">*/}
                {/*        <ErrorOutlineIcon className="icon" />*/}
                {/*        <div className="message">{error}</div>*/}
                {/*        <div className="close" onClick={clearAlerts}>*/}
                {/*            <CloseIcon />*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    : ''*/}
                {/*}*/}
                {/*{success !== '' ?*/}
                {/*    <div className="row alert success">*/}
                {/*        <CheckCircleOutlineIcon className="icon" />*/}
                {/*        <div className="message">{success}</div>*/}
                {/*        <div className="close" onClick={clearAlerts}>*/}
                {/*            <CloseIcon />*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    : ''*/}
                {/*}*/}
                <div className="row">
                    <TextField
                        className="formField"
                        label="Event name"
                        type="text"
                        autoComplete="current-first-name"
                        variant="outlined"
                        name="name"
                        value={name}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="row">
                    <TextField
                        className="formField mini-scrollbar round-scrollbar"
                        label="Event description"
                        type="text"
                        variant="outlined"
                        name="description"
                        multiline
                        rows="8"
                        rowsMax="8"
                        value={description}
                        inputProps={{
                            className: 'mini-scrollbar round-scrollbar',
                        }}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="row">
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDateTimePicker
                            className="formField"
                            variant="inline"
                            value={startDate}
                            name="startDate"
                            onChange={onStartDateChange}
                            inputVariant="outlined"
                            label="Start date"
                            inputProps={{name: 'startDate'}}
                            // onError={console.log}
                            format="MM/dd/yyyy hh:mm a"
                            required
                        />
                    </MuiPickersUtilsProvider>
                </div>
                <FormControlLabel
                    className="row toggle"
                    label="Toggle event end date"
                    control={
                        <Checkbox
                            className="checkbox"
                            checked={checked}
                            onChange={handleCheck}
                            value="primary"
                            inputProps={{'aria-label': 'primary checkbox'}}
                        />
                    }

                />
                <div className="row">
                    {checked && (
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDateTimePicker
                                className="formField"
                                variant="inline"
                                value={finishDate}
                                name="finishDate"
                                onChange={onFinishDateChange}
                                inputVariant="outlined"
                                label="Finish date"
                                inputProps={{name: 'finishDate'}}
                                // onError={console.log}
                                format="MM/dd/yyyy hh:mm a"
                                disablePast
                            />
                        </MuiPickersUtilsProvider>
                    )}
                </div>
                <div className="row">
                    <TextField
                        className="formField"
                        label="Event location"
                        type="text"
                        variant="outlined"
                        name="location"
                        value={location}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="row">
                    <TextField
                        className="formField"
                        helperText="Event image (.png / .jpg)"
                        type="file"
                        accept="image/*"
                        variant="outlined"
                        name="image"
                        value={image}
                        onChange={onChange}
                        // required
                    />
                </div>
                <div className="row">
                    <Button
                        variant="contained"
                        // color="primary"
                        className="formSubmit"
                        endIcon={<Send />}
                        type="submit"
                    >
                        {current ? 'Update' : 'Add Event'}
                    </Button>
                    {current && (
                        <Button
                            variant="contained"
                            // color="primary"
                            className="formSubmit"
                            endIcon={<Send />}
                            onClick={clearAll}
                            type="submit"
                        >
                            Clear
                        </Button>
                    )}
                </div>
            </form>
        </div>
    )
}

export default EventForm
