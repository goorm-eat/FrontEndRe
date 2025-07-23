import { Text } from '@vapor-ui/core';

export default function FormField({
  label,
  name,
  placeholder,
  value,
  onChange,
  icon: Icon,
  infoText,
  infoIcon: InfoIcon,
  maxLength,
  isLarge = false,
  sectionClassName,
  inputType = 'textarea', // 새로운 prop 추가
  min, // 날짜 등의 최소값 설정을 위한 prop
}) {
  // 공통 CSS 클래스들
  const commonStyles = {
    section:
      'flex flex-col items-start gap-2 py-7 self-stretch border-b-4 border-[#f0f0f5]',
    fieldContainer: 'flex flex-col gap-1 w-full',
    textarea:
      'w-full h-10 px-4 py-2 border border-[#F7F7FA] rounded-md resize-none text-left overflow-hidden placeholder:text-[#6C6E7E] placeholder:font-normal placeholder:leading-[var(--line-height-075)] placeholder:tracking-[var(--letter-spacing-h5)]',
    textareaWithIcon:
      'w-full h-10 px-3 py-2 pr-5 border border-[#F7F7FA] rounded-md resize-none text-left overflow-hidden placeholder:text-[#6C6E7E] placeholder:font-normal placeholder:leading-[var(--line-height-075)] placeholder:tracking-[var(--letter-spacing-h5)]',
    textareaLarge:
      'w-full h-25 px-4 py-2 border border-[#F7F7FA] rounded-md resize-none text-left overflow-hidden placeholder:text-[#6C6E7E] placeholder:font-normal placeholder:leading-[var(--line-height-075)] placeholder:tracking-[var(--letter-spacing-h5)]',
    input:
      'w-full h-10 px-4 py-2 border border-[#F7F7FA] rounded-md text-left overflow-hidden placeholder:text-[#6C6E7E] placeholder:font-normal placeholder:leading-[var(--line-height-075)] placeholder:tracking-[var(--letter-spacing-h5)]',
    inputWithIcon:
      'w-full h-10 px-3 py-2 pr-5 border border-[#F7F7FA] rounded-md text-left overflow-hidden placeholder:text-[#6C6E7E] placeholder:font-normal placeholder:leading-[var(--line-height-075)] placeholder:tracking-[var(--letter-spacing-h5)]',
    iconContainer:
      'absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none',
    relativeContainer: 'relative w-full',
    counterText: 'text-[#6C6E7E]',
    infoRow: 'flex flex-row items-center gap-1',
  };

  // 내장 아이콘 숨기기 스타일
  const hideNativeIconStyle = {
    WebkitAppearance: 'none',
    MozAppearance: 'textfield',
  };

  // date, time input에 추가할 CSS 클래스
  const inputClassName = Icon
    ? `${commonStyles.inputWithIcon} ${inputType === 'date' || inputType === 'time' ? '[&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:pointer-events-none [&::-webkit-inner-spin-button]:opacity-0 [&::-webkit-outer-spin-button]:opacity-0' : ''}`
    : `${commonStyles.input} ${inputType === 'date' || inputType === 'time' ? '[&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:pointer-events-none [&::-webkit-inner-spin-button]:opacity-0 [&::-webkit-outer-spin-button]:opacity-0' : ''}`;

  return (
    <section className={sectionClassName || commonStyles.section}>
      <div className={commonStyles.fieldContainer}>
        <div className="flex justify-between items-center">
          <Text typography="heading6">{label}</Text>
        </div>

        {infoText && (
          <div className={commonStyles.infoRow}>
            {InfoIcon && <InfoIcon className="w-16 h-16" />}
            <Text typography="body3" className={commonStyles.counterText}>
              {infoText}
            </Text>
          </div>
        )}

        <div className={Icon ? commonStyles.relativeContainer : undefined}>
          {inputType === 'textarea' ? (
            <textarea
              name={name}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              className={
                isLarge
                  ? commonStyles.textareaLarge
                  : Icon
                    ? commonStyles.textareaWithIcon
                    : commonStyles.textarea
              }
            />
          ) : (
            <input
              type={inputType}
              name={name}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              min={min} // 날짜 등의 최소값 설정
              className={inputClassName}
              style={
                inputType === 'date' || inputType === 'time'
                  ? hideNativeIconStyle
                  : undefined
              }
            />
          )}
          {Icon && (
            <div className={commonStyles.iconContainer}>
              <Icon className="w-20 h-20" />
            </div>
          )}
        </div>

        {maxLength && value !== undefined && (
          <div className="flex justify-end w-full">
            <Text typography="body3" className={commonStyles.counterText}>
              {value.length}/{maxLength}
            </Text>
          </div>
        )}
      </div>
    </section>
  );
}
