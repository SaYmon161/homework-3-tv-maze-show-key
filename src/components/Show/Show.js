import React, { Component } from 'react';
import { getShowInfo } from '../../api';
import './Show.css';

class Show extends Component {
  state = {
    showId: '',
    data: null
  };

  async componentDidMount() {
    const { showId } = this.props;
    if (showId !== '') {
      const data = await getShowInfo(showId);
      this.setState({
        data,
        showId
      });
    }
  }
  getImg(name) {
    return require(`../App/assets/${name}.jpg`);
  }

  createMarkup(htmlMarkup) {
    return { __html: htmlMarkup };
  }

  render() {
    const { showId, data } = this.state;
    if (data === null) {
      return <p className="show-inforation t-show-info">Шоу не выбрано</p>;
    } else {
      return (
        <div className="show">
          <img src={this.getImg(showId)} alt={showId} className="show-image" />
          <h2 className="show-label t-show-name">{data.name}</h2>
          <p className="show-text t-show-genre">
            <b>Жанр: </b>
            {data.genres.join(', ')}
          </p>
          <p
            className="show-text t-show-summary"
            dangerouslySetInnerHTML={this.createMarkup(data.summary)}
          />
        </div>
      );
    }
  }
}

export default Show;
