import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Label } from "semantic-ui-react";
import moment from "moment";
import axios from "axios";
import "./style.css";

class Timeline extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      loaded: false
    };
  }

  componentDidMount() {
    this.getQuestions();
  }

  getQuestions() {
    axios
      .get("http://localhost:5000/questions")
      .then(response => {
        this.setState({
          questions: response.data.questions,
          loaded: true
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { questions, loaded } = this.state;

    return loaded ? (
      <div>
        <h1 className="title">Questions</h1>
        <div className="questions">
          {questions.map((question, index) => {
            return (
              <div key={question._id + index} className="question">
                <Link to={`/question/${question._id}`}>
                  <h2>{question.title}</h2>
                </Link>
                {question.tags.map((tag, index) => {
                  return <Label key={tag + index}>{tag}</Label>;
                })}
                <h4 className="createdAt">
                  Asked {moment(question.createdAt).fromNow()} by{" "}
                  <strong>{question._createdBy}</strong>
                </h4>
              </div>
            );
          })}
        </div>
      </div>
    ) : (
      <div className="wrapper">
        <h1>Loading...</h1>
      </div>
    );
  }
}

export default Timeline;
