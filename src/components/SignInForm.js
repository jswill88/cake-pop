import { useState, useContext } from 'react';
import { Context } from '../context/context';
import { Modal, Form, Input, Typography } from 'antd';

const { Link } = Typography;

export default function SignInForm() {
  const [showSignUp, setShowSignUp] = useState(false)
  const [form] = Form.useForm();
  const [signUpForm] = Form.useForm();

  const { signIn, signUp, showForm, setShowForm } = useContext(Context)

  const signInHandler = async () => {
    try {
      const { email, password } = await form.validateFields();
      let result = await signIn({ email, password })
      if (result !== 'error') closeModal();
    } catch (e) {
      console.log(e)
    }
  }
  const signUpHandler = async () => {
    try {
      const { email, username, password, passwordVerify } = await form.validateFields();
      const result = await signUp({
        email, username, password, passwordVerify
      });
      if (result !== 'error') closeModal()
    } catch (e) {
      console.log(e)
    }
  }

  const closeModal = () => {
    form.resetFields();
    setShowForm(false)
  }

  return (
    <Modal
      visible={showForm}
      title={showSignUp ? 'Sign Up' : 'Sign In'}
      okText='Submit'
      onOk={() => showSignUp ? signUpHandler() : signInHandler()}
      onCancel={() => closeModal()}
    >
      {!showSignUp ?
        <Form
          layout="vertical"
          form={form}
          preserve={false}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: 'email',
                message: 'Please enter a valid email',
              },
              {
                required: true,
                message: 'Email required to sign in'
              }
            ]}
            required={true}
          >

            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please enter your password'
              },
              // {
              //   type:
              // }
            ]}
            required={true}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
          <Link
            onClick={() => {
              setShowSignUp(true);
            }}
          >Not registered yet? Make an account!</Link>
        </Form>
        :
        <Form
          form={signUpForm}
          layout="vertical"
          preserve={false}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: 'email',
                message: 'Please enter a valid email',
              },
              {
                required: true,
                message: 'Email required to sign in'
              }
            ]}
            required={true}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Username"
            name="username"
            requiredMark="optional"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please enter your password'
              }
            ]}
            required={true}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="passwordVerify"
            rules={[
              {
                required: true,
                message: 'Please enter your password again'
              }
            ]}
            required={true}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
          <Link
            onClick={() => {
              setShowSignUp(false);
            }}
          >Already have an account? Click to sign in</Link>
        </Form>
      }
    </Modal>
  )
}