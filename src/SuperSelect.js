const React = require("react");
const Fuse = require("fuse.js");

const Button = require("./Button");
const OptionsList = require("./OptionsList");
const Actions = require("./Actions");
const SearchBox = require("./SearchBox");

let SuperSelect = React.createClass({
    displayName: "SuperSelect",

    propTypes: {
        actions: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                handler: React.PropTypes.func.isRequired,
                label: React.PropTypes.string.isRequired,
                content: React.PropTypes.element
            })
        ),
        allSelectedLabel: React.PropTypes.string,
        clearAllLabel: React.PropTypes.string,
        content: React.PropTypes.node,
        contentLabelProvider: React.PropTypes.func,
        groups: React.PropTypes.array,
        label: React.PropTypes.string.isRequired,
        labelKey: React.PropTypes.string,
        maxLabels: React.PropTypes.oneOfType([
            React.PropTypes.number,
            React.PropTypes.bool
        ]),
        moreSelectedLabel: React.PropTypes.string,
        multiple: React.PropTypes.bool,
        noLabels: React.PropTypes.bool,
        onChange: React.PropTypes.func,
        onClose: React.PropTypes.func,
        onOpen: React.PropTypes.func,
        options: React.PropTypes.array,
        optionRender: React.PropTypes.func,
        searchBox: React.PropTypes.bool,
        searchKeys: React.PropTypes.arrayOf(
            React.PropTypes.string
        ),
        searchPlaceholder: React.PropTypes.string,
        selectAllLabel: React.PropTypes.string,
        value: React.PropTypes.oneOfType([
            React.PropTypes.object,
            React.PropTypes.arrayOf(
                React.PropTypes.object
            )
        ]),
        valueKey: React.PropTypes.string,
        valueLink: React.PropTypes.object
    },

    getDefaultProps: function getDefaultProps() {
        "use strict";

        return {
            actions: [],
            allItemsSelectedLabel: "todos",
            clearAllLabel: "✘ Limpar seleção",
            labelKey: "label",
            maxLabels: false,
            multiple: true,
            noLabels: false,
            options: [],
            searchBox: true,
            searchKeys: ["label"],
            searchPlaceholder: "Digite para filtrar opção...",
            selectAllLabel: "✓ Selecionar todos",
            valueKey: "value",
            // html attrs
            tabIndex: 0
        };
    },

    getInitialState: function getInitialState() {
        "use strict";

        return {
            open: false,
            pseudoHover: null,
            q: ""
        };
    },

    componentDidMount: function componentDidMount() {
        "use strict";

        this.refs.container.addEventListener("click", this.addSuperSelectToEvent);
        document.addEventListener("click", this.closeOnClickOutside);
    },

    componentWillUnmount: function componentWillUnmount() {
        "use strict";

        this.refs.container.removeEventListener("click", this.addSuperSelectToEvent);
        document.removeEventListener("click", this.closeOnClickOutside);
    },

    componentWillUpdate: function componentWillUpdate(nextProps, nextState) {
        if (nextState.open && typeof this.props.onOpen === "function") {
            this.props.onOpen();
        } else if(!nextState.open && typeof this.props.onClose === "function") {
            this.props.onClose();
        }
    },

    addSuperSelectToEvent: function addSuperSelectToEvent(e) {
        "use strict";

        // @todo i'm not happy with this
        e.superSelect = this;
    },

    closeOnClickOutside: function closeOnClickOutside(e) {
        "use strict";
        let eventSuperSelect = e.superSelect || false;
        if (!eventSuperSelect || eventSuperSelect !== this) {
            this.setState({
                open: false,
                q: "",
                pseudoHover: null
            });
        }
    },

    getAllOptions: function getAllOptions() {
        "use strict";

        return this.props.options || [];
    },

    getOptions: function getOptions() {
        "use strict";

        let options = this.props.options || [];
        let q = this.state.q;
        let fuse = new Fuse(options, {
            keys: this.props.searchKeys
            // threshold: 0.4
        });

        if (!q.length) {
            return options.slice();
        }

        return fuse.search(q);
    },

    getValue: function getValue() {
        "use strict";

        let value;
        if (this.props.valueLink) {
            value = this.props.valueLink.value;
        } else {
            value = this.props.value;
        }

        if (value === undefined || value === null) {
            value = this.props.multiple ? [] : null;
        }

        return value;
    },

    buildbutton: function buildbutton() {
        "use strict";

        return (
            <Button
                label={ this.props.label }
                contentLabelProvider={ this.props.contentLabelProvider }
                open={ this.state.open }
                value={ this.getValue() }
                options={ this.getOptions() }
                allOptions={ this.getAllOptions() }
                valueKey={ this.props.valueKey }
                labelKey={ this.props.labelKey }
                multiple={ this.props.multiple }
                toggle={ this.toggle }
                maxLabels={ this.props.maxLabels }
                noLabels={ this.props.noLabels }
                tabIndex={ this.props.tabIndex }
                handleFocus={ this.handleFocus }
                allSelectedLabel={ this.props.allSelectedLabel }
                moreSelectedLabel={ this.props.moreSelectedLabel }
            />
        );
    },

    toggle: function toggle(forceState) {
        "use strict";

        let newState = typeof forceState === "boolean" ? forceState : !this.state.open;
        this.setState({
            open: newState,
            q: newState ? this.state.q : "",
            pseudoHover: null
        });
    },

    isChecked: function isChecked(item, returnIndex) {
        "use strict";

        let index = false;
        let value = this.getValue();
        let found = false;
        let valueKey = this.props.valueKey;

        if (!value) {
            return false;
        }

        if (this.props.multiple) {
            found = value.filter(function (option, i) {
                if (item[valueKey] == option[valueKey]) {
                    index = i;
                    return true;
                }
            }).length > 0;

            return returnIndex ? index : found;
        }

        return item[valueKey] == value[valueKey];
    },

    handleChange: function handleChange(item) {
        "use strict";

        let value = this.getValue();
        let current;

        if (this.props.multiple) {
            current = this.isChecked(item, true);

            if (current !== false) {
                value.splice(current, 1);
            } else {
                value.push(item);
            }
        } else {
            value = item;
        }

        this.dispatchChanges(value);
    },

    dispatchChanges: function dispatchChanges(newValue) {
        "use strict";

        if (this.props.valueLink) {
            this.props.valueLink.requestChange(newValue);
        } else if (typeof this.props.onChange === "function") {
            this.props.onChange(newValue);
        }

        if (!this.props.multiple) {
            this.setState({
                open: false,
                q: ""
            });
        }
    },

    clean: function clean() {
        "use strict";

        this.dispatchChanges(
            this.props.multiple ? [] : null
        );
    },

    selectAll: function selectAll() {
        "use strict";

        this.dispatchChanges(this.getOptions());
    },

    handleChangeQ: function handleChangeQ(event) {
        "use strict";

        this.setState({
            q: event.target.value,
            pseudoHover: null
        });
    },

    handleNavigationKeys: function handleNavigationKeys(e) {
        "use strict";

        let currentPosition = this.state.pseudoHover || 0;
        let isEnter = e.key === "Enter";
        let open = this.state.open;
        let mustRetainFocus = false;
        let self = this;
        let container = self.refs.container;
        let q = this.state.q;

        if (isEnter) {
            e.preventDefault();
        }

        if (isEnter && !isNaN(currentPosition) && open) {
            let option = this.getOptions()[currentPosition] || false;
            if (option) {
                this.handleChange(option);
            }
        }

        switch (e.key) {
            case "ArrowUp":
                currentPosition = !currentPosition ? 0 : currentPosition - 1;
                open = true;
                break;
            case "ArrowDown":
                currentPosition = currentPosition + 1 === this.getOptions().length ? currentPosition : currentPosition + 1;
                open = true;
                break;
        }

        if (["Escape", "Tab"].indexOf(e.key) > -1) {
            open = false;
            mustRetainFocus = true;
            q = ""
        }

        this.setState({
            open: open,
            pseudoHover: currentPosition,
            q: q
        }, function () {
            if (mustRetainFocus) {
                container.focus();
            }
        });
    },

    buildOptions: function buildOptions() {
        "use strict";

        return (
            <OptionsList
                options={ this.getOptions() }
                optionRender={ this.props.optionRender }
                handleNavigationKeys={ this.handleNavigationKeys }
                isChecked={ this.isChecked }
                handleChange={ this.handleChange }
                currentHover={ this.state.pseudoHover }
                labelKey={ this.props.labelKey }
                actions={ this.props.actions }
                multiple={ this.props.multiple }
                key="options-list"
            />
        );
    },

    buildSearchBox: function buildSearchBox() {
        "use strict";

        return (
            <SearchBox
                searchArgument={ this.state.q }
                searchArgumentChange={ this.handleChangeQ }
                searchKeys={ this.props.searchKeys }
                searchPlaceholder={ this.props.searchPlaceholder }
                key="search-box"
            />
        );
    },

    buildActions: function buildActions() {
        "use strict";

        let actions = [];
        if (this.props.options.length && this.props.multiple === true) {
            actions.push({
                label: this.props.selectAllLabel,
                handler: this.selectAll
            });
            actions.push({
                label: this.props.clearAllLabel,
                handler: this.clean
            });
        }
        actions = actions.concat(this.props.actions);

        return <Actions actions={ actions } key="actions" />;
    },

    buildContent: function buildContent() {
        "use strict";

        let content = [];

        if (this.state.open) {
            if (this.props.searchBox) {
                content.push(this.buildSearchBox());
            }

            content.push(this.buildActions());
            content.push(this.props.content || this.buildOptions());

            return (
                <div className="super-select-content">
                    { content }
                </div>
            );
        }
    },

    render: function render() {
        return (
            <div
                className={"super-select-container" + (this.state.open ? " open" : "")}
                ref="container"
                onKeyDown={ this.handleNavigationKeys }
                tabIndex={ this.props.tabIndex }
            >
                { this.buildbutton() }
                { this.buildContent() }
            </div>
        );
    }
});

module.exports = SuperSelect;
