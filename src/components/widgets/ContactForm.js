import React from 'react'
import {Link} from 'gatsby'
export default props => (
    <div>
        <h4>Interested in talking?</h4>
        <Link to="/contact" style={{color: '#fff'}}>
            <button className="btn">
                Leave a message
            </button>
        </Link>
    </div>
)