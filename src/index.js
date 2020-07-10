import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import { Form, Input, Button, Divider, Icon, Select, Row, Col } from "antd";
const { Option } = Select;
let id = 0;

class DynamicRule extends React.Component {
  state = {
    QueryArray: [],
    ContextArray: []
  };

  check = () => {
    this.props.form.validateFields(err => {
      if (!err) {
        console.info("success");
      }
    });
  };
  removeQuery = k => {
    console.log(k);
    var data = this.state.QueryArray;
    console.log(data);
    var removed = data.filter(key => key.keys !== k.keys);
    data = removed;
    this.setState({ QueryArray: data });
  };

  addQuery = () => {
    var data = this.state.QueryArray;
    var nexkey = {};
    if (data.length === 0) {
      nexkey.keys = "key0";
    } else {
      nexkey.keys = "key" + data.length;
    }
    data.push(nexkey);
    this.setState({ QueryArray: data });
  };
  removeContext = k => {
    var data = this.state.ContextArray;
    var removed = data.filter(key => key.keys !== k.keys);
    data = removed;
    this.setState({ ContextArray: data });
  };

  addContext = () => {
    var data = this.state.ContextArray;
    var nexkey = {};
    if (data.length === 0) {
      nexkey.keys = "Ckey0";
    } else {
      nexkey.keys = "Ckey" + data.length;
    }
    data.push(nexkey);
    this.setState({ ContextArray: data });
  };
  componentDidMount() {
    this.props.form.setFieldsValue({
      username: ["logAddress", "user"],
      nickname: "$State"
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    getFieldDecorator("keys", { initialValue: [] });
    const QueryBox = this.state.QueryArray;
    const ContextBox = this.state.ContextArray;
    const QueryAddItems = QueryBox.map((k, index) => (
      <div
        key={k.keys}
        style={{
          padding: "10px",
          background: "#f9f9f9",
          marginBottom: "10px",
          borderRadius: "4px"
        }}
      >
        <div
          style={{ textAlign: "right", margin: "-10px 0", cursor: "pointer" }}
        >
          <Icon
            style={{ fontSize: "16px", textAlign: "right" }}
            className="dynamic-delete-button"
            onClick={() => this.removeQuery(k)}
            type="close-square"
          />
        </div>
        <Form.Item label="Field">
          {getFieldDecorator(`field[${k}]`, {
            rules: [
              {
                required: true,
                message: "Please enter query field"
              }
            ]
          })(<Input placeholder="Please enter query field" />)}
        </Form.Item>
        <Form.Item label="Query">
          {getFieldDecorator(`query[${k}]`, {
            rules: [
              {
                required: true,
                message: "Please enter query"
              }
            ]
          })(<Input placeholder="Your Search Query here.." />)}
        </Form.Item>
      </div>
    ));
    const ContextAddItems = ContextBox.map((k, index) => (
      <div
        key={k}
        style={{
          padding: "10px",
          background: "#f9f9f9",
          marginBottom: "10px",
          borderRadius: "4px"
        }}
      >
        <div
          style={{ textAlign: "right", margin: "-10px 0", cursor: "pointer" }}
        >
          <Icon
            style={{ fontSize: "16px" }}
            className="dynamic-delete-button"
            type="close-square"
            onClick={() => this.removeContext(k)}
          />
        </div>

        <Form.Item label="Title">
          {getFieldDecorator(`contextTitle[${k}]`, {
            rules: [
              {
                required: true,
                message: "Please enter context title"
              }
            ]
          })(<Input placeholder="Please enter context title" />)}
        </Form.Item>
        <Form.Item label="Query">
          {getFieldDecorator(`contextQuery[${k}]`, {
            rules: [
              {
                required: true,
                message: "Please enter query"
              }
            ]
          })(<Input placeholder="Please enter context query" />)}
        </Form.Item>
      </div>
    ));
    return (
      <div>
        <Form.Item label="Pivot Data">
          {getFieldDecorator("username", {
            // rules: [
            //   {
            //     required: true,
            //     message: "Please input your name"
            //   }
            // ]
          })(
            <Select
              style={{ width: "100%" }}
              defaultValue={["logAddress", "user"]}
              mode="multiple"
              placeholder="Pivote data"
            >
              <Option value="logAddress" label="$LogAddress">
                $LogAddress
              </Option>
              <Option value="user" label="$User">
                $User
              </Option>
              <Option value="loglevel" label="$LogLevel">
                $LogLevel
              </Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label="Event Type">
          {getFieldDecorator("nickname", {
            rules: [
              {
                required: true,
                message: "Please input event type"
              }
            ]
          })(<Input placeholder="Please input Event Type" />)}
        </Form.Item>
        <Divider />
        <Form.Item>
          <Row gutter={[24, 16]}>
            <Col span={12} style={{ borderRight: "1px solid #e1e1e1" }}>
              <div>
                <span>
                  Query Detail
                  <span
                    onClick={this.addQuery}
                    style={{ float: "right", cursor: "pointer" }}
                  >
                    <Icon type="plus-circle" />
                  </span>
                </span>
                {QueryAddItems}
              </div>
            </Col>

            <Col span={12} style={{ borderLeft: "1px solid #e1e1e1" }}>
              <div>
                <span>
                  Context Detail
                  <span
                    onClick={() => {
                      this.addContext();
                    }}
                    style={{ float: "right", cursor: "pointer" }}
                  >
                    <Icon type="plus-circle" />
                  </span>
                </span>
                {ContextAddItems}
              </div>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item style={{ textAlign: "right" }}>
          <Button type="primary" onClick={this.check}>
            Submit
          </Button>
        </Form.Item>
      </div>
    );
  }
}

const WrappedDynamicRule = Form.create({ name: "dynamic_rule" })(DynamicRule);
ReactDOM.render(<WrappedDynamicRule />, document.getElementById("container"));
