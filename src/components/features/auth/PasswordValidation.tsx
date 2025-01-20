import { useAppTranslation } from '@/hooks/useAppTranslation'
import { Check, ChevronDown, ChevronUp, Shield, X } from 'lucide-react'
import React, { useEffect, useMemo, useState, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface PasswordValidationProps {
  password: string
  className?: string
  onValidationChange?: (isValid: boolean) => void
  containerRef?: React.RefObject<HTMLDivElement>
  isInputFocused?: boolean
}

interface ValidationRule {
  key: string
  test: (password: string) => boolean
  translationKey: string
  englishText: string
  priority: number
}

const PasswordValidation: React.FC<PasswordValidationProps> = ({
  password,
  className = '',
  onValidationChange,
  containerRef,
  isInputFocused = false,
}) => {
  const { t } = useAppTranslation('auth')
  const [isExpanded, setIsExpanded] = useState(false)
  const componentRef = useRef<HTMLDivElement>(null)

  // Handle expansion based on input focus
  useEffect(() => {
    if (isInputFocused) {
      setIsExpanded(true)
    }
  }, [isInputFocused])

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      const container = containerRef?.current
      const component = componentRef.current

      if (component && !component.contains(target) && (!container || !container.contains(target))) {
        setIsExpanded(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [containerRef])

  const validationRules: ValidationRule[] = useMemo(
    () => [
      {
        key: 'length',
        test: (pass: string) => pass.length >= 8,
        translationKey: 'passwordRules.minLength',
        englishText: '8+ characters',
        priority: 5,
      },
      {
        key: 'uppercase',
        test: (pass: string) => /[A-Z]/.test(pass),
        translationKey: 'passwordRules.uppercase',
        englishText: 'Uppercase',
        priority: 4,
      },
      {
        key: 'lowercase',
        test: (pass: string) => /[a-z]/.test(pass),
        translationKey: 'passwordRules.lowercase',
        englishText: 'Lowercase',
        priority: 3,
      },
      {
        key: 'number',
        test: (pass: string) => /\d/.test(pass),
        translationKey: 'passwordRules.number',
        englishText: 'Number',
        priority: 2,
      },
      {
        key: 'special',
        test: (pass: string) => /[!@#$%^&*(),.?":{}|<>]/.test(pass),
        translationKey: 'passwordRules.special',
        englishText: 'Special (!@#$)',
        priority: 1,
      },
    ],
    []
  )

  useEffect(() => {
    if (onValidationChange) {
      const isValid = password.length > 0 && validationRules.every(rule => rule.test(password))
      onValidationChange(isValid)
    }
  }, [password, validationRules, onValidationChange])

  const getPasswordStrength = (pass: string): number => {
    if (!pass) return 0
    return validationRules.filter(rule => rule.test(pass)).length
  }

  const strength = getPasswordStrength(password)
  const strengthPercentage = (strength / validationRules.length) * 100

  const getStrengthColor = (percentage: number): string => {
    if (percentage === 0) return 'bg-gray-200'
    if (percentage <= 20) return 'bg-red-500'
    if (percentage <= 40) return 'bg-orange-500'
    if (percentage <= 60) return 'bg-yellow-500'
    if (percentage <= 80) return 'bg-blue-500'
    return 'bg-green-500'
  }

  const getStrengthText = (percentage: number): { text: string; color: string } => {
    if (percentage === 0)
      return {
        text: t('passwordStrength.empty') || 'No Password',
        color: 'text-gray-400',
      }
    if (percentage <= 20)
      return {
        text: t('passwordStrength.veryWeak') || 'Very Weak',
        color: 'text-red-500',
      }
    if (percentage <= 40)
      return {
        text: t('passwordStrength.weak') || 'Weak',
        color: 'text-orange-500',
      }
    if (percentage <= 60)
      return {
        text: t('passwordStrength.medium') || 'Medium',
        color: 'text-yellow-500',
      }
    if (percentage <= 80)
      return {
        text: t('passwordStrength.strong') || 'Strong',
        color: 'text-blue-500',
      }
    return {
      text: t('passwordStrength.veryStrong') || 'Very Strong',
      color: 'text-green-500',
    }
  }

  const strengthInfo = getStrengthText(strengthPercentage)
  const allRequirementsMet =
    strengthPercentage === 100 && validationRules.every(rule => rule.test(password))

  return (
    <div ref={componentRef} className={`mt-2 ${className}`}>
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -10 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className={`p-3 bg-gray-50 rounded-lg border border-gray-100
          ${allRequirementsMet ? 'bg-green-50 border-green-100' : ''}
          ${!isExpanded ? 'cursor-pointer hover:bg-gray-100' : ''}`}
        onClick={() => !isInputFocused && setIsExpanded(!isExpanded)}
      >
        {/* Header - Always visible */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield
              className={`w-4 h-4 ${allRequirementsMet ? 'text-green-500' : 'text-gray-400'}`}
            />
            <span className="text-sm text-gray-600">
              {t('passwordStrength.label') || 'Password Strength'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium ${strengthInfo.color}`}>{strengthInfo.text}</span>
            <button
              type="button"
              className="text-gray-400 hover:text-gray-600 focus:outline-none"
              onClick={e => {
                e.stopPropagation()
                setIsExpanded(!isExpanded)
              }}
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Progress bar - Always visible */}
        <div className="w-full h-1 bg-gray-100 rounded-full mt-2 overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${getStrengthColor(strengthPercentage)}`}
            initial={{ width: 0 }}
            animate={{ width: `${strengthPercentage}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>

        {/* Expandable content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              {/* Requirements */}
              {!allRequirementsMet && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {validationRules.map(rule => {
                    const isValid = rule.test(password)
                    return (
                      <motion.div
                        key={rule.key}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs 
                          ${isValid ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-600'}`}
                      >
                        {isValid ? (
                          <Check className="w-3 h-3 text-green-500 flex-shrink-0" />
                        ) : (
                          <X className="w-3 h-3 text-gray-400 flex-shrink-0" />
                        )}
                        <span>{t(rule.translationKey) || rule.englishText}</span>
                      </motion.div>
                    )
                  })}
                </div>
              )}

              {/* Tips */}
              {!allRequirementsMet && strengthPercentage > 0 && strengthPercentage < 60 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="mt-3 text-xs text-gray-500"
                >
                  <p className="font-medium mb-1">{t('passwordTips.title') || 'Tips'}:</p>
                  <ul className="list-disc list-inside space-y-1 ml-1">
                    <li>{t('passwordTips.usePhrase') || 'Use a memorable phrase'}</li>
                    <li>
                      {t('passwordTips.mixCharacters') || 'Mix different types of characters'}
                    </li>
                  </ul>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default PasswordValidation
