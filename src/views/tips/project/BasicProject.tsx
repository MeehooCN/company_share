/**
 * @description: 基本业务系统的增删查改
 * @author: cnn
 * @createTime: 2020/7/27 11:13
 **/
import React from 'react';
import { Row } from 'antd';
import { TitleWithDescription, CodeBox } from '@components/index';
import './../index.less';

const BasicProject = () => {
  const code1: string = '// react 前端框架\n' +
    'import React from \'react\';\n' +
    '// antd：ant-design 基于 React 的 UI 框架，同时 antd 也有基于 vue 的 UI 框架，此处使用解构的方式引入 antd 中的组件。\n' +
    'import { message, Popconfirm, Row, Table, Button, Modal } from \'antd\';\n' +
    '// table 中的一个接口，为了在 table 中写 column 的时候能够识别对应的字段。\n' +
    'import { ColumnProps } from \'antd/es/table\';\n' +
    '// 封装的 Axios 的请求工具，Axios 成熟的前端 Ajax 请求工具。\n' +
    'import Ajax from \'@utils/Ajax\';\n' +
    '// 封装的常用搜索条组件\n' +
    'import SearchForm from \'@components/SearchForm\';\n' +
    '// 用户表单\n' +
    'import UserForm from \'@viewComponents/User/UserForm\';';
  const code2: string = '// 以下皆为 TypeScript 的写法\n' +
    '\n' +
    '// 定义的用户的模型，字段可以从后台实体参考。\n' +
    'interface User {\n' +
    '  id: string,\n' +
    '  // ? 代表该参数可能不存在\n' +
    '  name?: string,\n' +
    '  userName: string\n' +
    '}\n' +
    '\n' +
    '// 组件 prop 的接口，需要 prop 的都需要在此处定义。\n' +
    'interface IProps {}\n' +
    '\n' +
    '// 组件 state 的接口，需要使用的 state 都需要在此定义。\n' +
    'interface IState {\n' +
    '  loading: boolean,\n' +
    '  // 不建议使用 dataList 这种语义不明的变量。\n' +
    '  userList: Array<User>,\n' +
    '  pagination: any,\n' +
    '  searchValue: any,\n' +
    '  userFormView: boolean,\n' +
    '  isEdit: boolean\n' +
    '}';
  const code3: string = '/**\n' +
    ' * @description: 用户列表\n' +
    ' * @author: cnn\n' +
    ' * @createTime: 2020/7/2 21:56\n' +
    ' **/\n' +
    'import React from \'react\';\n' +
    'import { message, Popconfirm, Row, Table, Button, Modal } from \'antd\';\n' +
    'import { ColumnProps } from \'antd/es/table\';\n' +
    'import Ajax from \'@utils/Ajax\';\n' +
    'import SearchForm from \'@components/SearchForm\';\n' +
    'import UserForm from \'@viewComponents/User/UserForm\';\n' +
    '\n' +
    'interface User {\n' +
    '  id: string,\n' +
    '  name: string,\n' +
    '  userName: string\n' +
    '}\n' +
    '\n' +
    'interface IProps {}\n' +
    '\n' +
    'interface IState {\n' +
    '  loading: boolean,\n' +
    '  userList: Array<User>,\n' +
    '  pagination: any,\n' +
    '  searchValue: any,\n' +
    '  userFormView: boolean,\n' +
    '  isEdit: boolean\n' +
    '}\n' +
    '\n' +
    'class UserList extends React.Component<IProps, IState> {\n' +
    '  // 构造函数\n' +
    '  constructor(props: any) {\n' +
    '    super(props);\n' +
    '    // 该组件中使用到的 ref 需要在此处初始化。\n' +
    '    this.userForm = React.createRef();\n' +
    '  }\n' +
    '  // 组件中使用的 state 在此处初始化。\n' +
    '  public readonly state: Readonly<IState> = {\n' +
    '    loading: false,\n' +
    '    userList: [],\n' +
    '    pagination: {\n' +
    '      current: 1,\n' +
    '      pageSize: 10,\n' +
    '      total: 0,\n' +
    '      showTotal(total:number): React.ReactNode {\n' +
    '        return `共查询到 ${total} 条数据`;\n' +
    '      }\n' +
    '    },\n' +
    '    searchValue: {},\n' +
    '    userFormView: false,\n' +
    '    isEdit: false\n' +
    '  };\n' +
    '  // 生命周期，在 render 之后调用，即 DOM 结构加载完毕后才会调用。\n' +
    '  componentDidMount() {\n' +
    '    this.getUserList();\n' +
    '  }\n' +
    '  // 用户表单的 ref，需在类中定义。\n' +
    '  private readonly userForm: React.RefObject<any>;\n' +
    '  // 获取用户列表\n' +
    '  private getUserList = () => {\n' +
    '    // 使用解构的方式获取 state 中的值，避免多次出现this.state.这种写法，看起来清晰明了。\n' +
    '    const { pagination, searchValue } = this.state;\n' +
    '    // 使用解构的方式赋值，...searchValue 并不适用于 searchConditionList, 要了解...searchValue 解构出来是什么东西，建议 console 看看。\n' +
    '    // params 传递给后台接口的参数，除了单个参数以外，建议都定义一个常量 params 封装。\n' +
    '    const params = {\n' +
    '      page: pagination.current,\n' +
    '      rows: pagination.pageSize,\n' +
    '      ...searchValue\n' +
    '    };\n' +
    '    // 请求开始，给用户正反馈，所以设置了 loading。\n' +
    '    this.setState({ loading: true });\n' +
    '    // 通过 Ajax 向后台发起请求，参数详情可参考 Ajax 工具类。\n' +
    '    Ajax.post(\'user/list\', params, { dataType: \'json\' }, (data: any) => {\n' +
    '      // 判断请求是否成功。\n' +
    '      if (data.flag === 0) {\n' +
    '        // 不要忘记了获取带分页的数据要设置 total。\n' +
    '        pagination.total = data.data.total;\n' +
    '        // 设置数据，成功了取消 loading，同样是给用户正反馈。\n' +
    '        this.setState({\n' +
    '          userList: data.data.rows,\n' +
    '          pagination,\n' +
    '          loading: false\n' +
    '        })\n' +
    '      } else {\n' +
    '        // 请求失败。告知用户错误信息。\n' +
    '        message.error(data.msg);\n' +
    '      }\n' +
    '    });\n' +
    '  };\n' +
    '  // 编辑用户\n' +
    '  private editUser = (user: User) => {\n' +
    '    // 显示用户表单，并改为编辑模式。\n' +
    '    this.setState({ isEdit: true, userFormView: true }, () => {\n' +
    '      // 回填表单信息，antd V4 可以直接这么赋值，会略过没有的字段，但是 antd V3 建议挨个赋值，如果存在 user 里有的字段表单没有则会提示一堆 Warning。\n' +
    '      this.userForm.current.setFieldsValue(user);\n' +
    '    });\n' +
    '  };\n' +
    '  // 删除用户\n' +
    '  private deleteUser = (id: string) => {\n' +
    '    // 直接请求后台接口，{ id } 这种没有定义一个常量 params，上面已经说过了。\n' +
    '    Ajax.post(\'user/delete\', { id }, { dataType: \'json\' }, (data: any) => {\n' +
    '      if (data.flag === 0) {\n' +
    '        message.success(data.msg);\n' +
    '        // 删除数据后如果成功应该更新列表数据。\n' +
    '        this.getUserList();\n' +
    '      } else {\n' +
    '        message.error(data.msg);  \n' +
    '      }\n' +
    '    });\n' +
    '  };\n' +
    '  // 翻页\n' +
    '  public handleTableChange = (pagination: any) => {\n' +
    '    // 设置翻页数据，获取用户列表。  \n' +
    '    this.setState({ pagination }, this.getUserList);\n' +
    '  };\n' +
    '  // 搜索\n' +
    '  private handleSearch = (searchValue: any) => {\n' +
    '    // 把当前页调整到第一页，原因是：假如你正处于第二页，开始搜索后，搜索出来的数据一共只有一页，就会产生当前页啥也没有的情况。  \n' +
    '    const { pagination } = this.state;\n' +
    '    pagination.current = 1;\n' +
    '    // 设置搜索条件以及分页情况。\n' +
    '    this.setState({ pagination, searchValue }, this.getUserList);\n' +
    '  };\n' +
    '  // 显示新增用户表单\n' +
    '  private addUser = () => {\n' +
    '    // 设置当前为新增模式，打开用户列表。\n' +
    '    this.setState({ isEdit: false, userFormView: true }, () => {\n' +
    '      // 重置表单信息\n' +
    '      this.userForm.current.resetFields();\n' +
    '    });\n' +
    '  };\n' +
    '  // 新增或编辑用户提交\n' +
    '  private setUserOk = () => {\n' +
    '    // 验证表单信息，如果有错误则 return，没有则提交信息。\n' +
    '    this.userForm.current.validateFields((err: any, value: any) => {\n' +
    '      if (err) {\n' +
    '        return;\n' +
    '      } else {\n' +
    '        const { isEdit } = this.state;\n' +
    '        const params = {\n' +
    '          ...value,\n' +
    '          // 其他参数\n' +
    '        }\n' +
    '        // 根据 isEdit（新增或者编辑） 判断请求路径提交\n' +
    '        // ...\n' +
    '      }\n' +
    '    });\n' +
    '  };\n' +
    '  render() {\n' +
    '    // 使用解构的方式引入 state 中变量, props 同理，建议如果变量过多可以以5个一组进行换行。  \n' +
    '    const { userList, loading, pagination, userFormView, isEdit } = this.state;\n' +
    '    // 表单的列\n' +
    '    const columns: ColumnProps<User>[] = [{\n' +
    '      title: \'姓名\',\n' +
    '      dataIndex: \'name\',\n' +
    '      key: \'name\'\n' +
    '    }, {\n' +
    '      title: \'用户名\',\n' +
    '      dataIndex: \'userName\',\n' +
    '      key: \'userName\'\n' +
    '    }, {\n' +
    '      title: \'操作\',\n' +
    '      dataIndex: \'op\',\n' +
    '      key: \'op\',\n' +
    '      render: (text: any, user: any) => {\n' +
    '        // 使用箭头函数可避免作用域导致的 this 指向不明的问题。\n' +
    '        // 重要操作建议使用 Popconfirm 给用户慎重考虑的机会，不然用户手残点到了体验不好。\n' +
    '        return (\n' +
    '          <Row>\n' +
    '            <a style={{ marginRight: 10 }} onClick={() => this.editUser(user)}>编辑</a>\n' +
    '            <Popconfirm title="是否删除该用户？" onConfirm={() => this.deleteUser(user.id)} okText="确定" cancelText="取消" >\n' +
    '              <a>删除</a>\n' +
    '            </Popconfirm>\n' +
    '          </Row>\n' +
    '        );\n' +
    '      }\n' +
    '    }];\n' +
    '    // SearchForm 提供的接口，详情可查看 SearchForm。\n' +
    '    const searchItems = [{\n' +
    '      columnIndex: 1,\n' +
    '      columnItems: [{\n' +
    '        fiType: \'text\',\n' +
    '        fiLabel: \'姓名\',\n' +
    '        fiField: \'name\'\n' +
    '      }]\n' +
    '    }];\n' +
    '    // 以下双斜杠注释会导致代码无法正常运行，所以只是此处方便书写和区别代码。\n' +
    '    return (\n' +
    '      <Row>\n' +
    '        <Row type="flex" style={{ marginBottom: 10 }}>\n' +
    '          <SearchForm formColumns={searchItems} handleSearch={this.handleSearch} showButton={true} />\n' +
    '          <Button icon="plus" onClick={this.addUser}>新增用户</Button>\n' +
    '        </Row>\n' +
    '        <Table<User>\n' +
    '          columns={columns}\n' +
    '          dataSource={userList}\n' +
    '          loading={loading}\n' +
    '          bordered={true}\n' +
    '          // 此处需要设置 rowKey, 除此之外当通过数组遍历出组件数组时，需要给每个组件增加 key 值，提高 react 渲染效率。\n' +
    '          rowKey={(r:any) => r.id}\n' +
    '          // 此处对分页进行判断，只有当有两页及其以上的情况才显示分页组件。\n' +
    '          pagination={pagination.total > pagination.pageSize ? pagination : false}\n' +
    '          style={{ marginTop: 10 }}\n' +
    '          onChange={this.handleTableChange}\n' +
    '        />\n' +
    '        <Modal\n' +
    '          visible={userFormView}\n' +
    '          // 根据是否是编辑状态对应显示模态框标题。\n' +
    '          title={isEdit ? \'编辑用户\' : \'新增用户\'}\n' +
    '          width={500}\n' +
    '          maskClosable={false}\n' +
    '          // 强制渲染，若不添加，第一次打开就对表单进行操作会报错。\n' +
    '          forceRender={true}\n' +
    '          onOk={this.setUserOk}\n' +
    '          onCancel={() => this.setState({ userFormView: false })}\n' +
    '        >\n' +
    '          <UserForm ref={this.userForm} />\n' +
    '        </Modal>\n' +
    '      </Row>\n' +
    '    )\n' +
    '  }\n' +
    '}\n' +
    'export default UserList;';
  return (
    <div>
      <TitleWithDescription title="BasicProject" content="基本业务系统的增删查改。" />
      <Row style={{ marginTop: 20 }}>
        <Row className="description">import：export 定义了模块的对外接口后，其他 JS 文件就可以通过 import 来加载这个模块。</Row>
        <CodeBox code={code1} />
        <Row className="description">interface: 接口。</Row>
        <CodeBox code={code2} />
        <Row className="description">代码详解。</Row>
        <CodeBox code={code3} />
      </Row>
    </div>
  );
};
export default BasicProject;
