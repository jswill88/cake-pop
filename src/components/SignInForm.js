import { useState } from 'react';
import { useLoggedIn } from '../context/loggedInContext/';

import Modal from 'antd/es/modal';
import Form from 'antd/es/form';
import Input from 'antd/es/input';
import Typography from 'antd/es/typography';

const { Link } = Typography;

export default function SignInForm({showForm, setShowForm}) {
  const [showSignUp, setShowSignUp] = useState(false)
  const [form] = Form.useForm();

  const { signIn, signUp } = useLoggedIn();

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
      const { email, username, signUpPassword: password, passwordVerify } = await form.validateFields();
      console.log(email, username, password, passwordVerify)
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
      cancelButtonProps={{
        id: 'cancel'
      }}
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
                message: 'Required'
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
                message: 'Required'
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
          >Not registered? Make an account</Link>
        </Form>
        :
        <Form
          form={form}
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
            name="signUpPassword"
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
                  if (!password || getFieldValue('signUpPassword') === password) {
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
          >Already have an account? Sign in</Link>
        </Form>
      }
    </Modal>
  )
}