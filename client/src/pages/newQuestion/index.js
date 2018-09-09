import React, { Component } from "react";
import axios from "axios";
import { Form, Button, Input, TextArea, Label, Icon } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import "./style.css";

class NewQuestion extends Component {
  constructor() {
    super();

    this.state = {
      createdBy: "",
      title: "",
      text: "",
      tag: "",
      tags: [],
      submitted: false
    };

    this.handleCreatedBy = this.handleCreatedBy.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.handleTags = this.handleTags.bind(this);
    this.handleText = this.handleText.bind(this);
  }

  handleCreatedBy(e) {
    this.setState({
      createdBy: e.target.value
    });
  }

  handleTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  handleTags(e) {
    this.setState({
      tag: e.target.value
    });

    if (e.target.value.includes(" ")) {
      this.setState({
        tags: [...this.state.tags, e.target.value],
        tag: ""
      });
    }
  }

  handleText(e) {
    this.setState({
      text: e.target.value
    });
  }

  addQuestion() {
    const { createdBy, title, tags, text } = this.state;

    axios
      .post("http://localhost:5000/question", {
        createdBy: createdBy,
        title: title,
        tags: tags,
        text: text
      })
      .then(response => {
        this.setState({
          submitted: true
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  removeTag(index) {
    this.setState({
      tags: this.state.tags.filter((_, i) => i !== index)
    });
  }

  render() {
    const { createdBy, title, tags, text, submitted, tag } = this.state;

    if (submitted) {
      return <Redirect to="/" />;
    }

    let filled = false;
    if (
      createdBy.length > 0 &&
      title.length > 0 &&
      tags.length > 0 &&
      text.length > 0
    ) {
      filled = true;
    }

    return (
      <div>
        <div className="form">
          <Form>
            <h3>Add a question</h3>
            <Form.Field>
              <Input
                type="text"
                name="createdBy"
                value={createdBy}
                placeholder="Your name"
                onChange={this.handleCreatedBy}
              />
            </Form.Field>
            <Form.Field>
              <Input
                type="text"
                name="title"
                value={title}
                placeholder="Title"
                onChange={this.handleTitle}
              />
            </Form.Field>
            <Form.Field>
              <Input
                type="text"
                name="tags"
                value={tag}
                placeholder="Tags (seperate the tags using spacebar)"
                onChange={this.handleTags}
              />

              {tags.length > 0 && (
                <div className="tags">
                  {tags.map((tag, index) => {
                    return (
                      <Label key={tag + Math.random()}>
                        {tag}
                        <Icon
                          name="delete"
                          onClick={() => this.removeTag(index)}
                        />
                      </Label>
                    );
                  })}
                </div>
              )}
            </Form.Field>
            <Form.Field>
              <TextArea
                type="text"
                placeholder="Your question"
                name="text"
                value={text}
                onChange={this.handleText}
              />
            </Form.Field>

            {filled ? (
              <Button primary onClick={() => this.addQuestion()}>
                Submit question
              </Button>
            ) : (
              <Button disabled onClick={() => this.addQuestion()}>
                Submit question
              </Button>
            )}
          </Form>
        </div>
      </div>
    );
  }
}

export default NewQuestion;
