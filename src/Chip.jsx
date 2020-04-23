import React, { Component } from 'react';
import chip from './chip.png';

const GRAVITY_ACCELERATION = 4000;
const MAX_START_Y_SPEED = -100;
const MIN_START_Y_SPEED = -1500;
const MIN_START_X_SPEED = -1500;
const MAX_START_X_SPEED = 1500;

const getRandom = (min, max) => min + (max - min) * Math.random();

class Chip extends Component {
    constructor(props) {
        super(props);

        this.lastTime = 0;

        this.state = {
            x: 0,
            y: 0,
            speedX: 10,
            speedY: 10,
            rotationTime: 0.3
        }
    }

    update = (time) => {
        const delta = time - this.lastTime;

        this.lastTime = time;

        let { x, y, speedX, speedY, rotationTime } = this.state;
        const { x0, y0, k, size, isWorking } = this.props;

        if (isWorking) {
            x += speedX * delta / 1000;
        
            speedY += GRAVITY_ACCELERATION * delta / 1000;
    
            y += speedY * delta / 1000;
    
            if (x > document.body.clientWidth
                || y > document.body.clientHeight
                || x < 0 - size) {
                x = x0 + 35 * k;
                y = y0 + 40 * k;
                speedX = getRandom(MIN_START_X_SPEED, MAX_START_X_SPEED);
                speedY = getRandom(MIN_START_Y_SPEED, MAX_START_Y_SPEED);
                rotationTime = getRandom(0.1, 1);
            }
        } else {
            x = x0 + 20 * k;
            y = y0 + 30 * k;            
        }

        this.setState(() => ({
            x,
            y,
            speedX,
            speedY,
            rotationTime
        }));

        requestAnimationFrame(this.update);
    }

    componentDidMount() {
        this.setState((state, { x0, y0, k }) => ({
            x: x0 + 20 * k,
            y: y0 + 30 * k,
            speedX: 10,
            speedY: -20
        }));
        this.update(0);
    }

    render() {
        const { size, isWorking } = this.props;
        const { x, y, rotationTime } = this.state;

        const chipStyles = {
            animationDuration: `${isWorking ? rotationTime : 1.7}s`,
            left: `${x}px`,
            top: `${y}px`,
            height: `${size}px`,
            width: `${size}px`,
          };
        return (
            <img className="chip" src={chip} alt="chip" style={chipStyles} />
        );
    }
}

export default Chip;
