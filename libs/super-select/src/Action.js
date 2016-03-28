var React = require("react");

var Action = React.createClass({
    displayName: "SuperSelect.Action",

    getDefaultProps: function () {
        "use strict";

        return {
            handler: function () {
                console.log("action clicked ;)");
            },
            label: "Action",
            content: null
        };
    },

    getContent: function () {
        "use strict";

        return this.props.content || this.props.label;
    },
    render: function () {
        "use strict";

        return (
            <li
                className="super-select-action"
                onClick={ this.props.handler }
            >
                { this.getContent() }
            </li>
        );
    }
});

module.exports = Action;
