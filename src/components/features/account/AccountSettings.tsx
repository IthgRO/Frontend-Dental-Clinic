import { useEffect, useState } from 'react'
import { useAppTranslation } from '@/hooks/useAppTranslation'
import { useAuth } from '@/hooks/useAuth'
import { toast } from 'react-hot-toast'
import { User } from 'lucide-react'
import { Button } from 'antd'
import clsx from 'clsx'

interface FormData {
  email: string
  phone: string
}

const AccountSettings = () => {
  const { t } = useAppTranslation('common')
  const { user, updateUserData } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    email: user?.email || '',
    phone: user?.phone || '',
  })
  const [initialData, setInitialData] = useState<FormData>({
    email: user?.email || '',
    phone: user?.phone || '',
  })

  const hasChanges = formData.email !== initialData.email || formData.phone !== initialData.phone

  useEffect(() => {
    if (user) {
      const userData = {
        email: user.email || '',
        phone: user.phone || '',
      }
      setFormData(userData)
      setInitialData(userData)
    }
  }, [user])

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleCancel = () => {
    setFormData(initialData)
    setIsEditing(false)
  }

  const handleSave = async () => {
    try {
      console.log('Form data being sent:', {
        email: formData.email,
        phone: formData.phone,
      })

      await updateUserData.mutateAsync({
        email: formData.email,
        phone: formData.phone,
      })
      setInitialData(formData)
      setIsEditing(false)
    } catch (error) {
      console.error('Save error:', error)
      toast.error(t('notifications.error.updateFailed'))
    }
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <User className="w-6 h-6 text-gray-400" />
          <h2 className="text-xl font-semibold text-gray-900">
            {t('accountSettings.yourInformation')}
          </h2>
        </div>
        {!isEditing ? (
          <Button
            type="primary"
            onClick={() => setIsEditing(true)}
            className="px-6 bg-teal-600 hover:bg-teal-700"
          >
            {t('buttons.edit')}
          </Button>
        ) : (
          <div className="flex gap-3">
            <Button onClick={handleCancel}>{t('buttons.cancel')}</Button>
            <Button
              type="primary"
              onClick={handleSave}
              disabled={!hasChanges}
              loading={updateUserData.isPending}
              className="bg-teal-600 hover:bg-teal-700 disabled:bg-teal-300"
            >
              {t('buttons.save')}
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        {/* Name Field */}
        <div>
          <label className="block text-sm text-gray-500 mb-1">{t('form.firstName')}</label>
          <input
            type="text"
            value={user?.firstName || ''}
            disabled
            className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900"
          />
        </div>

        {/* Surname Field */}
        <div>
          <label className="block text-sm text-gray-500 mb-1">{t('form.lastName')}</label>
          <input
            type="text"
            value={user?.lastName || ''}
            disabled
            className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900"
          />
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm text-gray-500 mb-1">{t('form.email')}</label>
          <input
            type="email"
            value={formData.email}
            onChange={e => handleInputChange('email', e.target.value)}
            disabled={!isEditing}
            className={clsx(
              'w-full p-2.5 border border-gray-200 rounded-lg',
              !isEditing ? 'bg-gray-50' : 'bg-white'
            )}
          />
        </div>

        {/* Phone Field */}
        <div>
          <label className="block text-sm text-gray-500 mb-1">{t('form.phone')}</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={e => handleInputChange('phone', e.target.value)}
            disabled={!isEditing}
            className={clsx(
              'w-full p-2.5 border border-gray-200 rounded-lg',
              !isEditing ? 'bg-gray-50' : 'bg-white'
            )}
          />
        </div>
      </div>
    </div>
  )
}

export default AccountSettings
