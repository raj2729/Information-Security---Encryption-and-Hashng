import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import YouTubeIcon from '@material-ui/icons/YouTube';

const styles = makeStyles((theme) => ({
  footer: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 100%)",
    padding: theme.spacing(6),
  },
  icon: {
    margin: '15px'
  }
}))

const Footer = () => {
  const classes = styles()
  return (
    <footer className={classes.footer}>
      <Typography
        variant="subtitle1"
        align="center"
        color="textSecondary"
        component="p"
      >
        © 2021 Full Stack Simplified Inc. All rights reserved.
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center">
        <InstagramIcon fontSize="large" className={classes.icon} />
        <LinkedInIcon fontSize="large" className={classes.icon} />
        <FacebookIcon fontSize="large" className={classes.icon} />
        <TwitterIcon fontSize="large" className={classes.icon} />
        <YouTubeIcon fontSize="large" className={classes.icon} />
      </Typography>
    </footer>
  );
};

export default Footer;
