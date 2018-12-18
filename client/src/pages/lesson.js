import React, { Component } from 'react';
import axios from 'axios';
import fm from 'front-matter';
import ReactMarkdown from 'react-markdown/with-html';

class Lesson extends Component {
  state = { lesson: null };

  componentDidMount() {
    const { REACT_APP_COHORT: cohort } = process.env;
    const { module, lesson } = this.props.match.params;
    axios.get(`/api/${cohort}/modules/${module}/${lesson}`)
      .then(({ data }) => {
        const content = fm(data);
        this.setState({ lesson: content.body });
      })
      .catch(error => console.log(error));
  }

  render() {
    const { lesson } = this.state;
    return (
      <>
        <ReactMarkdown
          source={lesson}
          escapeHtml={false}
        />
      </>
    );
  }
}

export default Lesson;