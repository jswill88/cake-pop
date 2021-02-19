import { useState, useContext } from 'react';
import { Context } from '../context/context';
import { Modal, Form, Input, Typography } from 'antd';

const { Link } = Typography;

export default function SignInForm() {
  const [showSignUp, setShowSignUp] = useState(false)
  const [signInForm] = Form.useForm();
  const [signUpForm] = Form.useForm();

  const { signIn, signUp, showForm, setShowForm } = useContext(Context)

  const signInHandler = async () => {
    try {
      const { email, password } = await signInForm.validateFields();
      let result = await signIn({ email, password })
      if (result !== 'error') closeModal();
    } catch (e) {
      console.log(e.code)
    }
  }
  const signUpHandler = async () => {
    try {
      const { email, username, password, passwordVerify } = await signUpForm.validateFields();
      console.log(email, username)
      const result = await signUp({
        email, username, password, passwordVerify
      });
      if (result !== 'error') closeModal()
    } catch (e) {
      console.log(e)
    }
  }

  const closeModal = () => {
    signInForm.resetFields();
    setShowForm(false)
  }

  const passwordRules = [
    {
      required: true,
      message: 'Please enter your password'
    },
    {
      min: 8,
      max: 32,
      message: 'Password must be between 8 and 32 characters'
    },
    {
      pattern:/[a-z]/g,
      message: 'Password must contain a lowercase letter'
    },
    {
      pattern:/[A-Z]/g,
      message: 'Password must contain an uppercase letter'
    },
    {
      pattern:/[0-9]/g,
      message: 'Password must contain a number'
    },
  ]

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
          form={signInForm}
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
          >
            <Input.Password
              minLength={8}
              maxLength={32}
            />
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
            rules={passwordRules}
            hasFeedback

          >
            <Input.Password
              minLength={8}
              maxLength={32}
            />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="passwordVerify"
            rules={[
              {
                required: true,
                message: 'Please re-enter your password'
              },
              ({ getFieldValue }) => ({
                validator(_, password) {
                  if (!password || getFieldValue('password') === password) {
                    return Promise.resolve();
                  }
                  return Promise.reject('Passwords must match');
                },
              }),
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