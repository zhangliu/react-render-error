export default (React, errorHandler, ErrComponent = null) => {
    class ErrorBoundary extends React.Component {
        constructor(props) {
            super(props);
            this.state = { hasError: false };
        }
    
        componentDidCatch(error, info) {
            // Display fallback UI
            this.setState({ hasError: true });
            errorHandler(error, info)
        }
    
        render() {
            if (this.state.hasError) {
                return ErrComponent ? <ErrComponent/> : null
            }
            const props = {...this.props}
            delete props.children
            return React.cloneElement(this.props.children, props);
        }
    }
    const rc = React.createElement
    React.createElement = (type, config, ...other) => {
        if (typeof type === 'string') return rc(type, config, ...other)
        const keyObj = (config || {}).key !== undefined ? {key: config.key} : null
        return rc(ErrorBoundary, keyObj, rc(type, config, ...other))
    }
}

