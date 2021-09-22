import { AppBar, Toolbar, IconButton, Container, InputBase, Card, Avatar, CardHeader, CardActions, Collapse, CardContent, Typography, Button, Modal, Paper, TextField, Grid } from '@material-ui/core'
import { makeStyles, alpha } from '@material-ui/core/styles'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ReplyIcon from '@material-ui/icons/Reply';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import React, { useState } from 'react'

const styles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            }
        }
    },
    card: {
        marginBottom: '10px'
    },
    add: {
        position: "fixed",
        bottom: theme.spacing(2),
        right: theme.spacing(3),
        fontSize: 'large'
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        alignContent: 'center',
        width: '50%',
        padding: '10px'
    },
    post: {
        marginTop: '10px'
    }
}))

function DiscussionForum() {
    const classes = styles()
    const queries = [{ 'profile': { 'profile_pic': 'https://res.cloudinary.com/dizvyn9b5/image/upload/v1632215752/mtxpeyrrjcbmmuygtj5z.jpg', 'name': 'Riya Singh' }, 'date_posted': 'September 21, 2021', 'query': 'When will I get it back?', 'replies': [{ 'name': 'Rohit', 'date_posted': 'September 22, 2021', 'reply': 'By typing it' }, { 'name': 'Rohit', 'date_posted': 'September 22, 2021', 'reply': 'By typing it' }] },
    { 'profile': { 'profile_pic': 'https://res.cloudinary.com/dizvyn9b5/image/upload/v1632215752/mtxpeyrrjcbmmuygtj5z.jpg', 'name': 'Riya Singh' }, 'date_posted': 'September 21, 2021', 'query': 'How do i do the assignment?', 'replies': [{ 'name': 'Rohit', 'date_posted': 'September 22, 2021', 'reply': 'By typing it' }, { 'name': 'Rohit', 'date_posted': 'September 22, 2021', 'reply': 'By typing it' }] },
    { 'profile': { 'profile_pic': 'https://res.cloudinary.com/dizvyn9b5/image/upload/v1632215752/mtxpeyrrjcbmmuygtj5z.jpg', 'name': 'Riya Singh' }, 'date_posted': 'September 21, 2021', 'query': 'How do i do the assignment? When will I get it backvuirnuienruincuw wjnbciuwbi uwefbyb iuwbefub', 'replies': [{ 'name': 'Rohit', 'date_posted': 'September 22, 2021', 'reply': 'By typing it' }, { 'name': 'Rohit', 'date_posted': 'September 22, 2021', 'reply': 'By typing it' }] }]
    const [expanded, setExpanded] = React.useState(-1);

    const handleExpandClick = (i) => {
        setExpanded(expanded === i ? -1 : i);
    };

    const [filter, setFilter] = useState('')

    const [open1, setOpen1] = React.useState(false);
    const handleOpen1 = () => setOpen1(true);
    const handleClose1 = () => setOpen1(false);

    const [open2, setOpen2] = React.useState(false);
    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => setOpen2(false);

    const [reply, setReply] = useState('')
    const handlePostReply = () => {
        console.log(reply)
        handleClose1()
    }

    const [query, setQuery] = useState('')
    const handlePostQuery = () => {
        console.log(query)
        handleClose2()
    }

    return (
        <Container>
            <AppBar position="static">
                <Toolbar>
                    <Typography className={classes.title} variant='h4'>Discussion Forum</Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            onChange={(e) => setFilter(e.target.value)}
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                </Toolbar>
            </AppBar>
            <br />
            {queries.map((query, index) => {
                const profile = query.profile
                if (query.query.includes(filter)) {
                    return (
                        <Card key={index} className={classes.card}>
                            <CardHeader
                                avatar={
                                    <Avatar src={profile.profile_pic} />
                                }
                                title={profile.name}
                                subheader={query.date_posted}
                            />
                            <CardContent>
                                <Grid container spacing={2}>
                                    <Grid item xs={10}>
                                        <Typography variant="h6" color="textSecondary">
                                            {query.query}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={2} md={2}>
                                        <CardActions disableSpacing>
                                            <IconButton
                                                onClick={() => handleExpandClick(index)}
                                                aria-expanded={expanded === index}
                                                aria-label="show more"
                                            >
                                                <Typography>Replies</Typography>
                                                {expanded === index ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                            </IconButton>
                                            <IconButton
                                                onClick={handleOpen1}
                                            >
                                                <Typography>Reply</Typography>
                                                <ReplyIcon />
                                            </IconButton>
                                        </CardActions>
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <Collapse in={expanded === index} timeout="auto" unmountOnExit>
                                {query.replies.map((reply, index) => {
                                    return (
                                        <Container key={index}>
                                            <Typography variant='h5'>{reply.name}</Typography>
                                            <Typography variant='caption'>
                                                {reply.date_posted}
                                            </Typography>
                                            <Typography paragraph>
                                                {reply.reply}
                                            </Typography>
                                        </Container>
                                    )
                                })}
                            </Collapse>
                        </Card>
                    )
                }
            })
            }
            <Button
                variant='contained'
                color='primary'
                startIcon={<AddIcon />}
                className={classes.add}
                onClick={handleOpen2}
            >
                Ask Query
            </Button>
            <Modal
                className={classes.modal}
                open={open1}
                onClose={handleClose1}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Paper className={classes.paper}>
                    <TextField
                        variant='outlined'
                        label='Enter your Reply'
                        multiline
                        maxRows={20}
                        fullWidth
                        className={classes.text}
                        onChange={(e) => setReply(e.target.value)}
                    />
                    <Button
                        variant='contained'
                        color='primary'
                        className={classes.post}
                        onClick={handlePostReply}
                    >
                        Post Reply
                    </Button>
                </Paper>
            </Modal>
            <Modal
                className={classes.modal}
                open={open2}
                onClose={handleClose2}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Paper className={classes.paper}>
                    <TextField
                        variant='outlined'
                        label='Enter your Query'
                        multiline
                        maxRows={20}
                        fullWidth
                        className={classes.text}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <Button
                        variant='contained'
                        color='primary'
                        className={classes.post}
                        onClick={handlePostQuery}
                    >
                        Post Query
                    </Button>
                </Paper>
            </Modal>
        </Container >
    )
}

export default DiscussionForum
