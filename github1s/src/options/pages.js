import React, { Component } from 'react'
import { Layout, Row, Col, Form, Input, Button, Checkbox, Select, Tooltip, Modal } from 'antd';
import { checkBoxItems, selectBoxItems, defaultSetting } from '../js/common';
import { r2c, c2r, setItemByKey, getItem, formReset } from '../js/utils';
import './options.css';

const { Content } = Layout;
const { Option } = Select;

class Pages extends React.PureComponent {

  state = {
    "formData": {
    },
  }

  async componentDidMount() {

    let formData;

    try {
      const form = await getItem("form");
      if (form == undefined) {
        formData = c2r(defaultSetting);
      } else {
        formData = c2r(form);
      }

      this.props.form.setFieldsValue(formData);
      this.setState({
        "formData": formData
      });
    } catch (err) {

      formData = c2r(defaultSetting);
      this.props.form.setFieldsValue(formData);
      this.setState({
        "formData": formData
      });
    }
  }


  onSelectChange = (value) => {
    this.props.form.setFieldsValue({
      button_title: selectBoxItems[value]["name"],
      input_url: selectBoxItems[value]["url"],
    });
  }

  onCheckChange = (values) => {
    console.log("checkedValues: ", values);
    // check_box
    this.props.form.setFieldsValue({
      "check_box": values
    });
  }

  onReset = () => {
    const reset = c2r(defaultSetting);
    this.props.form.setFieldsValue(reset);
    this.setState({
      "formData": reset,
    });

    Modal.success({ content: "Reset to default Settings" });
    formReset();

  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("submit: ", r2c(values));
        Modal.success({ content: "Save success" });
        this.setState({
          "formData": values,
        });
        setItemByKey("right_menu_create", 0);
        setItemByKey("form", r2c(values));
      } else {
        Modal.error({ content: "Save failed" });
      }
    });
  };

  render() {
    const { formData } = this.state;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { input_url, button_title, button_title_color, button_background_color } = formData;

    return (
      <Layout>
        <Content className="container">
          <Row>
            <Col span={12} offset={6}>
              <div className="logo"></div>
              <div className="text">GitHub1s Configuration</div>
            </Col>
            <Col span={12} offset={6}>
              <Form
                layout="vertical"
                name="form"
                onChange={this.test}
                onSubmit={this.handleSubmit}
              >

                <Form.Item label="Input URL">
                  {getFieldDecorator('input_url', {
                    rules: [{ required: true, message: 'Please input input url!' }],
                  })(
                    <Input disabled={getFieldValue('web_service') !== 1} />
                  )}
                </Form.Item>

                <Form.Item label="Button Title">
                  {getFieldDecorator('button_title', {
                    rules: [{ required: true, message: 'Please input button title!' }],
                  })(<Input />)}
                </Form.Item>

                <Form.Item label="Button Title Color">
                  {getFieldDecorator('button_title_color', {
                    rules: [{
                      required: true,
                      message: 'Please enter the correct hexcolor value',
                      pattern: /^#([a-f0-9]{3,4}|[a-f0-9]{4}(?:[a-f0-9]{2}){1,2})\b$/,
                    },],
                  })(<Input />)}
                </Form.Item>

                <Form.Item label="Button Background Color">
                  {getFieldDecorator('button_background_color', {
                    rules: [{
                      required: true,
                      message: 'Please enter the correct hexcolor value',
                      pattern: /^#([a-f0-9]{3,4}|[a-f0-9]{4}(?:[a-f0-9]{2}){1,2})\b$/,
                    },],
                  })(<Input />)}
                </Form.Item>

                <Form.Item label="Select a site service">
                  {getFieldDecorator('web_service')(
                    <Select
                      onChange={this.onSelectChange}
                    >
                      {
                        selectBoxItems.map((item, index) => {
                          return <Option value={item.index} key={index}>{item.name}</Option>
                        })
                      }
                    </Select>
                  )}

                </Form.Item>

                <Form.Item label="Keyboard Shortcuts">
                  {getFieldDecorator('keyboard_shortcuts', {
                    rules: [{ required: true, message: 'Please enter the keyboard shortcuts' }],
                  })(<Input />)}
                </Form.Item>

                <Form.Item label="" name="check_box">
                  {getFieldDecorator('check_box')(
                    <Checkbox.Group onChange={this.onCheckChange}>
                      {
                        checkBoxItems.map((item, index) => {
                          return (
                            <Row className="mb10" key={index}>
                              <Checkbox value={item.name}>
                                <Tooltip placement="rightTop" title={item.note}>
                                  {item.desc}
                                </Tooltip>
                              </Checkbox>
                            </Row>

                          );
                        })
                      }
                    </Checkbox.Group>
                  )}
                </Form.Item>

                <Form.Item>
                  <Button className="mt20" type="primary" htmlType="submit" block>Save</Button>
                  <Button className="mt20" type="danger" block onClick={this.onReset}>Reset</Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>

        </Content>

      </Layout >
    );
  }
}

export default Form.create({ name: 'form' })(Pages);;
