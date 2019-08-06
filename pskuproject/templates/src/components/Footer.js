import React, { Component } from 'react';
import '../App.css';
class Footer_Logo extends Component {
  render() {
    return (
      <div>
     <div className="ant-layout-footer"  >
     <div style={{ marginTop:-10+'px',marginLeft:-10+'px'}}>
     <strong>PSKU Simulator</strong> by <a href="https://fractal.ai">Fractal Analytics</a>
          {" | "} &copy;2019 <a href="https://us.pg.com/">Procter &amp; Gamble</a>
          </div>
</div>
     </div>
      
     
    );
  }
}

export default Footer_Logo;
