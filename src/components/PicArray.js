import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import {withStyles} from '@material-ui/core/styles';
import {
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';

const styles = {
  card: {
    maxWidth: 345,
    minWidth: 345,
    marginBottom: 20,
    marginRight: 13,
  },
  media: {
    height: 260,
    backgroundSize: 'contain',
  },
};

class PicArray extends Component {

  render() {
    return this.props.picArray.map((picArr, i) => (

        <Card className={this.props.classes.card} key={i}>
          <CardMedia className={this.props.classes.media}
                     image={'http://media.mw.metropolia.fi/wbma/uploads/' +
                     picArr.thumbnails.w160} title={picArr.title}/>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {picArr.title}
            </Typography>
            <Typography component="p">
              {picArr.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary" component={Link}
                    to={'/single/' + picArr.file_id}>
              View
            </Button>
          </CardActions>
        </Card>

    ));
  }
}

PicArray.propTypes = {
  picArray: PropTypes.array,
};

export default withStyles(styles)(PicArray);