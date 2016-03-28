var React = require("react");
var Action = require("./Action");

var Actions = React.createClass({
    displayName: "SuperSelect.Actions",

    getDefaultProps: function () {
        "use strict";

        return {
            actions: []
        };
    },

    render: function () {
        "use strict";

        if (!this.props.actions.length) {
            return <div></div>;
        }

        return (
            <ul className="super-select-actions">
                { this.props.actions.map(function (action, index) {
                    return <Action { ...action } key={ index } />;
                }) }
            </ul>
        );
    }
});

module.exports = Actions;
