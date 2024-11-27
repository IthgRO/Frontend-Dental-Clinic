import PageHeader from '@/components/ui/PageHeader'
import { useUpdateProfile } from '@/hooks/useProfile'
import { useAuthStore } from '@/store/useAuthStore'
import { Button, Card, Form, Input, Tabs } from 'antd'

interface ProfileFormData {
  first_name: string
  last_name: string
  phone: string
  email: string
}

interface PasswordFormData {
  current_password: string
  new_password: string
  confirm_password: string
}

const ProfilePage = () => {
  const { user } = useAuthStore()
  const updateProfile = useUpdateProfile()
  const [form] = Form.useForm()

  const onFinish = (values: ProfileFormData | PasswordFormData) => {
    updateProfile.mutate(values)
  }

  return (
    <div>
      <PageHeader title="Profile" />

      <Card>
        <Tabs
          items={[
            {
              key: '1',
              label: 'Basic Information',
              children: (
                <Form
                  form={form}
                  layout="vertical"
                  initialValues={user}
                  onFinish={onFinish}
                  className="max-w-md"
                >
                  <Form.Item name="first_name" label="First Name" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>

                  <Form.Item name="last_name" label="Last Name" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>

                  <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                    <Input disabled />
                  </Form.Item>

                  <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>

                  <Button type="primary" htmlType="submit" loading={updateProfile.isPending}>
                    Save Changes
                  </Button>
                </Form>
              ),
            },
            {
              key: '2',
              label: 'Password',
              children: (
                <Form layout="vertical" onFinish={onFinish} className="max-w-md">
                  <Form.Item
                    name="current_password"
                    label="Current Password"
                    rules={[{ required: true }]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item
                    name="new_password"
                    label="New Password"
                    rules={[{ required: true, min: 6 }]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item
                    name="confirm_password"
                    label="Confirm Password"
                    dependencies={['new_password']}
                    rules={[
                      { required: true },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('new_password') === value) {
                            return Promise.resolve()
                          }
                          return Promise.reject('Passwords do not match!')
                        },
                      }),
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Button type="primary" htmlType="submit">
                    Change Password
                  </Button>
                </Form>
              ),
            },
          ]}
        />
      </Card>
    </div>
  )
}

export default ProfilePage
