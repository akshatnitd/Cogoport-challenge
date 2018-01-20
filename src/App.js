import React, { Component } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import helpers from './utils';
import GameCard from './GameCard';
import FilterList from 'material-ui/svg-icons/content/filter-list';
import Sort from 'material-ui/svg-icons/content/sort';
import IconButton from 'material-ui/IconButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AutoComplete from 'material-ui/AutoComplete';

function compare(a,b) {
  if (a.score < b.score)
    return 1;
  if (a.score > b.score)
    return -1;
  else
    {
      if(a.title > b.title)
        return -1;
      if(a.title < b.title)
        return 1;
      return 0;
    }
}

function compare2(a,b) {
  if (a.score < b.score)
    return -1;
  if (a.score > b.score)
    return 1;
  else
    {
      if(a.title > b.title)
        return -1;
      if(a.title < b.title)
        return 1;
      return 0;
    }
}


const styles = {
  main : {
    margin: 'auto',
  },

  chip: {
    margin: 4,
    borderRadius : 0,
    backgroundColor : '#37e7c8'
  }
};

const muiTheme = getMuiTheme({
  fontFamily: 'Roboto, sans-serif'
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      games: [],
      sort_str: '(High to low)',
      searchText: ''
    };
  }

  handleUpdateInput = (searchText) => {
    this.setState({
      searchText: searchText,
    });
  };

 

  componentDidMount = () => {

    const games = helpers.getGames();
    var keywords=games.map(a => a.title);
    localStorage.setItem('keywords',JSON.stringify(keywords));
    localStorage.setItem('games',JSON.stringify(games));
    this.setState({games: games});
  };


  handleToggle = () => {
    this.setState({open: !this.state.open});
  }

  sort = () => {
    var games= JSON.parse(localStorage.getItem('games'));
    if(this.state.sort_str === '(Low to high)' )
      games.sort(compare2);
    else
      games.sort(compare);
    this.setState({games: games, sort_str: '(Low to high)'});
  }

  search = () => {

    const searchText = this.state.searchText;
    var games= JSON.parse(localStorage.getItem('games'));
    var newArray = games.filter(function (el) {
        return el.title === searchText;
    });
    this.setState({games: newArray});



  }

  

  render() {

    const autosearchArray = JSON.parse(localStorage.getItem('keywords'));
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
        <AppBar
          title="CogoPort"
          iconElementRight={<IconButton onClick={this.handleToggle}><FilterList color='#FFFFFF'/></IconButton>}
          showMenuIconButton={false}
        >
        </AppBar>
        <Drawer 
          width={300} 
          openSecondary={true}
          docked={false}
          autoWidth={true}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}>
          <MenuItem leftIcon={<Sort/>} onClick={this.sort}>Sort by score {this.state.sort_str}</MenuItem>
          <MenuItem>
            <AutoComplete
              floatingLabelText="Search Game"
              filter={AutoComplete.fuzzyFilter}
              dataSource={autosearchArray}
              maxSearchResults={5}
              searchText={this.state.searchText}
              onUpdateInput={this.handleUpdateInput}
              filter={(searchText, key) => (key.indexOf(searchText) !== -1)}
            />
            </MenuItem>
            <MenuItem>
             <RaisedButton label="Search" onClick={this.search} primary={true} style={{margin: 12}} />
          </MenuItem>
        </Drawer>
        <div style={styles.main}>
          {
            this.state.games.map(function(game,key) {
                  return (<GameCard key={key} title={game.title} genre={game.genre} e_choice={game.editors_choice} score={game.score} platform={game.platform} />);
              })
          }
        </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
