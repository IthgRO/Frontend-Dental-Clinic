// src/components/features/public/Search.tsx
import { useAppTranslation } from '@/hooks/useAppTranslation'
import { SearchOutlined } from '@ant-design/icons'
import { Button, DatePicker, Form, Input } from 'antd'

const Search = () => {
  const { t } = useAppTranslation('common')
  return (
    <Form layout="inline" className="flex flex-col md:flex-row gap-4">
      <Form.Item className="flex-1 w-full md:w-auto m-0">
        <Input
          size="large"
          placeholder={t('search.location')}
          prefix={<SearchOutlined className="text-gray-400" />}
          className="w-full"
        />
      </Form.Item>

      <Form.Item className="flex-1 w-full md:w-auto m-0">
        <DatePicker size="large" className="w-full" placeholder={t('search.selectDate')} />
      </Form.Item>

      <Form.Item className="w-full md:w-auto m-0">
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          className="w-full md:w-auto bg-black hover:bg-gray-800"
        >
          {t('hero.search')}
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Search
