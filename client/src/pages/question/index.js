import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import {
  Feed,
  Form,
  Button,
  Input,
  TextArea,
  Label,
  Icon
} from "semantic-ui-react";
import "./style.css";

class Question extends Component {
  constructor() {
    super();
    this.state = {
      data: {},
      answers: [],
      loaded: false,
      text: "",
      createdBy: "",
      likes: 0
    };

    this.handleCreatedBy = this.handleCreatedBy.bind(this);
    this.handleText = this.handleText.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    const questionId = match.params.id;

    axios
      .get(`http://localhost:5000/question/${questionId}`)
      .then(response => {
        this.setState({
          data: response.data.question,
          loaded: true
        });
      })
      .catch(error => {
        console.log(error);
      });

    this.getAnswers();
  }

  getAnswers() {
    const { match } = this.props;
    const questionId = match.params.id;

    axios
      .get(`http://localhost:5000/answer/${questionId}`)
      .then(response => {
        this.setState({
          answers: response.data.answers
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleCreatedBy(e) {
    this.setState({
      createdBy: e.target.value
    });
  }

  handleText(e) {
    this.setState({
      text: e.target.value
    });
  }

  addAnswer() {
    const { match } = this.props;
    const questionId = match.params.id;
    const { createdBy, text } = this.state;

    axios
      .post("http://localhost:5000/answer", {
        question: questionId,
        createdBy: createdBy,
        text: text
      })
      .then(response => {
        this.getAnswers();
        this.setState({
          createdBy: "",
          text: ""
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleLike(id, method) {
    axios
      .post(`http://localhost:5000/question/${method}-like/${id}`)
      .then(response => {
        this.setState({
          likes: response.data.likes
        });

        console.log("Changed likes");
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { data, loaded, answers, likes } = this.state;

    return loaded ? (
      <div>
        <div className="header">
          <div className="likes">
            <button onClick={() => this.handleLike(data._id, "add")}>+</button>
            <h3>{likes > 0 ? likes : data.likes}</h3>
            <button onClick={() => this.handleLike(data._id, "remove")}>
              -
            </button>
          </div>
          <h2 className="title">{data.title}</h2>
        </div>
        <p className="text">{data.text}</p>

        {data.tags &&
          data.tags.map(tag => {
            return <Label key={tag}>{tag}</Label>;
          })}

        <h3 className="subtitle">
          {answers.length > 0 && `${answers.length} answers`}
        </h3>

        {answers.map(answer => {
          return (
            <Feed key={answer._id} className="answer">
              <Feed.Event>
                {/* <Feed.Label image='/images/avatar/small/joe.jpg' /> */}
                <Feed.Content>
                  <Feed.Summary>
                    <a>{answer._createdBy}</a> added a answer
                    <Feed.Date>{moment(answer.createdAt).fromNow()}</Feed.Date>
                  </Feed.Summary>
                  <Feed.Extra text>{answer.text}</Feed.Extra>
                  <Feed.Meta>
                    <Feed.Like>
                      <Icon name="like" />5 Likes
                    </Feed.Like>
                  </Feed.Meta>
                </Feed.Content>
              </Feed.Event>
            </Feed>
          );
        })}

        <div className="form">
          <Form>
            <h3>Add a answer</h3>
            <Form.Field>
              <Input
                type="text"
                name="createdBy"
                value={this.state.createdBy}
                placeholder="Your name"
                onChange={this.handleCreatedBy}
              />
            </Form.Field>
            <Form.Field>
              <TextArea
                type="text"
                placeholder="Your answer"
                name="text"
                value={this.state.text}
                onChange={this.handleText}
              />
            </Form.Field>

            {this.state.createdBy.length > 0 && this.state.text.length > 0 ? (
              <Button secondary onClick={() => this.addAnswer()}>
                Add an answer
              </Button>
            ) : (
              <Button disabled onClick={() => this.addAnswer()}>
                Add an answer
              </Button>
            )}
          </Form>
        </div>
      </div>
    ) : (
      <h1>Loading...</h1>
    );
  }
}

export default Question;
