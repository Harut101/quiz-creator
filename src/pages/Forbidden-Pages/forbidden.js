import React, { Component } from 'react'
import '../Forbidden-Pages/forbidden.css'
import Button from '../../components/UI/Button/Button'
import {Link} from 'react-router-dom'


class Forbidden extends Component {
    render() {
        return(
            <div className="base io"> 
            <h1 className="io">403</h1>
            <h2>Access forbidden</h2>
            <h5>(I'm sorry buddy...)</h5>
            <Link to='/auth'>
              <Button> Authorize </Button>
            </Link>
            </div>
        )
    }
  }


export default Forbidden;