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
            'What is the most inspiring thing ever said to you don\'t be an idiot changed my life whenever I\'m about to do something I think would an idiot do that and if they would I do not do that thing',
            'While he was laying on his deathbed there are four things that go through his mind was I will loved check did I express myself did I let my light shine through will an attractive woman cry at my funeral check probably more than what Leslie did I achieve success and own real estate and when I close on this condo I will be able to check that one as well',
            'What is Kyle willing to do that do what what you start off I\'m trying to download a video you start off for presentation pretending to be on the phone be the presentation I wonder why the truth how you felt used trucks wood I don\'t see any for any reason anytime YouTube',
            'Just have good example of a bad feet that someone made from work but it starts off when they\'re on their phone I don\'t know Westpac pants to the speech though live know we were Kings like smoking stuff in years we would just need to like but I wonder what happened I wonder what that have you ever have fun drive to get to the next level 4',
            'Have you ever stood up in front of a group of people and basically just talked and not really know what you\'re saying you\'re essentially just saying the first thing that comes to your mind and like you honestly don\'t know how to finish the sentence the worst part is that you basically don\'t know whether you\'re making any sense so you almost have to focus on what you\'re saying right well it\'s too bad there\'s nothing out there that could totally help so honestly until someone make somebody that can help we are essentially in a lot of trouble'
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
