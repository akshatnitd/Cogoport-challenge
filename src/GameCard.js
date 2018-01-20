import React, {Component} from 'react';
import {Card, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import HardwareVideogameAsset from 'material-ui/svg-icons/hardware/videogame-asset';
import Devices from 'material-ui/svg-icons/device/devices';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';

class GameCard extends Component {
  constructor(props) {
    super(props);
    this.styles = {
      card: {
        width: 'auto',
        height: 400,
        margin: 10,
        float: 'left',
        maxWidth: 400,
        marginTop:10
      },

      title: {
        paddingRight: 16,
        fontWeight: 'bold',
        fontSize: 16,
        lineHeight: 1.2,
        whiteSpace: 'no-wrap',
        textDecoration: 'none',
        display: 'inline-block'
      },

      text: {
        display: 'flex',
        flexWrap: 'wrap' 
      },

      rating: {
        color: '#000',
        fontWeight: 'bold'
      },
      chip: {
        margin: 4
      }
    };
  }


  render() {
   
    return (
    
      <Card style={this.styles.card}>
        <CardMedia>
          <img src="https://is1-ssl.mzstatic.com/image/thumb/Purple62/v4/c0/ee/90/c0ee9015-67da-3c2c-4dfa-03ca45f17481/mzm.zhriopiy.png/1200x630bb.jpg" style={{height: 200, objectFit: 'cover'}} />
          {this.props.e_choice === 'Y' ? 
            <div style={{position: 'absolute', top:10}}>
            <img src="https://informedlifestyle.com/wp-content/uploads/2016/03/editors_choice_badge.png" style={{height: 50, float: 'right', marginRight: 5}} />
          </div>
          :
          null
        }
        </CardMedia>
        <CardTitle title={this.props.title} titleStyle = {this.styles.title} />
        <CardText style = {this.styles.text}>
           <Chip style={this.styles.chip}>
            <Avatar style={this.styles.rating}>{this.props.score}</Avatar>out of 10
          </Chip>
          <Chip style={this.styles.chip}>
            <Avatar color="#444" icon={<HardwareVideogameAsset />} />
            {this.props.genre}
          </Chip>
          <Chip style={this.styles.chip}>
            <Avatar color="#444" icon={<Devices />} />
            {this.props.platform}
          </Chip>            
        </CardText>
    </Card>
    );
  }
}

export default GameCard;
