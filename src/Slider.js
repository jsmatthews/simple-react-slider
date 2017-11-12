import React, { Component } from 'react';
import './Slider.css';

const SliderProgressLine = (props) => {
    return (
        <div className="SliderProgressLine"></div>
    )
}

const SliderPointer = (props) => {
    return (
        <div id={props.pointerConfig.id} className="SliderPointer">
            <div className="PointerValue">{props.pointerConfig.value}</div>
        </div>
    )
}

const SliderContainer = (props) => {
    return (
        <div id={props.containerConfig.id} className="SliderContainer"
            onMouseDown={props.mouseDown}
            onMouseUp={props.mouseUp}
            onMouseMove={props.mouseMove}>
            <SliderProgressLine />
            <SliderPointer pointerConfig={props.pointerConfig} />
        </div>
    )
}

export default class Slider extends Component {
    constructor(props) {
        super(props);
        this.mouseDown = this.mouseDown.bind(this);
        this.mouseUp = this.mouseUp.bind(this);
        this.mouseMove = this.mouseMove.bind(this);
        this.recalculatePosition = this.recalculatePosition.bind(this);
        
        this.state = {
            containerConfig: {
                id: 'SliderContainer',
            },
            pointerConfig: {
                id: 'SliderPointer',
                value: 0,
                isDown: false
            }
        }
    }

    //TODO: Add steps option

    recalculatePosition(event) {
        const pointerElement = document.getElementById(this.state.pointerConfig.id);
        const containerElement = document.getElementById(this.state.containerConfig.id);

        var mousePosition = event.clientX;
        var distanceFromParentToWindow = containerElement.offsetLeft;
        var relativeDistance = mousePosition - distanceFromParentToWindow;
        var relativeDistanceAsPercentage = (relativeDistance / containerElement.offsetWidth) * 100;

        if (relativeDistanceAsPercentage < 0) relativeDistanceAsPercentage = 0;
        if (relativeDistanceAsPercentage > 100) relativeDistanceAsPercentage = 100;

        pointerElement.style.left = relativeDistanceAsPercentage + "%";

        const pointerConfig = this.state.pointerConfig;
        Object.assign(pointerConfig, { value: Math.round(relativeDistanceAsPercentage) });
        this.setState(pointerConfig);

        console.log(relativeDistanceAsPercentage, this.state.pointerConfig.value);
    }

    mouseDown(event) {
        const pointerConfig = this.state.pointerConfig;
        Object.assign(pointerConfig, { isDown: true });
        this.setState(pointerConfig);
        this.recalculatePosition(event);
    }

    mouseUp(event) {
        const pointerConfig = this.state.pointerConfig;
        Object.assign(pointerConfig, { isDown: false });
        this.setState(pointerConfig);
    }

    mouseMove(event) {
        event.preventDefault();
        if (this.state.isDown) {
            this.recalculatePosition(event);
        }
    }


    render() {
        return (
            <div>
                <SliderContainer
                    pointerConfig={this.state.pointerConfig}
                    mouseDown={this.mouseDown}
                    mouseUp={this.mouseUp}
                    mouseMove={this.mouseMove}

                    containerConfig={this.state.containerConfig}
                />
            </div>
        )
    }
}