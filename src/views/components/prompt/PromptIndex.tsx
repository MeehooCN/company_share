/**
 * @description: 离开页面提示
 * @author: cy
 * @createTime: 2020/9/22 10:59
 **/
import React, {useEffect, useState} from 'react';
import {Form, Input, Row, Button, Modal} from 'antd';
import {CodeExample, TitleWithDescription} from '@components/index';
import {Prompt, useHistory} from 'react-router-dom';
const { confirm } = Modal
const PromptIndex = () => {
  const [changed, setChanged] = useState(false);
  const [backFlag, setBackFlag] = useState(false);
  const [backPathname, setBackPathname] = useState('');
  const history = useHistory();

  useEffect(() => {
    if (backFlag) {
      history.push(backPathname);
    }
  }, [backFlag, backPathname]);
  const viewComponents = (<Row>
    <Form onValuesChange={(changedValues, allValues) => setChanged(true)}>
      <Form.Item label="名称" name="name" required>
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={() => setChanged(false)}>提交</Button>
      </Form.Item>
    </Form>
    <Prompt
      when={changed}
      message={(location) => {
        if (!changed) {
          return true;
        }
        confirm({
          title: '表单未保存',
          content: '表单没有保存，是否保存？',
          okText: '保存',
          cancelText: '离开',
          onOk() {
            setChanged(false);
          },
          onCancel() {
            setChanged(false);
            setBackPathname(location.pathname);
            setBackFlag(true);
          },
        });
        return false;
      }}
    />
  </Row>);
  const code = 'const PromptIndex = () => {\n' +
    '  const [changed, setChanged] = useState(false);\n' +
    '  const [backFlag, setBackFlag] = useState(false);\n' +
    '  const [backPathname, setBackPathname] = useState(\'\');\n' +
    '  const history = useHistory();\n' +
    '  useEffect(() => {\n' +
    '    if (backFlag) {\n' +
    '      history.push(backPathname);\n' +
    '    }\n' +
    '  }, [backFlag, backPathname]);\n' +
    '  return (\n' +
    '    <Row>\n' +
    '    <Form onValuesChange={(changedValues, allValues) => setChanged(true)}>\n' +
    '      <Form.Item label="名称" name="name" required>\n' +
    '        <Input />\n' +
    '      </Form.Item>\n' +
    '      <Form.Item>\n' +
    '        <Button type="primary" onClick={() => setChanged(false)}>提交</Button>\n' +
    '      </Form.Item>\n' +
    '    </Form>\n' +
    '    <Prompt\n' +
    '      when={changed}\n' +
    '      message={(location) => {\n' +
    '        if (!changed) {\n' +
    '          return true;\n' +
    '        }\n' +
    '        confirm({\n' +
    '          title: \'表单未保存\',\n' +
    '          content: \'表单没有保存，是否保存？\',\n' +
    '          okText: \'保存\',\n' +
    '          cancelText: \'离开\',\n' +
    '          onOk() {\n' +
    '            setChanged(false);\n' +
    '          },\n' +
    '          onCancel() {\n' +
    '            setChanged(false);\n' +
    '            setBackPathname(location.pathname);\n' +
    '            setBackFlag(true);\n' +
    '          },\n' +
    '        });\n' +
    '        return false;\n' +
    '      }}\n' +
    '    />\n' +
    '  </Row>\n' +
    '  );\n' +
    '};'
  return (
    <Row>
      <TitleWithDescription title="Prompt 离开页面提示" content="React-router v4 后的离开页面提示信息" />
      <CodeExample viewComponents={viewComponents} code={code} />
    </Row>
  );
};
export default PromptIndex;
