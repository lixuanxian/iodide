import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class FixedPositionContainerUnconnected extends React.Component {
  static propTypes = {
    style: PropTypes.shape({
      display: PropTypes.string.isRequired,
      top: PropTypes.number.isRequired,
      left: PropTypes.number.isRequired,
      width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    }).isRequired,
  }

  render() {
    return (
      <div
        className="fixed-position-container"
        style={Object.assign(
          {
            position: 'fixed',
            border: '1px solid #cbcbcb',
            zIndex: 10,
            overflow: 'hidden',
          },
          this.props.style,
          )}
      >
        {this.props.children}
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  // need to assign to new object so that component updates when getting props
  let style = Object.assign({}, state.panePositions[ownProps.paneId])
  if (ownProps.hidden) {
    console.log('ownProps.hidden', ownProps.paneId)
    style.display = 'none'
  }
  if (ownProps.fullscreen) {
    console.log('ownProps.fullscreen', ownProps.paneId)
    style = {
      display: 'block',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    }
  }
  return {
    style,
  }
}

export default connect(mapStateToProps)(FixedPositionContainerUnconnected)
