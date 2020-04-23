import React, { Component } from 'react';

import { getPlaneProperties } from './util';
import { getIsWorking } from './service';

import Chip from './Chip.jsx';

import logo from './logo.png';
import './styles.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x0: 0,
      y0: 0,
      k: 0,
      size: 0,
      isWorking: false,
      cheat: false
    }
  }

  resizeHandler = () => {
      const { x0, y0, k, size } = getPlaneProperties();
      this.setState({ x0, y0, k, size });
  }

  updateTimings = async () => {
    if (!this.state.cheat) {
      const isWorking = await getIsWorking();
      this.setState({ isWorking });
    }
    setTimeout(this.updateTimings, 5000);
  }

  componentDidMount() {
    this.resizeHandler();
    this.updateTimings();

    window.cheat = (function(value) {
      if (value === true) {
        console.warn('Not real data!');
        this.setState({
          isWorking: !this.state.isWorking,
          cheat: true
        });
      } else {
        console.warn('Cheat disabled. Real state will be updated in seconds.');
        this.setState((state) => ({
          cheat: false
        }))
      }
    }).bind(this);

    window.addEventListener('resize', this.resizeHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeHandler);
  }

  render() {
    const { x0, y0, k, size, isWorking } = this.state;

    return (
      <div className="container">
        <Chip x0={x0} y0={y0} k={k} size={size} isWorking={isWorking} />
        <img className="logo" src={logo} alt="logo" />
        <div className="authors">
          <span>Designed by <a href="https://vk.com/id5486415" target="_blank" rel='noreferrer noopener'>Mihail Pushkarev</a></span>
          <span>Implemented by <a href="https://vk.com/umbertofly" target="_blank" rel='noreferrer noopener'>Aleksandr Kondratsky</a></span>
        </div>
      </div>
    );
  }
}

export default App;
