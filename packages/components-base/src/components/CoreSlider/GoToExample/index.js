import React, { Component } from 'react';
import Image from '../../Image';
import Button from '../../Button';
import CoreSlider from '..';

/**
 * Test component
 */
class ComplicatedExample extends Component {
  /**
   * Component's constructor
   * @param {*} props with initial settings
   */
  constructor(props) {
    super(props);

    this.goToSlide3 = this.goToSlide3.bind(this);
    this.slider = React.createRef();
  }

  /**
   * Go to the target page
   * @param {*} value - target page
   */
  goToSlide3() {
    this.slider.current.goToSlide(2);
  }

  /**
   * Render method
   * @returns {JSX}
   */
  render() {
    return (
      <div style={{ maxWidth: 800, margin: 'auto' }}>
        <CoreSlider
          settings={{ dots: false, slidesToShow: 1, infinite: false }}
          ref={this.slider}
        >
          <div>
            <Image
              src="https://cdn1.uvnimg.com/dims4/default/1061593/2147483647/thumbnail/400x225/quality/75/?url=https%3A%2F%2Fcdn4.uvnimg.com%2F0e%2F63%2F319b02e3451094284e4a1668b08f%2Fda34a7f9e65e4414a8aadcfe0508a9d8"
              alt="ulces por likes, la nueva petición de los niños en Halloween"
            />
          </div>
          <div>
            <Image
              src="https://cdn4.uvnimg.com/dims4/default/7bb0cf0/2147483647/thumbnail/400x225/quality/75/?url=https%3A%2F%2Fcdn2.uvnimg.com%2Ff7%2F12%2F993acb6848cd8de3f3570d545afa%2Ff3a236a51a874decaf33ce30d3904f96"
              alt="Minuto de inspiración con el Padre Valbuena sobre el poder de las palabras"
            />
          </div>
          <div>
            <Image
              src="https://cdn4.uvnimg.com/dims4/default/3f34124/2147483647/thumbnail/400x225/quality/75/?url=https%3A%2F%2Fcdn2.uvnimg.com%2F2b%2Fcd%2F471d5832492bb26cd24f72645e12%2Fcbbd5bb8dc854917b3bf001a7803669c"
              alt="uevo escándalo sacude a Hollywood por cuenta de las acusaciones que comprometen a Harvey Weinstein"
            />
          </div>
          <div>
            <Image
              src="https://cdn3.uvnimg.com/dims4/default/c803f71/2147483647/thumbnail/400x225/quality/75/?url=https%3A%2F%2Fcdn2.uvnimg.com%2F61%2F3c%2Fc509278b44df869765dac287a57e%2F183227d1e1d24a55834a3227349893a3"
              alt="ebron no paga premium"
            />
          </div>
        </CoreSlider>
        <Button
          className="dummyButton"
          onClick={() => this.goToSlide3()}
        >
          Press me to go to slide number 3
        </Button>
      </div>
    );
  }
}

export default ComplicatedExample;
