import React, { useState } from "react";
import { useEditor, EditorContent, FloatingMenu, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import './styles.css';
import styles from "./index.module.css";
import {
    Button,
    Row,
    Col,
    Form,
    Input,
    Space,
    Checkbox,
} from "antd";

const { TextArea } = Input;

const MenuBar = ({ editor }) => {
    if (!editor) {
        return null
    }

    return (
        <div className="control-group">
            <div className="button-group">
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={editor.isActive('bold') ? 'is-active' : ''}
                >
                    Bold
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={editor.isActive('italic') ? 'is-active' : ''}
                >
                    Italic
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={editor.isActive('strike') ? 'is-active' : ''}
                >
                    Strike
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    className={editor.isActive('code') ? 'is-active' : ''}
                >
                    Code
                </button>
                <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
                    Clear marks
                </button>
                <button onClick={() => editor.chain().focus().clearNodes().run()}>
                    Clear nodes
                </button>
                <button
                    onClick={() => editor.chain().focus().setParagraph().run()}
                    className={editor.isActive('paragraph') ? 'is-active' : ''}
                >
                    Paragraph
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
                >
                    H1
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
                >
                    H2
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
                >
                    H3
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                    className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
                >
                    H4
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                    className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
                >
                    H5
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
                    className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
                >
                    H6
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={editor.isActive('bulletList') ? 'is-active' : ''}
                >
                    Bullet list
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={editor.isActive('orderedList') ? 'is-active' : ''}
                >
                    Ordered list
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    className={editor.isActive('codeBlock') ? 'is-active' : ''}
                >
                    Code block
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={editor.isActive('blockquote') ? 'is-active' : ''}
                >
                    Blockquote
                </button>
                <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
                    Horizontal rule
                </button>
                <button onClick={() => editor.chain().focus().setHardBreak().run()}>
                    Hard break
                </button>
                <button onClick={() => editor.chain().focus().undo().run()}>
                    Undo
                </button>
                <button onClick={() => editor.chain().focus().redo().run()}>
                    Redo
                </button>
            </div>
        </div>
    )
}

const EmailTemplateForm = ({ mode, onFinish, form, onClose, loading }) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
        ],
        content: '<p>Write something here...</p>',
        editorProps: {
            attributes: {
                spellcheck: 'false',
            },
        },
    })
    // const editor = useEditor({
    //     extensions: [StarterKit],
    //     content: '<p>Write something here...</p>',
    // });

    const [editorContent, setEditorContent] = useState('');
    return (
        <Form
            layout="vertical"
            name="control-hooks"
            onFinish={onFinish}
            form={form}
        >
            <Col>
                <Form.Item
                    name="emailSubject"
                    label="Subject"
                    rules={[
                        {
                            required: true,
                            message: "Please enter subject",
                        },
                    ]}
                >
                    <Input placeholder="Please enter subject" />
                </Form.Item>
            </Col>
            <Col>
                <Form.Item
                    name="emailContent"
                    label="Content"
                >
                    <TextArea
                        style={{
                            height: 120,
                        }}
                        placeholder="Enter your content"
                    />
                </Form.Item>
            </Col>
            {mode !== "add" ?
                (<Col>
                    <Form.Item
                        name="isActive"
                        valuePropName="checked"
                    >
                        <Checkbox>Active</Checkbox>
                    </Form.Item>
                </Col>
                ) : null}


            <Col className={styles.btn_container}>
                <Space>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        {mode === 'add' ? "Submit" : "Update"}
                    </Button>
                </Space>
            </Col>
        </Form>
    )

}

export default EmailTemplateForm;