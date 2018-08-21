import React from 'react'
import PropTypes from 'prop-types'

export default function withClickOutside(WrappedComponent) {
  return class extends React.Component {
    static propTypes = {
      handleClickOutside: PropTypes.func.isRequired,
    }

    componentDidMount() {
      document.addEventListener('mousedown', this.handleClickOutside)
      document.addEventListener('keydown', this.handleEscapeKey)
    }

    componentWillUnmount() {
      document.removeEventListener('mousedown', this.handleClickOutside)
      document.removeEventListener('keydown', this.handleEscapeKey)
    }
    /**
     * Set the wrapper ref
     */
    setWrapperRef = (node) => {
      this.wrapperRef = node
    }

    handleEscapeKey = (e) => {
      if (e.keyCode === 27) {
        this.props.handleClickOutside()
      }
    }

    /**
     * Alert if clicked on outside of element
     */
    handleClickOutside = (event) => {
      if (
        this.wrapperRef &&
        !this.wrapperRef.contains(event.target) &&
        this.props.handleClickOutside
      ) {
        this.props.handleClickOutside()
      }
    }

    render() {
      return (
        <div ref={this.setWrapperRef}>
          <WrappedComponent {...this.props} />
        </div>
      )
    }
  }
}
