import React from 'react';
import firebaseService from '../../firebase_services/firebaseService';
import {Component} from 'react';
import CardMedia from '@material-ui/core/CardMedia';
import RegularButton from '../../components/CustomButtons/Button'
import Card from "../../components/Card/Card";
import {getMapSize} from "../../global.js";
import LinearProgressWithLabel from 'components/LinearProgress/LinearProgressWithLabel';

class StoryPage extends Component {  
    
    constructor() {
        super();
        this.state = {
            story_links: [],
            story_state: 0,
            story_count: 0, // len of story_links
            get_story: true,
            finished_to_raed: false,
            loading: true
        };

    }

    componentDidMount() {
        var list;
        var story_st;
        firebaseService.getStoryByCategory(this.props.location.state)
        .then(function(list_links) {
            list = list_links.stories;
        }).then(() => {
            story_st = firebaseService.user[this.props.location.state]["holdingStory"]
            if (story_st > this.state.story_count)
                story_st = 0;

            this.setState({story_links: list});  
            this.setState({story_state: story_st});
            this.setState({story_count:  getMapSize(list)});
            this.setState({loading: false})
        })
    }

    finished_story = async (event) =>{
        event.preventDefault(); 
        await  this.setState({finished_to_raed : true});
        await  this.setState({get_story: false});
        var next  = this.state.story_state + 1;
       
        if (firebaseService.user[this.props.location.state]["holdingStory"] < this.state.story_count)
            firebaseService.setHoldingStoryByCategoryForUser(this.props.location.state, next)
    }

    get_next_story = (event) =>{
        this.setState({finished_to_raed : false});
        this.setState({get_story: true});

        if (this.state.story_state < this.state.story_count -1 ){
            var next  = this.state.story_state + 1;
            this.setState({story_state: next});
        }
        else{
            this.setState({story_state: 0});
        }
    }


    render() {
        if (this.state.loading) {
            return(
                <LinearProgressWithLabel />
            )
        }
        var is_last = this.state.story_count - 1 == this.state.story_state ? true : false;
        var link = this.state.story_links[this.state.story_state];
        var story_name = "story ".concat(this.state.story_state);

        return (
            <Card>
                <div className='p-48'>
                
                    <CardMedia
                        component='img'
                        alt={story_name}
                        image={link}
                        title={story_name}
                    />
                
                  <div id='story_buttons'>
                  <RegularButton className='w-full mx-auto normal-case mt-16' color='info' onClick={this.finished_story} disabled={this.state.finished_to_raed}>
                      סימתי לקרוא    
                    </RegularButton>
                    <RegularButton className='w-full mx-auto normal-case mt-16' color='info' onClick={this.get_next_story} disabled={this.state.get_story}>
                      {is_last? ' חזור לסיפור הראשון ' : ' סיפור הבא '}
                    </RegularButton>
                  </div>
        
                </div>
            </Card>
        );
      }
  }


export default StoryPage;