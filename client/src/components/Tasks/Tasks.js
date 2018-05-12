import React, { Component } from 'react';
import {Tooltip,OverlayTrigger} from 'react-bootstrap';
import Checkbox from '../../elements/CustomCheckbox/CustomCheckbox';
import Button from '../../elements/CustomButton/CustomButton';

export class Tasks extends Component{
    handleCheckbox = event => {
        const target = event.target;
        console.log(event.target);
        this.setState({
            [target.name]: target.checked
        });
    };
    render(){
        const edit = (<Tooltip id="edit_tooltip">Edit Task</Tooltip>);
        const remove = (<Tooltip id="remove_tooltip">Remove</Tooltip>);
        const tasks_title = [
            'hey thanks for taking some time to chat today really appreciate that so what I wanted to do today was to show you the show pad platform Through The Eyes of your sales reps and how they\'re going to leverage it on a daytoday basis and you know based on our previous conversation I know that you have an inside sales team and they\'re demoing and representing right from the desktops in the laptops one of the things I do want to point out though is show cat is device agnostic you can access the platform via tablet or mobile phone and before we happen to the demonstration self I did want to just give you some quick background as to what show is doing a dry run business so we get it we get the we get the situation that a lot of companies are facing Global and it\'s that their marketing content is typically unorganized it\'s in structure and its scattered across multiple drives in the sales rep themselves they\'re not happy with using and that\'s cuz you',
            'what is Kyle willing to do that do what what you start off I\'m trying to download a video you start off for presentation pretending to be on the phone be the presentation I wonder why the truth how you felt used trucks wood I don\'t see any for any reason anytime YouTube',
            'just have good example of a bad feet that someone made from work but it starts off when they\'re on their phone I don\'t know Westpac pants to the speech though live know we were Kings like smoking stuff in years we would just need to like but I wonder what happened I wonder what that have you ever have fun drive to get to the next level 4',
            'have you ever stood up in front of a group of people and basically just talked and not really know what you\'re saying you\'re essentially just saying the first thing that comes to your mind and like you honestly don\'t know how to finish the sentence the worst part is that you basically don\'t know whether you\'re making any sense so you almost have to focus on what you\'re saying right well it\'s too bad there\'s nothing out there that could totally help so honestly until someone make somebody that can help we are essentially in a lot of trouble'
        ];
        var tasks = [];
        var number;
        for (var i = 0; i < tasks_title.length; i++) {
            number = "checkbox"+i;
            tasks.push(
                <tr key={i}>
                    <td>
                        <Checkbox
                            number={number}
                            isChecked={i === 1 || i === 2 ? true:false}
                        />
                    </td>
                    <td>{tasks_title[i]}</td>
                    <td className="td-actions text-right">
                        <OverlayTrigger placement="top" overlay={edit}>
                            <Button
                                bsStyle="info"
                                simple
                                type="button"
                                bsSize="xs"
                            >
                                <i className="fa fa-edit"></i>
                            </Button>
                        </OverlayTrigger>

                        <OverlayTrigger placement="top" overlay={remove}>
                            <Button
                                bsStyle="danger"
                                simple
                                type="button"
                                bsSize="xs"
                            >
                                <i className="fa fa-times"></i>
                            </Button>
                        </OverlayTrigger>

                    </td>
                </tr>
            );
        }
        return (
            <tbody>
                {tasks}
            </tbody>
        );
    }
}

export default Tasks;
