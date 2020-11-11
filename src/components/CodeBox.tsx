/**
 * @description: 描述
 * @author: cnn
 * @createTime: 2020/7/21 15:49
 **/
import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { github } from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface IProps {
  code: string
}

const CodeBox = (props: IProps) => {
  const { code } = props;
  return (
    <SyntaxHighlighter language="javascript" style={{ ...github }} customStyle={{ width: '100%', padding: 20, marginBottom: 10 }}>
      {code}
    </SyntaxHighlighter>
  );
};

export default CodeBox;
